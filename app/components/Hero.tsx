"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero(): React.JSX.Element {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-[#0A0A0C]">
      {/* Background Image with Rich Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/solar-hero-bg.png"
          alt="Premium Solar Energy"
          fill
          className="object-cover opacity-40 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/80 via-transparent to-[#0A0A0C]"></div>
        <div className="absolute inset-0 bg-radial-gradient from-solar/5 to-transparent opacity-30"></div>
      </div>

      <div className="container mx-auto max-w-[1100px] px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solar/10 border border-solar/20 mb-8 backdrop-blur-md"
          >
            <Zap className="w-4 h-4 text-solar animate-pulse" />
            <span className="text-solar text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
              Energia Limpa & Economia Real
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.1] tracking-tight mb-8 max-w-[950px]"
          >
            Sua conta de luz <span className="text-solar italic font-semibold text-white">reduzida em até 95%</span> com a inteligência da Mavinic
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/60 text-lg md:text-xl lg:text-2xl font-light mb-12 max-w-[800px] leading-relaxed"
          >
            Descubra como transformar o sol em <span className="text-white font-medium">economia real</span> para sua casa ou empresa com projetos personalizados e instalação completa.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col items-center gap-6 w-full sm:w-auto"
          >
            <Link
              href="#orcamento"
              className="group relative flex items-center justify-center gap-4 bg-solar text-black px-10 sm:px-14 py-6 rounded-2xl text-lg sm:text-xl font-black transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_20px_60px_rgba(251,191,36,0.4)] overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine"></div>
              🚀 Quero minha simulação gratuita
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <div className="flex items-center gap-4 text-white/30 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-solar" /> Resposta rápida</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-solar" /> Sem compromisso</span>
            </div>

            <div className="flex items-center gap-6 mt-4 text-white/50 text-[10px] uppercase tracking-widest font-semibold">
              <span className="flex items-center gap-1.5">✔ Mais de 100 clientes atendidos</span>
              <span className="flex items-center gap-1.5">✔ Projetos personalizados</span>
            </div>
          </motion.div>

          {/* Floating Elements (Optional for "Wow" effect) */}
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-solar/5 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
