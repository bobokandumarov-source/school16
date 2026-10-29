import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  centered = false,
  className = '',
  light = false,
}) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 ${
          light 
            ? 'bg-white/10 text-school-gold border border-school-gold/30' 
            : 'bg-school-bg-secondary text-school-navy border border-school-border'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-school-gold"></span>
          {badge}
        </div>
      )}
      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
        light ? 'text-white' : 'text-school-navy'
      }`}>
        {title}
      </h2>
      <div className={`h-1 w-14 bg-school-gold rounded-full my-4 ${centered ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed ${
          light ? 'text-slate-300' : 'text-school-muted'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
