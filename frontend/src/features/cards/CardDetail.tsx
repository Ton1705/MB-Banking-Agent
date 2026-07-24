import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import type { Card as CardType, Transaction } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, Lock, Key, CreditCard, Info, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const formatVND = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export function CardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<CardType | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardRes, txRes]: any = await Promise.all([
          api.get(`/cards/${id}`),
          api.get('/transactions')
        ]);
        setCard(cardRes.data || cardRes);
        // Mock filtering
        const allTx = txRes.data || txRes;
        setTransactions(allTx.slice(0, 5)); // Just take top 5 for demo
      } catch (error) {
        console.error('Error fetching card details', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (loading) {
    return <div className="flex h-64 justify-center items-center"><Loader2 className="w-8 h-8 animate-spin text-mb-cyan" /></div>;
  }

  if (!card) {
    return <div className="p-6 text-center text-slate-500">Không tìm thấy thẻ</div>;
  }

  const maskedNumber = `**** **** **** ${card.cardNumber.slice(-4)}`;
  const displayNum = showNumber ? card.cardNumber : maskedNumber;

  return (
    <div data-page="card-detail" data-card-id={id} className="p-6 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Button variant="ghost" onClick={() => navigate(-1)} className="text-slate-500 mb-2 -ml-4 hover:bg-slate-100">
        <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card Visual */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md h-56 rounded-2xl p-6 text-white bg-gradient-to-br from-indigo-800 via-blue-700 to-mb-cyan shadow-xl relative overflow-hidden card-hover transform transition-transform">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-10 -mb-10"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <span className="font-bold text-2xl tracking-wider">MB BANK</span>
                <span className="text-lg font-semibold italic">{card.cardBrand}</span>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xl md:text-2xl tracking-widest">{displayNum}</div>
                  <button onClick={() => setShowNumber(!showNumber)} className="text-white/70 hover:text-white">
                    {showNumber ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-4">
                <div>
                  <div className="text-xs text-white/70 uppercase">Chủ thẻ</div>
                  <div className="font-semibold uppercase tracking-wider">{card.cardHolderName}</div>
                </div>
                <div>
                  <div className="text-xs text-white/70 uppercase">Hết hạn</div>
                  <div className="font-semibold font-mono">{card.expiryDate}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex justify-center gap-4 mt-8 w-full max-w-md">
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-red-50 group-hover:text-red-600 transition-colors shadow-sm">
                <Lock className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-600">Khóa thẻ</span>
            </button>
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-mb-light group-hover:text-mb-blue transition-colors shadow-sm">
                <Key className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-600">Đổi PIN</span>
            </button>
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-mb-light group-hover:text-mb-blue transition-colors shadow-sm">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-600">Thanh toán</span>
            </button>
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-mb-light group-hover:text-mb-blue transition-colors shadow-sm">
                <Info className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-600">Thông tin</span>
            </button>
          </div>
        </div>

        {/* Info & Transactions */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Thông tin thẻ</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
                <div>
                  <dt className="text-slate-500">Loại thẻ</dt>
                  <dd className="font-medium text-slate-800">{card.cardType === 'CREDIT' ? 'Thẻ tín dụng' : 'Thẻ ghi nợ'}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Trạng thái</dt>
                  <dd className="font-medium text-green-600">{card.status === 'ACTIVE' ? 'Đang hoạt động' : card.status}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Hạng thẻ</dt>
                  <dd className="font-medium text-slate-800">{card.cardTier}</dd>
                </div>
                {card.cardType === 'CREDIT' && card.creditLimit && (
                  <div>
                    <dt className="text-slate-500">Hạn mức</dt>
                    <dd className="font-medium text-mb-blue">{formatVND(card.creditLimit)}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Giao dịch gần đây</CardTitle>
              <Button variant="link" className="text-mb-blue p-0">Xem tất cả</Button>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map(tx => (
                    <div key={tx.id} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <div>
                        <div className="font-medium text-sm text-slate-800">{tx.description}</div>
                        <div className="text-xs text-slate-400">
                          {format(new Date(tx.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        </div>
                      </div>
                      <div className={`font-semibold text-sm ${tx.amount > 0 ? 'text-green-600' : 'text-slate-800'}`}>
                        {tx.amount > 0 ? '+' : ''}{formatVND(tx.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-sm text-slate-500">
                  Không có giao dịch nào
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
