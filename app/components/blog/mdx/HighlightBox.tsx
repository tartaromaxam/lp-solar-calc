import React from 'react';
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface HighlightBoxProps {
  children: React.ReactNode;
  title?: string;
  type?: 'info' | 'warning' | 'success';
}

export default function HighlightBox({ children, title, type = 'info' }: HighlightBoxProps) {
  const styles = {
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      icon: <Info className="w-5 h-5 text-blue-400" />,
      titleColor: 'text-blue-400',
    },
    warning: {
      bg: 'bg-[#F7C843]/10',
      border: 'border-[#F7C843]/20',
      icon: <AlertTriangle className="w-5 h-5 text-[#F7C843]" />,
      titleColor: 'text-[#F7C843]',
    },
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
      titleColor: 'text-green-400',
    },
  };

  const currentStyle = styles[type];

  return (
    <div className={`my-8 p-6 rounded-2xl border ${currentStyle.bg} ${currentStyle.border} backdrop-blur-sm shadow-lg shadow-black/20`}>
      {title && (
        <div className="flex items-center gap-3 mb-3">
          {currentStyle.icon}
          <h4 className={`m-0 font-bold ${currentStyle.titleColor}`}>{title}</h4>
        </div>
      )}
      <div className="prose-p:m-0 text-white/80 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
