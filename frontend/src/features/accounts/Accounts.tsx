import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Eye, PlusCircle, ArrowRightLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

export function Accounts() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response: any = await api.get('/accounts');
        setAccounts(response.data);
      } catch (error) {
        console.error('Failed to fetch accounts', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div data-page="accounts" className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tài khoản</h1>
          <p className="text-slate-500">Quản lý danh sách tài khoản của bạn</p>
        </div>
        <Button data-component="create-account-btn" className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Mở tài khoản mới
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {accounts.map((account) => (
          <Card data-component="account-card" data-account-id={account.id} key={account.id} className="relative overflow-hidden shadow-sm transition-all hover:shadow-md border-t-4 border-t-blue-600">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Tài khoản {account.accountType === 'CHECKING' ? 'Thanh toán' : 'Tiết kiệm'}</CardTitle>
                  <CardDescription className="font-mono mt-1 text-slate-600">{account.accountNumber}</CardDescription>
                </div>
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <CreditCard className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-4 flex flex-col gap-1">
                <span className="text-sm text-slate-500">Số dư khả dụng</span>
                <span className="text-3xl font-bold text-slate-900">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(account.balance)}
                </span>
              </div>
              <div className="mt-6 flex gap-2">
                <Button data-component="transfer-from-account-btn" variant="outline" size="sm" className="w-full">
                  <ArrowRightLeft className="mr-2 h-4 w-4" /> Chuyển tiền
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="mr-2 h-4 w-4" /> Chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

