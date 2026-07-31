import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function AgentButton({ onClick, isOpen }: AgentButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95",
        isOpen ? "bg-slate-800 text-white shadow-slate-500/50" : "mb-gradient-cyan text-white animate-pulse-glow"
      )}
      aria-label="Toggle AI Assistant"
      data-component="agent-fab"
      data-action="toggle-agent"
    >
      <Bot className={cn("h-6 w-6 transition-transform duration-300", isOpen && "rotate-45")} />
    </button>
  );
}
