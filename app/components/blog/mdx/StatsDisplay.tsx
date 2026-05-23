import React from 'react';
import { motion } from 'framer-motion';

interface StatsDisplayProps {
  value: string;
  label: string;
  description?: string;
}

export default function StatsDisplay({ value, label, description }: StatsDisplayProps) {
  return (
    <div className="my-10 p-8 rounded-3xl bg-gradient-to-br from-[#0B1220] to-[#0A0A0C] border border-[#F7C843]/20 shadow-[0_10px_40px_rgba(247,200,67,0.1)] relative overflow-hidden group">
      {/* Decorative gradient orb */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F7C843]/10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F7C843] to-[#D4AF37] mb-2 tracking-tighter">
          {value}
        </span>
        <span className="text-xl md:text-2xl font-semibold text-white/90 mb-2 uppercase tracking-wide">
          {label}
        </span>
        {description && (
          <p className="text-white/60 max-w-md mx-auto m-0 text-sm md:text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
