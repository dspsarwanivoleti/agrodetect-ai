
import React from 'react';
import { Moon, Sun, Trash, LogOut, ChevronRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface SettingsProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

const Settings: React.FC<SettingsProps> = ({ darkMode, onToggleTheme, onLogout, onDeleteAccount }) => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Settings</h2>
      
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Appearance</h3>
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 divide-y divide-gray-100 dark:divide-zinc-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                {darkMode ? <Moon size={20} className="text-indigo-600" /> : <Sun size={20} className="text-indigo-600" />}
              </div>
              <span className="font-medium">Dark Mode</span>
            </div>
            <button 
              onClick={onToggleTheme}
              className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-green-600' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">General</h3>
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 divide-y divide-gray-100 dark:divide-zinc-800">
          <SettingsLink icon={<ShieldCheck size={20} />} label="Privacy Policy" />
          <SettingsLink icon={<HelpCircle size={20} />} label="Help Center" />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Account</h3>
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 divide-y divide-gray-100 dark:divide-zinc-800">
          <button 
            onClick={onLogout}
            className="flex items-center justify-between w-full p-4 active:bg-gray-50 dark:active:bg-zinc-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                <LogOut size={20} className="text-gray-600" />
              </div>
              <span className="font-medium text-gray-600">Logout</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </button>
          
          {/* Required Account Deletion for Store Compliance */}
          <button 
            onClick={() => {
              if (confirm("Are you sure you want to delete your account? This action is irreversible.")) {
                onDeleteAccount();
              }
            }}
            className="flex items-center justify-between w-full p-4 active:bg-red-50 dark:active:bg-red-900/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-xl">
                <Trash size={20} className="text-red-600" />
              </div>
              <span className="font-medium text-red-600">Delete Account</span>
            </div>
            <ChevronRight size={18} className="text-red-300" />
          </button>
        </div>
      </section>

      <div className="text-center">
        <p className="text-[10px] text-gray-400">AgroDetect AI v1.2.0 (Stable)</p>
        <p className="text-[10px] text-gray-400 mt-1">Engineered for Agricultural Excellence</p>
      </div>
    </div>
  );
};

const SettingsLink = ({ icon, label }: any) => (
  <div className="flex items-center justify-between p-4 active:bg-gray-50 dark:active:bg-zinc-800 transition-colors">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gray-50 dark:bg-zinc-800 rounded-xl">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </div>
    <ChevronRight size={18} className="text-gray-300" />
  </div>
);

export default Settings;
