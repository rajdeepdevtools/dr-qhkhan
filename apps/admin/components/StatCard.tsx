import React from 'react';

interface Props {
  title: string;
  value: number | string;
  subtext?: string;
  icon: React.ElementType;
  color?: string;
}

export const StatCard: React.FC<Props> = ({ title, value, subtext, icon: Icon, color = 'text-amber-400' }) => {
  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-2">
      <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase">
        <span>{title}</span>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <p className="text-3xl font-extrabold text-white tracking-tight">{value}</p>
      {subtext && <p className="text-[11px] text-slate-400 font-medium">{subtext}</p>}
    </div>
  );
};
