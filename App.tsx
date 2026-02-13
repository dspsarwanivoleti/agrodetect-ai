
import React, { useState, useEffect } from 'react';
import { AppState, User, PlantScan } from './types';
import { LOCAL_STORAGE_KEYS } from './constants';
import Auth from './components/Auth';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Settings from './components/Settings';
import CameraScanner from './components/CameraScanner';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
  });

  const [history, setHistory] = useState<PlantScan[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.HISTORY);
    return stored ? JSON.parse(stored) : [];
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME);
    if (stored !== null) return JSON.parse(stored);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeTab, setActiveTab] = useState<'home' | 'scan' | 'history' | 'chat' | 'settings'>('home');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(LOCAL_STORAGE_KEYS.HISTORY, JSON.stringify(history));
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, JSON.stringify(darkMode));
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user, history, darkMode]);

  const handleLogin = (email: string, name: string) => {
    setUser({ id: Date.now().toString(), email, name, isLoggedIn: true });
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  const handleDeleteAccount = () => {
    setUser(null);
    setHistory([]);
    localStorage.clear();
  };

  const handleScanComplete = (scan: PlantScan) => {
    setHistory(prev => [scan, ...prev]);
    setIsScanning(false);
    setActiveTab('history');
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="h-full bg-white dark:bg-zinc-950">
      {isScanning ? (
        <CameraScanner 
          onScanComplete={handleScanComplete} 
          onClose={() => setIsScanning(false)} 
        />
      ) : (
        <Layout 
          activeTab={activeTab === 'scan' ? 'home' : activeTab}
          setActiveTab={(tab) => {
            if (tab === 'scan') setIsScanning(true);
            else setActiveTab(tab);
          }} 
          onLogout={handleLogout}
        >
          {activeTab === 'home' && (
            <Dashboard history={history} onPullToRefresh={() => {}} />
          )}
          {activeTab === 'chat' && (
            <Chatbot />
          )}
          {activeTab === 'history' && (
            <History scans={history} onDelete={deleteHistoryItem} />
          )}
          {activeTab === 'settings' && (
            <Settings 
              darkMode={darkMode} 
              onToggleTheme={() => setDarkMode(!darkMode)} 
              onLogout={handleLogout}
              onDeleteAccount={handleDeleteAccount}
            />
          )}
        </Layout>
      )}
    </div>
  );
};

export default App;
