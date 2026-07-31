import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        "flex w-full gap-3 animate-slide-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
      data-component={`msg-${message.role}`}
    >
      {/* Avatar */}
      <div className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm",
        isUser ? "bg-mb-cyan text-white" : "mb-gradient text-white"
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Bubble */}
      <div className={cn(
        "flex max-w-[75%] flex-col gap-1",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
          isUser 
            ? "bg-mb-blue text-white rounded-tr-sm" 
            : "bg-white text-slate-800 border border-slate-100 rounded-tl-sm"
        )}>
          {message.content}
        </div>
        <span className="text-[10px] text-slate-400 font-medium px-1">
          {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
