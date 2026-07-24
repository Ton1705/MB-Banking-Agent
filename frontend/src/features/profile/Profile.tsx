import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUser } from '@/lib/mock-data';
import { Edit2, Shield, Bell, Smartphone } from 'lucide-react';

export function Profile() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Hồ sơ cá nhân</h1>
        <p className="text-slate-500">Quản lý thông tin tài khoản và bảo mật</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 shadow-sm h-fit">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4 border-4 border-white shadow-sm">
              <AvatarImage src="" alt={mockUser.fullName} />
              <AvatarFallback className="bg-blue-600 text-white text-3xl">
                {mockUser.fullName.split(' ').pop()?.[0]}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-slate-900">{mockUser.fullName}</h2>
            <p className="text-sm text-slate-500 mb-4">Khách hàng Ưu tiên</p>
            <div className="flex gap-2 w-full mt-2">
              <Button variant="outline" className="flex-1"><Edit2 className="w-4 h-4 mr-2"/> Sửa</Button>
            </div>
            
            <div className="w-full mt-6 pt-6 border-t border-slate-100 text-left space-y-4">
              <div className="flex items-center text-sm">
                <Shield className="w-4 h-4 mr-3 text-green-500" />
                <span className="text-slate-600 flex-1">Xác thực 2 bước</span>
                <span className="text-green-600 font-medium text-xs bg-green-50 px-2 py-0.5 rounded-full">Đã bật</span>
              </div>
              <div className="flex items-center text-sm">
                <Smartphone className="w-4 h-4 mr-3 text-blue-500" />
                <span className="text-slate-600 flex-1">Smart OTP</span>
                <span className="text-blue-600 font-medium text-xs bg-blue-50 px-2 py-0.5 rounded-full">Đã đăng ký</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Họ và tên</label>
                  <Input defaultValue={mockUser.fullName} readOnly className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Tên đăng nhập</label>
                  <Input defaultValue={mockUser.username} readOnly className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Số điện thoại</label>
                  <Input defaultValue={mockUser.phoneNumber || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <Input defaultValue={mockUser.email} />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">Lưu thay đổi</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center">
                <Bell className="w-5 h-5 mr-2" /> Tùy chọn thông báo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <div className="font-medium">Biến động số dư</div>
                  <div className="text-sm text-slate-500">Nhận thông báo khi có giao dịch mới</div>
                </div>
                <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <div className="font-medium">Chương trình khuyến mãi</div>
                  <div className="text-sm text-slate-500">Nhận tin tức ưu đãi và quà tặng</div>
                </div>
                <div className="w-11 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
