
import React from 'react';
import { PlantScan } from '../types';
import { Trash2, AlertTriangle, Droplets, Info, CheckCircle2 } from 'lucide-react';

interface HistoryProps {
  scans: PlantScan[];
  onDelete: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ scans, onDelete }) => {
  if (scans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500">
        <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
          <Info size={40} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-bold">No History Found</h3>
        <p className="text-sm">Identify your first plant to see the magic happen!</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="px-2">
        <h2 className="text-2xl font-bold">Diagnostic History</h2>
        <p className="text-xs text-gray-500 mt-1">Access detailed plant IDs and care tips offline.</p>
      </div>
      
      {scans.map((scan) => (
        <div 
          key={scan.id} 
          className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800"
        >
          {/* Main Info Header */}
          <div className="flex p-4 gap-4 items-center">
            <img 
              src={scan.imageUrl} 
              alt={scan.plantName} 
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-gray-50 dark:ring-zinc-800"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-black text-green-600 mb-0.5">Identified Species</h3>
                  <h4 className="font-bold text-xl truncate leading-tight">{scan.plantName}</h4>
                </div>
                <button 
                  onClick={() => onDelete(scan.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${scan.condition.includes('Healthy') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {scan.condition}
                </span>
                {scan.isDried && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-700 flex items-center gap-1">
                    <Droplets size={10} /> Dried
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Advice & Quote */}
          <div className="bg-gray-50/50 dark:bg-zinc-800/30 p-4 border-t border-gray-50 dark:border-zinc-800">
            <div className="flex items-start gap-2 mb-3">
              <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-0.5">Expert Diagnosis</p>
                <p className="text-xs text-gray-700 dark:text-zinc-300">{scan.advice}</p>
              </div>
            </div>
            
            {/* Care Tips Section */}
            {scan.careTips && scan.careTips.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-zinc-700/50">
                <p className="text-[10px] font-black uppercase text-green-600 mb-2 tracking-widest">General Care Tips</p>
                <ul className="grid grid-cols-1 gap-2">
                  {scan.careTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[11px] text-gray-600 dark:text-zinc-400">
                      <CheckCircle2 size={12} className="text-green-500 shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 text-center italic text-[10px] text-green-600/70 dark:text-green-400/50">
              "{scan.quotation}"
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
