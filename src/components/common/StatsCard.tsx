import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  description,
  icon,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-100 shadow-card hover:shadow-elevated transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-school-navy via-school-gold to-school-navy transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-school-muted">{label}</span>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-school-bg-secondary flex items-center justify-center text-school-navy group-hover:bg-school-navy group-hover:text-school-gold transition-colors duration-300">
            {icon}
          </div>
        )}
      </div>

      <div className="text-3xl sm:text-4xl font-extrabold text-school-navy tracking-tight mb-2">
        {value}
      </div>

      {description && (
        <p className="text-sm text-school-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
