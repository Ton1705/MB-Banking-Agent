import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { Loan } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, Plus, Home, Car, User, Briefcase, Calendar, Info } from 'lucide-react';

const formatVND = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export function Loans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response: any = await api.get('/loans');
        setLoans(response.data || response);
      } catch (error) {
        console.error('Error fetching loans', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const getLoanIconAndName = (type: string) => {
    switch(type) {
      case 'PERSONAL': return { icon: <User className="w-5 h-5"/>, name: 'Vay cá nhân', color: 'text-blue-500 bg-blue-100' };
      case 'MORTGAGE': return { icon: <Home className="w-5 h-5"/>, name: 'Vay mua nhà', color: 'text-purple-500 bg-purple-100' };
      case 'AUTO': return { icon: <Car className="w-5 h-5"/>, name: 'Vay mua xe', color: 'text-amber-500 bg-amber-100' };
      case 'BUSINESS': return { icon: <Briefcase className="w-5 h-5"/>, name: 'Vay kinh doanh', color: 'text-green-500 bg-green-100' };
      default: return { icon: <Info className="w-5 h-5"/>, name: 'Khoản vay', color: 'text-slate-500 bg-slate-100' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ACTIVE': return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">ĐANG VAY</span>;
      case 'PAID': return <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">ĐÃ TRẢ</span>;
      case 'OVERDUE': return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">QUÁ HẠN</span>;
      default: return null;
    }
  };

  return (
    <div data-page="loans" className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-mb-navy">Khoản vay</h1>
          <p className="text-slate-500 mt-1">Quản lý các khoản vay và dư nợ của bạn</p>
        </div>
        <Button className="bg-mb-gradient text-white border-0 hover:opacity-90" data-action="new-loan">
          <Plus className="w-4 h-4 mr-2" /> Vay mới
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-mb-cyan" />
        </div>
      ) : loans.length === 0 ? (
        <Card className="border-dashed bg-slate-50">
          <CardContent className="flex flex-col items-center justify-center p-12 text-slate-500">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Briefcase className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-lg font-medium text-slate-700 mb-2">Bạn chưa có khoản vay nào</p>
            <p className="text-sm mb-4">Khám phá các gói vay ưu đãi từ MB Bank</p>
            <Button variant="outline" className="text-mb-blue border-mb-blue">Tìm hiểu thêm</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loans.map(loan => {
            const { icon, name, color } = getLoanIconAndName(loan.loanType);
            const progress = ((loan.principalAmount - loan.remainingAmount) / loan.principalAmount) * 100;
            
            return (
              <Card key={loan.id} className="card-hover overflow-hidden" data-component="loan-card">
                <CardHeader className="pb-4 border-b border-slate-100">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                        {icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-800">{name}</CardTitle>
                        <div className="text-sm text-slate-500 font-medium">HĐ: {loan.id.toString().substring(0,8).toUpperCase()}</div>
                      </div>
                    </div>
                    {getStatusBadge(loan.status)}
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Dư nợ hiện tại</span>
                      <span className="font-bold text-mb-red text-lg">{formatVND(loan.remainingAmount)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Đã trả: {formatVND(loan.principalAmount - loan.remainingAmount)}</span>
                      <span>Tổng: {formatVND(loan.principalAmount)}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-mb-cyan h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-xs text-slate-500 mb-1">Lãi suất</div>
                      <div className="font-semibold text-slate-800">{loan.interestRate}%/năm</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-xs text-slate-500 mb-1">Kỳ trả gốc/lãi</div>
                      <div className="font-semibold text-slate-800">{formatVND(loan.monthlyPayment)}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t border-slate-100 py-3 px-6 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span>Đáo hạn: {new Date(loan.endDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <Button variant="link" className="text-mb-blue p-0 h-auto">Chi tiết &gt;</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
