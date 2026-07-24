import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, CreditCard as CreditCardIcon, Lock, EyeOff, KeyRound, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import type { Card as CardType } from '@/types';

export function Cards() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response: any = await api.get('/cards');
        setCards(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to fetch cards', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center" data-page="cards">
        <Loader2 className="h-8 w-8 animate-spin text-mb-blue" data-component="loader" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up" data-page="cards">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Thẻ</h1>
          <p className="text-gray-500">Xem và quản lý các thẻ ghi nợ, thẻ tín dụng của bạn</p>
        </div>
        <Button className="bg-mb-cyan hover:bg-cyan-600 text-white shadow-md" data-action="issue-new-card">
          Phát hành thẻ mới
        </Button>
      </div>

      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-xl border border-dashed border-gray-300">
          <CreditCardIcon className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Bạn chưa có thẻ nào</h3>
          <p className="text-gray-500 mt-1 mb-4">Mở thẻ trực tuyến chỉ trong vài phút.</p>
          <Button className="bg-mb-blue text-white hover:bg-mb-navy">Mở thẻ ngay</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {cards.map((card) => (
            <Link key={card.id} to={`/cards/${card.id}`} className="block group" data-component="card-item">
              <div className="mb-gradient-card rounded-2xl p-6 text-white shadow-xl group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-300 h-56 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-lg tracking-wider opacity-90">{card.cardBrand}</span>
                    <CreditCardIcon className="h-8 w-8 opacity-80" />
                  </div>
                  
                  <div className="text-center mt-4">
                    <p className="text-2xl tracking-[0.2em] font-mono opacity-90">
                      **** **** **** {card.cardNumber.slice(-4)}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <p className="text-xs uppercase opacity-75 mb-1">Chủ thẻ</p>
                      <p className="font-semibold tracking-wide uppercase">{card.cardHolderName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase opacity-75 mb-1">Hết hạn</p>
                      <p className="font-semibold tracking-wide">{card.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Management Section */}
      <div className="mt-8 pt-8 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tiện ích thẻ</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:bg-slate-50 cursor-pointer transition-colors border-0 shadow-sm" data-action="lock-card">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Lock className="h-6 w-6 text-gray-700" />
              </div>
              <span className="font-medium text-sm text-gray-800">Khóa thẻ</span>
            </CardContent>
          </Card>
          <Card className="hover:bg-slate-50 cursor-pointer transition-colors border-0 shadow-sm" data-action="hide-info">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <EyeOff className="h-6 w-6 text-gray-700" />
              </div>
              <span className="font-medium text-sm text-gray-800">Ẩn thông tin</span>
            </CardContent>
          </Card>
          <Card className="hover:bg-slate-50 cursor-pointer transition-colors border-0 shadow-sm" data-action="change-pin">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <KeyRound className="h-6 w-6 text-gray-700" />
              </div>
              <span className="font-medium text-sm text-gray-800">Đổi PIN</span>
            </CardContent>
          </Card>
          <Card className="hover:bg-red-50 cursor-pointer transition-colors border-0 shadow-sm" data-action="report-lost">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                <AlertTriangle className="h-6 w-6 text-mb-red" />
              </div>
              <span className="font-medium text-sm text-mb-red">Báo mất</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
