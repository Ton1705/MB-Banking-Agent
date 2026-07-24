import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAccounts } from '@/lib/mock-data';
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react';

export function Transfer() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState('');
  
  return (
    <div data-page="transfer" className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Chuyển tiền</h1>
        <p className="text-slate-500">Chuyển tiền an toàn và nhanh chóng</p>
      </div>

      {step === 1 && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Thông tin giao dịch</CardTitle>
            <CardDescription>Nhập thông tin người nhận và số tiền</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Tài khoản nguồn</label>
              <Select defaultValue={mockAccounts[0].accountNumber}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tài khoản" />
                </SelectTrigger>
                <SelectContent>
                  {mockAccounts.map(acc => (
                    <SelectItem key={acc.id} value={acc.accountNumber}>
                      {acc.accountNumber} - Số dư: {new Intl.NumberFormat('vi-VN').format(acc.balance)} VND
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Ngân hàng hưởng</label>
                <Select defaultValue="mb">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngân hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mb">MB Bank</SelectItem>
                    <SelectItem value="vcb">Vietcombank</SelectItem>
                    <SelectItem value="tcb">Techcombank</SelectItem>
                    <SelectItem value="bidv">BIDV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Số tài khoản hưởng</label>
                <Input data-testid="destination-account-input" placeholder="Nhập số tài khoản" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Tên người hưởng</label>
              <Input placeholder="Tên người nhận (tự động tra cứu)" disabled />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Số tiền (VND)</label>
              <Input 
                data-testid="amount-input"
                type="number" 
                placeholder="0" 
                value={amount}
                onChange={(e: any) => setAmount(e.target.value)}
                className="text-lg font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Nội dung chuyển tiền</label>
              <Input placeholder="Nhập nội dung" defaultValue="LE KHANH NGOC chuyen tien" />
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50 py-4 border-t flex justify-end">
            <Button data-testid="next-step-btn" className="bg-blue-600 hover:bg-blue-700" onClick={() => setStep(2)}>
              Tiếp tục <Send className="ml-2 w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Xác nhận giao dịch</CardTitle>
            <CardDescription>Vui lòng kiểm tra kỹ thông tin trước khi xác nhận</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 shrink-0" />
              <p className="text-sm text-blue-800">Giao dịch sẽ được thực hiện ngay lập tức và không thể hoàn tác.</p>
            </div>
            
            <div className="rounded-md border divide-y">
              <div className="flex justify-between p-3 text-sm">
                <span className="text-slate-500">Tài khoản nguồn</span>
                <span className="font-medium">{mockAccounts[0].accountNumber}</span>
              </div>
              <div className="flex justify-between p-3 text-sm">
                <span className="text-slate-500">Người hưởng</span>
                <span className="font-medium">TRẦN VĂN A</span>
              </div>
              <div className="flex justify-between p-3 text-sm">
                <span className="text-slate-500">Ngân hàng</span>
                <span className="font-medium">Techcombank</span>
              </div>
              <div className="flex justify-between p-3 text-sm">
                <span className="text-slate-500">Số tài khoản</span>
                <span className="font-medium">19033333333</span>
              </div>
              <div className="flex justify-between p-3 text-sm">
                <span className="text-slate-500">Nội dung</span>
                <span className="font-medium">LE KHANH NGOC chuyen tien</span>
              </div>
              <div className="flex justify-between p-4 bg-slate-50 rounded-b-md">
                <span className="font-semibold text-slate-700">Tổng tiền</span>
                <span className="text-xl font-bold text-blue-600">
                  {amount ? new Intl.NumberFormat('vi-VN').format(Number(amount)) : '0'} ₫
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50 py-4 border-t flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setStep(1)}>Quay lại</Button>
            <Button data-testid="confirm-transfer-btn" className="bg-blue-600 hover:bg-blue-700" onClick={() => setStep(3)}>Xác nhận chuyển</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card className="shadow-sm text-center py-10">
          <CardContent className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Giao dịch thành công</h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Bạn đã chuyển {amount ? new Intl.NumberFormat('vi-VN').format(Number(amount)) : '0'} VND tới TRẦN VĂN A.
            </p>
            <div className="text-sm text-slate-400">Mã giao dịch: TXN20260724123456</div>
            <div className="pt-6 flex justify-center gap-4">
              <Button variant="outline" onClick={() => window.print()}>In biên lai</Button>
              <Button data-testid="new-transfer-btn" className="bg-blue-600 hover:bg-blue-700" onClick={() => { setStep(1); setAmount(''); }}>Thực hiện giao dịch mới</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
