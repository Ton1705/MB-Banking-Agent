import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AgentButton } from '../agent/AgentButton';
import { AgentPanel } from '../agent/AgentPanel';

export function DashboardLayout() {
  const [isAgentOpen, setIsAgentOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[hsl(210,20%,98%)] overflow-hidden font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
          <Outlet />
        </main>
        
        {/* AI Agent Assistant */}
        <AgentButton 
          isOpen={isAgentOpen} 
          onClick={() => setIsAgentOpen(!isAgentOpen)} 
        />
        <AgentPanel 
          isOpen={isAgentOpen} 
          onClose={() => setIsAgentOpen(false)} 
        />
      </div>
    </div>
  );
}
