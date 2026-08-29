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
    <div className="bg-white border border-[#D9D9D9] rounded-2xl p-5 shadow-sm space-y-2">
      <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
        <span>{title}</span>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <p className="text-3xl font-black text-[#1A0706] tracking-tight">{value}</p>
      {subtext && <p className="text-[11px] text-slate-500 font-bold">{subtext}</p>}
    </div>
  );
};
