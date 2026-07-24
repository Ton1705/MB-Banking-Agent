import { Bell, Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUser } from '@/lib/mock-data';
import { useLocation, Link } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/accounts': 'Tài khoản',
  '/cards': 'Thẻ',
  '/transfer': 'Chuyển tiền',
  '/transactions': 'Lịch sử giao dịch',
  '/savings': 'Tiền gửi & Đầu tư',
  '/loans': 'Khoản vay',
  '/notifications': 'Thông báo',
  '/profile': 'Hồ sơ cá nhân',
};

export function Header() {
  const location = useLocation();
  const currentPage = pageTitles[location.pathname] || 'MB Banking';

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-sm px-6 sticky top-0 z-10" data-component="header">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/" className="text-slate-400 hover:text-mb-blue transition-colors">Trang chủ</Link>
        {location.pathname !== '/' && (
          <>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="font-medium text-slate-700">{currentPage}</span>
          </>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden w-72 lg:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            data-component="header-search"
            type="search"
            placeholder="Tìm kiếm giao dịch, tính năng..."
            className="pl-8 bg-slate-50/80 border-slate-200 focus:bg-white text-sm h-9"
          />
        </div>

        {/* Notifications */}
        <Link to="/notifications">
          <Button variant="ghost" size="icon" className="relative h-9 w-9" data-action="navigate-to-notifications">
            <Bell className="h-[18px] w-[18px] text-slate-500" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </Button>
        </Link>

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
              <Avatar className="h-9 w-9 ring-2 ring-slate-100">
                <AvatarImage src="" alt={mockUser.fullName} />
                <AvatarFallback className="bg-gradient-to-br from-mb-blue to-mb-navy text-white text-sm font-semibold">
                  {mockUser.fullName.split(' ').pop()?.[0]}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">{mockUser.fullName}</p>
                <p className="text-xs leading-none text-muted-foreground">{mockUser.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/profile" className="w-full" data-action="navigate-to-profile">Hồ sơ cá nhân</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Cài đặt</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/login" className="text-red-600 w-full" data-action="logout">Đăng xuất</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
