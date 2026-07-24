import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  CreditCard, 
  Send, 
  History, 
  UserCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Tài khoản', path: '/accounts', icon: Wallet },
  { name: 'Thẻ', path: '/cards', icon: CreditCard },
  { name: 'Chuyển tiền', path: '/transfer', icon: Send },
  { name: 'Lịch sử giao dịch', path: '/transactions', icon: History },
  { name: 'Hồ sơ cá nhân', path: '/profile', icon: UserCircle },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col bg-slate-900 text-white md:flex">
      <div className="flex h-16 items-center px-6 font-bold text-xl tracking-tight border-b border-slate-800">
        <span className="text-blue-500 mr-2">MB</span>Banking
      </div>
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        © 2026 MB Banking
      </div>
    </aside>
  );
}
