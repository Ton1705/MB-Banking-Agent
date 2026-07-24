import { useState, useEffect } from 'react';
import { Loader2, Wallet, PiggyBank, ArrowRight, MoreHorizontal, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import api from '@/lib/api';
import type { Account } from '@/types';

const formatVND = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response: any = await api.get('/accounts');
        // Ensure data is array
        setAccounts(Array.isArray(response.data) ? response.data : []);
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
      <div className="flex h-[80vh] items-center justify-center" data-page="accounts">
        <Loader2 className="h-8 w-8 animate-spin text-mb-blue" data-component="loader" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in" data-page="accounts">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Danh sách Tài khoản</h1>
          <p className="text-gray-500">Quản lý số dư và giao dịch tài khoản của bạn</p>
        </div>
        <Button className="bg-mb-navy hover:bg-mb-blue text-white" data-action="open-new-account">
          Mở tài khoản mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <Card 
            key={account.id} 
            className="overflow-hidden shadow-md card-hover border-t-4 border-t-transparent bg-gradient-to-r from-mb-blue to-mb-cyan bg-clip-border relative"
            data-component="account-card"
          >
            {/* Creates gradient top border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mb-blue to-mb-cyan"></div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${account.accountType === 'SAVINGS' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
                    {account.accountType === 'SAVINGS' ? <PiggyBank size={24} /> : <Wallet size={24} />}
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-800">{account.ownerFullName}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span>{account.accountNumber}</span>
                      <button className="ml-2 text-gray-400 hover:text-mb-blue" data-action="copy-account-number">
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <MoreHorizontal size={20} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="py-4">
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-500 mb-1">Số dư khả dụng</p>
                <div className="text-3xl font-bold text-gray-900">
                  {formatVND(account.balance)}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t flex justify-between gap-3 p-4">
              <Button variant="outline" className="flex-1 bg-white" data-action="view-details">
                Chi tiết
              </Button>
              <Link to="/transfer" className="flex-1 flex">
                <Button className="w-full bg-mb-blue hover:bg-mb-navy text-white" data-action="transfer-from-account">
                  Chuyển tiền <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
