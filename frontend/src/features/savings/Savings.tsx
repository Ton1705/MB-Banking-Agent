import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { Saving } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ArrowRight, PiggyBank, TrendingUp, Wallet, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const formatVND = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export function Savings() {
  const [savings, setSavings] = useState<Saving[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const response: any = await api.get('/savings');
        setSavings(response.data || response);
      } catch (error) {
        console.error('Error fetching savings', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavings();
  }, []);

  return (
    <div data-page="savings" className="p-6 max-w-7xl mx-auto space-y-8 animate-slide-up">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-mb-navy">Tiền gửi & Đầu tư</h1>
        <Button variant="outline" className="text-mb-blue border-mb-blue hover:bg-mb-light" data-action="compare-savings">
          So sánh
        </Button>
      </div>

      {/* Sổ tiết kiệm của bạn */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Wallet className="text-mb-blue w-6 h-6" />
          Sổ tiết kiệm của bạn
        </h2>
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-mb-cyan" />
          </div>
        ) : savings.length === 0 ? (
          <Card className="bg-slate-50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-8 text-slate-500">
              <PiggyBank className="w-12 h-12 mb-4 text-slate-300" />
              <p>Bạn chưa có sổ tiết kiệm nào.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savings.map((saving) => (
              <Card key={saving.id} className="card-hover border-t-4 border-t-mb-cyan overflow-hidden" data-component="saving-card">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-slate-800">{saving.savingName || 'Tiết kiệm kỳ hạn'}</CardTitle>
                    {saving.status === 'ACTIVE' && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> ACTIVE</span>}
                    {saving.status === 'MATURED' && <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded flex items-center gap-1"><AlertCircle className="w-3 h-3"/> MATURED</span>}
                    {saving.status === 'WITHDRAWN' && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded flex items-center gap-1"><Clock className="w-3 h-3"/> WITHDRAWN</span>}
                  </div>
                  <CardDescription>Lãi suất {saving.interestRate}%/năm</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-mb-navy mb-4">{formatVND(saving.amount)}</p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Kỳ hạn:</span>
                      <span className="font-medium text-slate-800">{saving.termMonths} tháng</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ngày mở:</span>
                      <span>{new Date(saving.startDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ngày đến hạn:</span>
                      <span>{new Date(saving.maturityDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Sản phẩm tiền gửi */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Sản phẩm tiền gửi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-hover bg-gradient-to-br from-white to-mb-light border-mb-blue/20">
            <CardHeader>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 text-mb-blue">
                <TrendingUp className="w-6 h-6" />
              </div>
              <CardTitle>Tiền gửi linh hoạt</CardTitle>
              <CardDescription>Tối ưu cho kỳ hạn 6 tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold text-mb-navy">7.1%</span>
                <span className="text-slate-500 text-sm">/năm</span>
              </div>
              <Button className="w-full bg-mb-gradient-cyan text-white border-0 hover:opacity-90">Mở ngay</Button>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-white to-blue-50 border-mb-blue/20">
            <CardHeader>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 text-mb-cyan">
                <PiggyBank className="w-6 h-6" />
              </div>
              <CardTitle>Tiền gửi kỳ hạn</CardTitle>
              <CardDescription>Lãi suất ổn định, an toàn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold text-mb-navy">7.0%</span>
                <span className="text-slate-500 text-sm">/năm</span>
              </div>
              <Button className="w-full bg-mb-gradient text-white hover:opacity-90 border-0">Mở ngay</Button>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-white to-slate-50 border-slate-200">
            <CardHeader>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 text-mb-gold">
                <Wallet className="w-6 h-6" />
              </div>
              <CardTitle>Tiền gửi tích lũy</CardTitle>
              <CardDescription>Góp vốn nhỏ, sinh lời to</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold text-mb-navy">6.5%</span>
                <span className="text-slate-500 text-sm">/năm</span>
              </div>
              <Button variant="outline" className="w-full border-mb-blue text-mb-blue hover:bg-mb-light">Mở ngay</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sản phẩm đầu tư */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Sản phẩm đầu tư</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="card-hover cursor-pointer group">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-mb-blue transition-colors">Digi Trading</h3>
                  <p className="text-sm text-slate-500">Đầu tư chứng khoán thông minh</p>
                </div>
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-mb-cyan transition-colors" />
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer group">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <PiggyBank className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-mb-blue transition-colors">Tiết kiệm tiền lẻ</h3>
                  <p className="text-sm text-slate-500">Tích lũy từ những giao dịch nhỏ</p>
                </div>
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-mb-cyan transition-colors" />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
