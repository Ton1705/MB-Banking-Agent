import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, EyeOff, ArrowUpRight, ArrowDownRight, 
  Send, PiggyBank, Landmark, Receipt, Loader2, ChevronRight 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import api from '@/lib/api';
import { mockChartData } from '@/lib/mock-data';
import type { Transaction, DashboardStats } from '@/types';

const formatVND = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export function Dashboard() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response: any = await api.get('/dashboard');
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center" data-page="dashboard">
        <Loader2 className="h-8 w-8 animate-spin text-mb-blue" data-component="loader" />
      </div>
    );
  }

  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="space-y-6 animate-slide-up" data-page="dashboard">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Xin chào, Lê Khánh Ngọc!</h1>
          <p className="text-gray-500">{today}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <Card className="mb-gradient text-white col-span-1 md:col-span-3 lg:col-span-1 shadow-lg border-0 card-hover">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="text-mb-light font-medium">Tổng số dư</div>
              <button 
                onClick={() => setShowBalance(!showBalance)} 
                className="text-mb-light hover:text-white transition-colors"
                data-action="toggle-balance"
              >
                {showBalance ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
            <div className="text-4xl font-bold mb-2">
              {showBalance ? formatVND(data?.totalBalance || 125000000) : '******'}
            </div>
            <div className="inline-flex items-center text-sm bg-white/20 rounded-full px-2 py-1 mt-2">
              <ArrowUpRight className="h-4 w-4 mr-1 text-green-300" />
              <span>+2.5% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>

        {/* Stats Row */}
        <Card className="col-span-1 border-t-4 border-t-green-500 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Thu nhập tháng</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {showBalance ? formatVND(data?.monthlyIncome || 45000000) : '******'}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 border-t-4 border-t-mb-red card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Chi tiêu tháng</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {showBalance ? formatVND(data?.monthlyExpense || 12500000) : '******'}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-mb-red">
                <ArrowDownRight className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Thao tác nhanh</h2>
        <div className="grid grid-cols-4 gap-4 max-w-2xl">
          {[
            { icon: Send, label: 'Chuyển tiền', to: '/transfer', color: 'text-blue-600', bg: 'bg-blue-100' },
            { icon: PiggyBank, label: 'Tiền gửi', to: '/savings', color: 'text-pink-600', bg: 'bg-pink-100' },
            { icon: Landmark, label: 'Khoản vay', to: '/loans', color: 'text-purple-600', bg: 'bg-purple-100' },
            { icon: Receipt, label: 'Thanh toán', to: '/payments', color: 'text-orange-600', bg: 'bg-orange-100' },
          ].map((action, idx) => (
            <Link 
              key={idx} 
              to={action.to} 
              className="flex flex-col items-center group"
              data-action={`quick-action-${action.to.replace('/', '')}`}
            >
              <div className={`h-14 w-14 rounded-full ${action.bg} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-sm`}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Thu chi 6 tháng gần nhất</CardTitle>
            <CardDescription>Biểu đồ thu nhập và chi tiêu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full" data-component="chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000000}M`} />
                  <Tooltip 
                    formatter={(value: any) => formatVND(value)}
                    cursor={{fill: '#f3f4f6'}}
                  />
                  <Legend />
                  <Bar dataKey="income" name="Thu nhập" fill="#1A4B8C" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="expense" name="Chi tiêu" fill="#E63946" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Giao dịch gần đây</CardTitle>
              <CardDescription>5 giao dịch mới nhất</CardDescription>
            </div>
            <Link 
              to="/transactions" 
              className="text-sm font-medium text-mb-blue hover:underline flex items-center"
              data-action="view-all-transactions"
            >
              Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(data?.recentTransactions || []).slice(0, 5).map((tx: Transaction) => (
                <div key={tx.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors" data-component="transaction-item">
                  <div className="flex items-center space-x-3">
                    <Avatar className={`h-10 w-10 ${tx.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                      <AvatarFallback className={tx.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                        {tx.amount > 0 ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">{tx.description}</p>
                      <p className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </div>
                  <div className={`font-semibold text-sm ${tx.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatVND(tx.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
