import React from 'react';

interface Props {
  title: string;
  value: number | string;
  subtext?: string;
  icon: React.ElementType;
  color?: string;
}

export const StatCard: React.FC<Props> = ({ title, value, subtext, icon: Icon, color = 'text-orange-500' }) => {
  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-rose-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.15em]">{title}</span>
        <div className={`p-2.5 rounded-xl bg-white shadow-sm border border-slate-100 ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="relative z-10">
        <p className="text-4xl font-black text-slate-800 tracking-tight">{value}</p>
        {subtext && <p className="text-[11px] text-slate-500 font-bold mt-1 bg-white/50 inline-block px-2 py-0.5 rounded-md border border-slate-200/50">{subtext}</p>}
      </div>
    </div>
  );
};
