
import React from 'react';
import { Home, Camera, History, Settings, MessageSquare, HelpCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'home' | 'scan' | 'history' | 'chat' | 'settings';
  setActiveTab: (tab: any) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
  return (
    <div className="flex flex-col h-[100dvh] bg-white dark:bg-zinc-950 transition-colors">
      <div className="h-[env(safe-area-inset-top)] bg-green-600 dark:bg-green-900" />
      
      <header className="px-6 py-4 bg-green-600 dark:bg-green-900 text-white flex justify-between items-center shadow-md z-10">
        <h1 className="text-xl font-bold tracking-tight">AgroDetect AI</h1>
        <div className="flex gap-3">
          <button onClick={() => setActiveTab('chat')} className="p-1">
            <MessageSquare size={22} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto relative pb-20">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 safe-pb flex justify-around items-center h-16 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-10">
        <NavItem 
          icon={<Home size={22} />} 
          label="Home" 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
        />
        <NavItem 
          icon={<Camera size={22} />} 
          label="Scan" 
          active={activeTab === 'scan'} 
          onClick={() => setActiveTab('scan')} 
        />
        <NavItem 
          icon={<MessageSquare size={22} />} 
          label="Chat" 
          active={activeTab === 'chat'} 
          onClick={() => setActiveTab('chat')} 
        />
        <NavItem 
          icon={<History size={22} />} 
          label="History" 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')} 
        />
        <NavItem 
          icon={<Settings size={22} />} 
          label="Settings" 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')} 
        />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full transition-colors ${active ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-zinc-500'}`}
  >
    {icon}
    <span className="text-[10px] mt-1 font-medium">{label}</span>
  </button>
);

export default Layout;
