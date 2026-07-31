import { useState, useRef, useEffect } from 'react';
import { X, Mic, Send, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MessageBubble, type Message } from './MessageBubble';
import { extractDOMContext } from '@/lib/agent/dom-parser';
import { processUserIntent } from '@/lib/agent/llm-service';
import { executeAction } from '@/lib/agent/action-executor';

interface AgentPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AgentPanel({ isOpen, onClose }: AgentPanelProps) {
  const [isListening, setIsListening] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      role: 'agent',
      content: 'Xin chào! Tôi là Trợ lý ảo MB. Bạn cần tôi giúp gì hôm nay?',
      timestamp: new Date(),
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isProcessing) return;
    
    const userText = inputValue.trim();
    
    // Add user message
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsProcessing(true);
    
    try {
      // 1. Quét DOM Context hiện tại
      const domContext = extractDOMContext();
      
      // 2. Gửi cho LLM Service để xử lý ý định
      const response = await processUserIntent(userText, domContext);
      
      // 3. Hiển thị tin nhắn trả lời của Agent
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: response.reply,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);

      // 4. Thực thi các Action tương ứng (nếu có)
      for (const action of response.actions) {
        await executeAction(action);
      }
    } catch (error) {
      console.error('Lỗi khi xử lý agent:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'agent',
        content: 'Xin lỗi, hệ thống đang bận. Vui lòng thử lại sau.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const toggleListen = () => {
    setIsListening(!isListening);
    // In future modules, this will trigger the ASR engine
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed bottom-24 right-6 z-50 flex h-[600px] max-h-[calc(100vh-120px)] w-[380px] flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl border border-slate-200 animate-slide-up"
      data-component="agent-panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 mb-gradient text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm shadow-inner">
            <SparklesIcon className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">MB AI Assistant</h3>
            <p className="text-[10px] text-blue-200 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span> Trực tuyến
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
          <button 
            onClick={onClose}
            className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            data-action="close-agent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar bg-slate-50/50">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isListening && (
          <div className="flex items-center gap-2 self-start animate-fade-in pl-11">
            <div className="text-xs text-slate-500 italic">Đang nghe...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Visualizer (shows when listening) */}
      <div className={cn(
        "flex h-12 items-center justify-center gap-1 overflow-hidden transition-all duration-300",
        isListening ? "opacity-100" : "h-0 opacity-0"
      )}>
        {[...Array(7)].map((_, i) => (
          <div 
            key={i}
            className="w-1.5 rounded-full bg-mb-cyan animate-soundwave"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-slate-100">
        <div className="relative flex items-center gap-2">
          {/* Main Voice Button */}
          <button
            onClick={toggleListen}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300",
              isListening 
                ? "bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]" 
                : "bg-mb-blue/10 text-mb-blue hover:bg-mb-blue/20"
            )}
            data-action={isListening ? "stop-listen" : "start-listen"}
          >
            <Mic className="h-5 w-5" />
          </button>

          {/* Text Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tin nhắn..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-10 text-sm focus:border-mb-cyan focus:outline-none focus:ring-1 focus:ring-mb-cyan"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full text-mb-blue hover:bg-mb-blue/10 disabled:opacity-30 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="mt-2 text-center text-[10px] text-slate-400">
          Có thể dùng giọng nói hoặc nhập phím
        </p>
      </div>
    </div>
  );
}

// Sparkles icon definition as it's used in the header
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
