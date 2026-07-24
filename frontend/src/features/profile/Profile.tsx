
import { User as UserIcon, Shield, Bell, Smartphone, Key, Mail, Phone, Edit2, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockUser } from '@/lib/mock-data';

export function Profile() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up" data-page="profile">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cài đặt Tài khoản</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1 shadow-md border-0 overflow-hidden bg-white">
          <div className="h-24 mb-gradient w-full"></div>
          <CardContent className="pt-0 relative px-6 pb-6 text-center">
            <div className="flex justify-center -mt-12 mb-4 relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg bg-white">
                <AvatarFallback className="bg-mb-light text-mb-navy text-2xl font-bold">
                  {mockUser.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-1/2 translate-x-10 translate-y-1 bg-mb-blue text-white p-1.5 rounded-full shadow-md hover:bg-mb-navy transition-colors">
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{mockUser.fullName}</h2>
            <p className="text-gray-500 text-sm mb-3">@{mockUser.username}</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 mb-6">
              Khách hàng Ưu tiên
            </span>
            
            <div className="space-y-3 pt-4 border-t text-left">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-3 text-mb-blue" /> {mockUser.phoneNumber}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-3 text-mb-blue" /> {mockUser.email}
              </div>
            </div>

            <Button variant="outline" className="w-full mt-6 text-mb-red border-red-200 hover:bg-red-50 hover:text-mb-red" data-action="logout">
              <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          {/* Contact Info Form */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <UserIcon className="h-5 w-5 mr-2 text-mb-blue" /> Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Họ và tên</label>
                  <Input defaultValue={mockUser.fullName} className="bg-slate-50" data-component="input-fullname" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tên đăng nhập</label>
                  <Input defaultValue={mockUser.username} disabled className="bg-slate-100 text-gray-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
                  <Input defaultValue={mockUser.phoneNumber || ''} className="bg-slate-50" data-component="input-phone" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input defaultValue={mockUser.email} type="email" className="bg-slate-50" data-component="input-email" />
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <Button className="bg-mb-blue hover:bg-mb-navy text-white" data-action="save-profile">Lưu thay đổi</Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Shield className="h-5 w-5 mr-2 text-mb-blue" /> Bảo mật & Đăng nhập
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 divide-y">
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mr-4">
                    <Key className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Mật khẩu đăng nhập</p>
                    <p className="text-sm text-gray-500">Cập nhật lần cuối: 30 ngày trước</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" data-action="change-password">Đổi mật khẩu</Button>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center mr-4">
                    <Smartphone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Digital OTP</p>
                    <p className="text-sm text-green-600 font-medium">Đang hoạt động trên thiết bị này</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" data-action="manage-otp">Quản lý</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Bell className="h-5 w-5 mr-2 text-mb-blue" /> Cài đặt Thông báo
              </CardTitle>
              <CardDescription>Chọn cách bạn muốn nhận thông báo từ MB</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">Biến động số dư</p>
                  <p className="text-sm text-gray-500">Nhận thông báo qua App khi số dư thay đổi</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle1" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" data-action="toggle-balance-notif" />
                  <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-5 rounded-full bg-mb-blue cursor-pointer"></label>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-t pt-4">
                <div>
                  <p className="font-medium text-gray-900">Chương trình khuyến mãi</p>
                  <p className="text-sm text-gray-500">Cập nhật các ưu đãi mới nhất từ MB</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle2" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" data-action="toggle-promo-notif" />
                  <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
