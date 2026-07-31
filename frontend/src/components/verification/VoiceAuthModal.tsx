import { useState, useEffect } from 'react';
import { X, Mic, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAudioVisualizer } from '@/hooks/useAudioVisualizer';

interface VoiceAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  promptText: string;
}

type AuthState = 'idle' | 'listening' | 'processing' | 'success' | 'error';

export function VoiceAuthModal({ isOpen, onClose, onSuccess, promptText }: VoiceAuthModalProps) {
  const [authState, setAuthState] = useState<AuthState>('idle');
  const [timeLeft, setTimeLeft] = useState(3);
  const { volume } = useAudioVisualizer(authState === 'listening');

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setAuthState('idle');
      setTimeLeft(3);
    }
  }, [isOpen]);

  // Handle mock verification flow
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (authState === 'listening') {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      } else {
        setAuthState('processing');
      }
    } else if (authState === 'processing') {
      // Simulate network request to AI backend
      timer = setTimeout(() => {
        setAuthState('success');
      }, 1500);
    } else if (authState === 'success') {
      timer = setTimeout(() => {
        onSuccess();
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [authState, timeLeft, onSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-scale-in m-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-lg text-mb-navy">Xác thực Sinh trắc học Giọng nói</h3>
          <button 
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            disabled={authState === 'processing' || authState === 'success'}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center p-8 text-center min-h-[300px]">
          
          {authState === 'idle' && (
            <div className="flex flex-col items-center gap-6 animate-fade-in w-full">
              <div className="text-slate-600">
                <p className="mb-2">Vui lòng đọc to và rõ cụm từ sau:</p>
                <div className="rounded-lg bg-mb-light/50 border border-mb-cyan/20 p-4 mb-2">
                  <span className="font-medium text-lg text-mb-blue">"{promptText}"</span>
                </div>
              </div>
              
              <button
                onClick={() => setAuthState('listening')}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-mb-gradient text-white shadow-lg shadow-mb-blue/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Mic className="h-8 w-8" />
              </button>
              <p className="text-sm font-medium text-mb-blue">Chạm để nói</p>
            </div>
          )}

          {authState === 'listening' && (
            <div className="flex flex-col items-center gap-6 animate-fade-in w-full">
              <div className="text-slate-600">
                <p className="mb-2">Đang lắng nghe...</p>
                <div className="rounded-lg bg-mb-light/50 border border-mb-cyan/20 p-4 mb-2">
                  <span className="font-medium text-lg text-mb-blue">"{promptText}"</span>
                </div>
              </div>
              
              <div className="relative flex h-20 w-20 items-center justify-center">
                {/* Visualizer Ring */}
                <div 
                  className="absolute rounded-full border-4 border-mb-cyan opacity-20 transition-all duration-75"
                  style={{ width: `${80 + volume}px`, height: `${80 + volume}px` }}
                />
                <div 
                  className="absolute rounded-full border-4 border-mb-blue opacity-10 transition-all duration-75"
                  style={{ width: `${80 + volume * 1.5}px`, height: `${80 + volume * 1.5}px` }}
                />
                <button
                  onClick={() => setAuthState('processing')}
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-lg animate-pulse"
                >
                  <Mic className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm font-medium text-red-500 animate-pulse">Còn {timeLeft} giây</p>
            </div>
          )}

          {authState === 'processing' && (
            <div className="flex flex-col items-center justify-center gap-4 h-full flex-1 animate-fade-in">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <div className="absolute h-full w-full rounded-full border-4 border-slate-100 border-t-mb-blue animate-spin"></div>
                <Mic className="h-8 w-8 text-mb-blue" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg text-slate-800">Đang phân tích giọng nói...</p>
                <p className="text-sm text-slate-500">Hệ thống đang đối chiếu sinh trắc học</p>
              </div>
            </div>
          )}

          {authState === 'success' && (
            <div className="flex flex-col items-center justify-center gap-4 h-full flex-1 animate-scale-in">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-500">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg text-green-600">Xác thực thành công!</p>
                <p className="text-sm text-slate-500">Danh tính đã được xác nhận</p>
              </div>
            </div>
          )}

          {authState === 'error' && (
            <div className="flex flex-col items-center justify-center gap-4 h-full flex-1 animate-fade-in">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-500">
                <AlertCircle className="h-12 w-12" />
              </div>
              <div className="text-center mb-4">
                <p className="font-semibold text-lg text-red-600">Xác thực thất bại</p>
                <p className="text-sm text-slate-500">Không thể nhận diện giọng nói của bạn.</p>
              </div>
              <button
                onClick={() => setAuthState('idle')}
                className="rounded-full bg-mb-blue px-6 py-2 text-white font-medium hover:bg-mb-navy transition-colors"
              >
                Thử lại
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
