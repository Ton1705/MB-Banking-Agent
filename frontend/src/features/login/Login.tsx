import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Fingerprint, Lock, User, Check, Shield } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div data-page="login" className="flex h-screen w-full bg-white animate-fade-in">
      {/* Left side - Gradient */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 mb-gradient p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
              <span className="text-mb-navy font-bold text-2xl">MB</span>
            </div>
            <span className="font-bold text-2xl tracking-tight">BANK</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-4 mt-20">Ngân hàng số<br/>thông minh</h1>
          <p className="text-mb-light text-xl opacity-90">Trải nghiệm tiện ích ngân hàng hàng đầu với MB Bank.</p>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full bg-white opacity-5"></div>
        <div className="absolute bottom-[10%] left-[-20%] w-80 h-80 rounded-full bg-mb-cyan opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-64 h-64 rounded-full bg-white opacity-10"></div>
        
        <div className="relative z-10 flex items-center gap-2 text-sm text-mb-light/80">
          <Shield className="w-4 h-4" />
          <span>Được bảo mật bởi công nghệ mã hóa 256-bit</span>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden flex items-center gap-2 mb-10 justify-center">
            <div className="w-10 h-10 bg-mb-navy rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">MB</span>
            </div>
            <span className="font-bold text-2xl text-mb-navy tracking-tight">BANK</span>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Chào mừng trở lại</h2>
          <p className="text-slate-500 mb-8">Đăng nhập để quản lý tài chính của bạn.</p>

          <form onSubmit={handleLogin} className="space-y-6" data-component="login-form">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Tên đăng nhập</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input type="text" placeholder="Nhập tên đăng nhập" className="pl-10 h-12" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input type="password" placeholder="Nhập mật khẩu" className="pl-10 h-12" required />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-5 h-5 border border-slate-300 rounded flex items-center justify-center group-hover:border-mb-cyan transition-colors">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-slate-600">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-sm font-medium text-mb-blue hover:text-mb-cyan transition-colors">Quên mật khẩu?</a>
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-mb-blue to-mb-cyan hover:opacity-90 transition-opacity border-0 text-white" data-action="submit-login">
              Đăng nhập
            </Button>
            
            <div className="mt-6 flex justify-center">
              <button type="button" className="flex flex-col items-center gap-2 text-slate-500 hover:text-mb-blue transition-colors group">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-mb-light group-hover:text-mb-blue transition-colors">
                  <Fingerprint className="w-6 h-6" />
                </div>
                <span className="text-sm">Đăng nhập bằng Face ID / Vân tay</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
