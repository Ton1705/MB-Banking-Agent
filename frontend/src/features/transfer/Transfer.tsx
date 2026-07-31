import { useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, Lock, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAccounts } from '@/lib/mock-data';
import { VoiceAuthModal } from '@/components/verification/VoiceAuthModal';

const formatVND = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export function Transfer() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVoiceAuthOpen, setIsVoiceAuthOpen] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(step + 1);
      }, 600);
    }
  };

  const handleVoiceSuccess = () => {
    setIsVoiceAuthOpen(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 600);
  };

  const handleReset = () => {
    setStep(1);
    setAmount('');
  };

  const quickAmounts = [
    { label: '100K', value: '100000' },
    { label: '500K', value: '500000' },
    { label: '1M', value: '1000000' },
    { label: '5M', value: '5000000' },
    { label: '10M', value: '10000000' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in" data-page="transfer">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-mb-navy">Chuyển tiền</h1>
        <p className="text-gray-500 mt-2">Nhanh chóng, an toàn và bảo mật</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center w-full max-w-sm">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step >= 1 ? 'bg-mb-blue text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-mb-blue' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step >= 2 ? 'bg-mb-blue text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-mb-blue' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step >= 3 ? 'bg-mb-blue text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
        </div>
      </div>

      <Card className="shadow-lg border-0 bg-white">
        {step === 1 && (
          <div className="animate-slide-up">
            <CardHeader>
              <CardTitle className="text-xl">Thông tin chuyển tiền</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tài khoản nguồn</label>
                <Select defaultValue={mockAccounts[0]?.id}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Chọn tài khoản" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAccounts.map(acc => (
                      <SelectItem key={acc.id} value={acc.id}>
                        {acc.accountNumber} - {formatVND(acc.balance)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Ngân hàng thụ hưởng</label>
                <Select defaultValue="vcb">
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Chọn ngân hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mb">MB Bank</SelectItem>
                    <SelectItem value="vcb">Vietcombank</SelectItem>
                    <SelectItem value="tcb">Techcombank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Số tài khoản / Thẻ</label>
                <Input placeholder="Nhập số tài khoản" className="h-12" data-component="account-input" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Số tiền (VND)</label>
                <Input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  placeholder="0" 
                  className="h-12 text-lg font-semibold"
                  data-component="amount-input"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickAmounts.map((q) => (
                    <Button 
                      key={q.value} 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAmount(q.value)}
                      className="border-mb-cyan text-mb-blue hover:bg-mb-light"
                      data-action={`quick-amount-${q.value}`}
                    >
                      {q.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nội dung</label>
                <Input placeholder="Chuyen tien" className="h-12" data-component="memo-input" />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleNext} 
                className="w-full h-12 bg-mb-blue hover:bg-mb-navy text-white text-lg font-medium"
                disabled={loading || !amount}
                data-action="next-step"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Tiếp tục'}
              </Button>
            </CardFooter>
          </div>
        )}

        {step === 2 && (
          <div className="animate-slide-up">
            <CardHeader>
              <CardTitle className="text-xl">Xác nhận giao dịch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Từ tài khoản</span>
                  <span className="font-medium">19002838382 (MB)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Đến tài khoản</span>
                  <span className="font-medium">9876543210 (VCB)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Người nhận</span>
                  <span className="font-bold text-mb-navy">NGUYEN VAN A</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-gray-500">Số tiền</span>
                  <span className="text-2xl font-bold text-mb-blue">{formatVND(Number(amount))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phí giao dịch</span>
                  <span className="font-medium text-green-600">Miễn phí</span>
                </div>
              </div>
              <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-sm flex items-start gap-2">
                <Lock className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p>Vui lòng kiểm tra kỹ thông tin trước khi xác nhận. Bạn có thể sử dụng Giọng nói để xác thực thay cho Smart OTP.</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <div className="flex gap-4 w-full">
                <Button variant="outline" className="flex-1 h-12" onClick={() => setStep(1)} data-action="back-step">
                  Quay lại
                </Button>
                <Button 
                  onClick={handleNext} 
                  className="flex-1 h-12 bg-mb-gradient text-white text-lg font-medium"
                  disabled={loading}
                  data-action="confirm-transfer"
                >
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Xác nhận OTP'}
                </Button>
              </div>
              
              <Button 
                onClick={() => setIsVoiceAuthOpen(true)}
                variant="outline"
                className="w-full h-12 border-mb-cyan text-mb-blue hover:bg-mb-light"
                disabled={loading}
                data-action="voice-confirm-transfer"
              >
                <Mic className="mr-2 h-5 w-5" />
                Xác thực bằng Giọng nói
              </Button>
            </CardFooter>
          </div>
        )}

        {step === 3 && (
          <div className="animate-scale-in text-center py-8">
            <CardContent className="space-y-6">
              <div className="flex justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center animate-ping opacity-20">
                  <div className="w-24 h-24 bg-green-400 rounded-full"></div>
                </div>
                <CheckCircle2 className="h-24 w-24 text-green-500 relative z-10 bg-white rounded-full" />
                <Sparkles className="absolute top-0 right-1/3 text-yellow-400 h-6 w-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Chuyển tiền thành công!</h2>
                <p className="text-gray-500">Giao dịch của bạn đã được xử lý thành công.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl inline-block text-left w-full max-w-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500 text-sm">Số tiền</span>
                  <span className="font-bold text-lg text-mb-navy">{formatVND(Number(amount))}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500 text-sm">Mã giao dịch</span>
                  <span className="font-mono text-sm text-gray-700">FT{Math.random().toString().slice(2, 10)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Thời gian</span>
                  <span className="text-sm text-gray-700">{new Date().toLocaleString('vi-VN')}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                onClick={handleReset} 
                className="bg-mb-navy hover:bg-mb-blue text-white px-8 h-12"
                data-action="new-transfer"
              >
                Thực hiện giao dịch khác
              </Button>
            </CardFooter>
          </div>
        )}
      </Card>
      
      <VoiceAuthModal 
        isOpen={isVoiceAuthOpen} 
        onClose={() => setIsVoiceAuthOpen(false)} 
        onSuccess={handleVoiceSuccess}
        promptText={`Xác nhận chuyển ${formatVND(Number(amount) || 0)} tới NGUYEN VAN A`}
      />
    </div>
  );
}
