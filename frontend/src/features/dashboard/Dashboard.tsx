import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockChartData } from '@/lib/mock-data';
import { ArrowDownRight, ArrowUpRight, DollarSign, CreditCard, Activity, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '@/lib/api';

export function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response: any = await api.get('/dashboard');
        setData(response.data); // data contains totalBalance, accounts, cards, etc.
      } catch (error) {
        console.error('Failed to fetch dashboard', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!data) return null;

  const totalAccounts = (data.accounts?.length || 0) + (data.cards?.length || 0);
  const transactionCount = data.recentTransactions?.length || 0;
  // Calculate dummy income/expense based on real transactions for UI demonstration
  const monthlyIncome = data.recentTransactions?.filter((t: any) => t.transactionType === 'DEPOSIT').reduce((sum: number, t: any) => sum + t.amount, 0) || 0;
  const monthlyExpense = data.recentTransactions?.filter((t: any) => t.transactionType !== 'DEPOSIT').reduce((sum: number, t: any) => sum + t.amount, 0) || 0;

  return (
    <div data-page="dashboard" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tổng quan tài khoản</h1>
        <p className="text-slate-500">Xin chào, Lê Khánh Ngọc! Chúc bạn một ngày tốt lành.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card data-component="dashboard-total-balance-card" className="border-none shadow-md bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Tổng số dư</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.totalBalance)}
            </div>
            <p className="text-xs text-blue-200 mt-1">+2.5% so với tháng trước</p>
          </CardContent>
        </Card>
        
        <Card data-component="dashboard-monthly-income-card" className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Thu nhập tháng này</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(monthlyIncome)}
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-green-500">Đang tăng đều</p>
          </CardContent>
        </Card>
        
        <Card data-component="dashboard-monthly-expense-card" className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Chi tiêu tháng này</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(monthlyExpense)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">-5% so với tháng trước</p>
          </CardContent>
        </Card>

        <Card data-component="dashboard-active-accounts-card" className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Tài khoản & Thẻ</CardTitle>
            <CreditCard className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalAccounts}</div>
            <p className="text-xs text-muted-foreground mt-1">Đang hoạt động</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card data-component="dashboard-chart-card" className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Biểu đồ Thu/Chi</CardTitle>
            <CardDescription>6 tháng gần nhất</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000000}M`} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    formatter={(value: any) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value))}
                  />
                  <Bar dataKey="income" name="Thu nhập" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" name="Chi tiêu" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card data-component="dashboard-recent-transactions-card" className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Giao dịch gần đây</CardTitle>
            <CardDescription>
              Bạn có {transactionCount} giao dịch trong tuần này.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentTransactions?.slice(0, 4).map((txn: any) => (
                <div key={txn.id} className="flex items-center">
                  <div className={`mr-4 rounded-full p-2 ${
                    txn.transactionType === 'DEPOSIT' ? 'bg-green-100 text-green-600' : 
                    txn.transactionType === 'WITHDRAWAL' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {txn.transactionType === 'DEPOSIT' && <ArrowDownRight className="h-4 w-4" />}
                    {txn.transactionType === 'WITHDRAWAL' && <ArrowUpRight className="h-4 w-4" />}
                    {txn.transactionType === 'TRANSFER' && <Activity className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none line-clamp-1">{txn.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(txn.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div className={`text-sm font-bold ${
                    txn.transactionType === 'DEPOSIT' ? 'text-green-600' : 'text-slate-900'
                  }`}>
                    {txn.transactionType === 'DEPOSIT' ? '+' : '-'}
                    {new Intl.NumberFormat('vi-VN').format(txn.amount)} ₫
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
