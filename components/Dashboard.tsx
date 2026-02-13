
import React, { useState, useEffect } from 'react';
import { WELCOME_QUOTES } from '../constants';
import { Leaf, ShieldAlert, CheckCircle2, CloudRain } from 'lucide-react';
import { PlantScan } from '../types';

interface DashboardProps {
  history: PlantScan[];
  onPullToRefresh: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ history, onPullToRefresh }) => {
  const [quote, setQuote] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setQuote(WELCOME_QUOTES[Math.floor(Math.random() * WELCOME_QUOTES.length)]);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(r => setTimeout(r, 1000));
    onPullToRefresh();
    setIsRefreshing(false);
  };

  const healthyCount = history.filter(s => s.condition.toLowerCase().includes('healthy')).length;
  const issueCount = history.length - healthyCount;

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-green-50 italic opacity-90 text-sm">"{quote}"</p>
        </div>
        <Leaf className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 rotate-12" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          icon={<ShieldAlert className="text-red-500" />}
          label="Diseases Detected"
          value={issueCount}
          bg="bg-red-50 dark:bg-red-900/20"
        />
        <StatCard 
          icon={<CheckCircle2 className="text-green-500" />}
          label="Healthy Plants"
          value={healthyCount}
          bg="bg-green-50 dark:bg-green-900/20"
        />
      </div>

      {/* Recent Activity Mini-Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Recent Scans</h3>
          <button onClick={handleRefresh} className={`text-sm text-green-600 ${isRefreshing ? 'animate-spin' : ''}`}>
            Refresh
          </button>
        </div>
        {history.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-gray-200 dark:border-zinc-800">
            <CloudRain className="mx-auto text-gray-300 dark:text-zinc-700 mb-2" size={40} />
            <p className="text-gray-500 text-sm">No scans yet. Start by identifying a plant!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 3).map((scan) => (
              <div key={scan.id} className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
                <img src={scan.imageUrl} alt={scan.plantName} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{scan.plantName}</h4>
                  <p className={`text-xs ${scan.condition.includes('Healthy') ? 'text-green-500' : 'text-amber-500'}`}>
                    {scan.condition}
                  </p>
                </div>
                <div className="text-[10px] text-gray-400">
                  {new Date(scan.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, bg }: any) => (
  <div className={`${bg} p-4 rounded-3xl flex flex-col items-start gap-2 border border-black/5 dark:border-white/5`}>
    <div className="bg-white dark:bg-zinc-800 p-2 rounded-xl shadow-sm">
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{label}</div>
    </div>
  </div>
);

export default Dashboard;
