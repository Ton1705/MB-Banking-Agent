import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, CreditCard, Lock, EyeOff, Loader2 } from 'lucide-react';
import api from '@/lib/api';

export function Cards() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response: any = await api.get('/cards');
        setCards(response.data);
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
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div data-page="cards" className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Thẻ</h1>
          <p className="text-slate-500">Quản lý thẻ tín dụng và thẻ ghi nợ</p>
        </div>
        <Button data-component="issue-card-btn" className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Phát hành thẻ
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.length > 0 ? cards.map(card => (
          <Card data-component="card-item" key={card.id} className="overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-xl">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg italic text-slate-300">{card.cardBrand}</span>
                <span className="text-xs px-2 py-1 bg-white/20 rounded-full">{card.cardTier}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-center mb-8 mt-2 opacity-50">
                 <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="30" rx="4" fill="#E2E8F0"/>
                  <path d="M10 10H30V20H10V10Z" fill="#94A3B8"/>
                </svg>
              </div>
              <div className="font-mono text-xl tracking-widest mb-2 flex justify-between">
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span>{card.cardNumber?.slice(-4) || 'XXXX'}</span>
              </div>
              <div className="flex justify-between text-xs mt-4 uppercase opacity-80">
                <div className="flex flex-col">
                  <span className="text-[10px]">Card Holder</span>
                  <span className="font-semibold tracking-wider">{card.cardHolderName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px]">Expires</span>
                  <span className="font-semibold tracking-wider">{card.expiryDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <Card className="flex flex-col justify-center items-center border-dashed border-2 bg-slate-50 shadow-none hover:bg-slate-100 transition-colors cursor-pointer p-6">
            <div className="rounded-full bg-blue-100 p-4 mb-4">
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Chưa có thẻ nào</h3>
            <p className="text-sm text-slate-500 text-center mt-2">Mở thẻ ghi nợ hoặc tín dụng để tận hưởng ưu đãi</p>
            <Button variant="outline" className="mt-6">Tìm hiểu thêm</Button>
          </Card>
        )}
      </div>

      <h2 className="text-lg font-semibold mt-8 mb-4">Quản lý thẻ</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <Card data-component="lock-card-btn" className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex flex-col items-center text-center gap-2">
            <div className="bg-slate-100 p-3 rounded-full text-slate-700"><Lock className="w-5 h-5"/></div>
            <span className="text-sm font-medium">Khóa thẻ</span>
          </CardContent>
        </Card>
        <Card data-component="hide-info-btn" className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex flex-col items-center text-center gap-2">
            <div className="bg-slate-100 p-3 rounded-full text-slate-700"><EyeOff className="w-5 h-5"/></div>
            <span className="text-sm font-medium">Ẩn thông tin</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

