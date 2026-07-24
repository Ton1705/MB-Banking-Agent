import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Send,
  History,
  UserCircle,
  PiggyBank,
  Landmark,
  Bell,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockUser } from '@/lib/mock-data';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Tài khoản', path: '/accounts', icon: Wallet },
  { name: 'Thẻ', path: '/cards', icon: CreditCard },
  { name: 'Chuyển tiền', path: '/transfer', icon: Send },
  { name: 'Lịch sử giao dịch', path: '/transactions', icon: History },
  { name: 'Tiền gửi', path: '/savings', icon: PiggyBank },
  { name: 'Khoản vay', path: '/loans', icon: Landmark },
  { name: 'Thông báo', path: '/notifications', icon: Bell },
  { name: 'Hồ sơ cá nhân', path: '/profile', icon: UserCircle },
];

export function Sidebar() {


  return (
    <aside className="hidden w-64 flex-col md:flex mb-gradient" data-component="sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 px-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L20 8L28 6L24 14L30 20L22 22L20 30L16 24L12 30L10 22L2 20L8 14L4 6L12 8L16 2Z" fill="#E63946"/>
            <circle cx="16" cy="16" r="5" fill="white"/>
          </svg>
          <span className="font-bold text-xl tracking-tight text-white">
            MB<span className="text-blue-300 font-normal ml-1 text-sm">Banking</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            data-action={`navigate-to-${item.path.replace('/', '') || 'dashboard'}`}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/15 text-white shadow-sm backdrop-blur-sm"
                  : "text-blue-200/70 hover:bg-white/8 hover:text-white"
              )
            }
          >
            <item.icon className="h-[18px] w-[18px] shrink-0" />
            {item.name}
            {item.name === 'Thông báo' && (
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                3
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white text-sm font-bold">
            {mockUser.fullName.split(' ').pop()?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{mockUser.fullName}</p>
            <p className="text-xs text-blue-300/70 truncate">{mockUser.email}</p>
          </div>
          <button
            data-action="logout"
            className="rounded-lg p-1.5 text-blue-300/50 hover:bg-white/10 hover:text-white transition-colors"
            title="Đăng xuất"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
