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
              Case Real: Tecnologia & Energia Solar
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.1] tracking-tight mb-8 max-w-[950px]"
          >
            Experiências digitais premium para <span className="text-solar italic font-semibold text-white">empresas solares</span> venderem mais.
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/60 text-lg md:text-xl lg:text-2xl font-light mb-8 max-w-[800px] leading-relaxed"
          >
            <span className="text-[#F7C843] font-medium">Este projeto é um case real de tecnologia aplicada ao mercado fotovoltaico.</span> Descubra como transformamos a presença digital de integradoras solares através de sites e calculadoras inteligentes.
          </motion.p>

          {/* Ideal Para */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-12 max-w-[800px]"
          >
            <span className="text-white/40 text-sm font-medium mr-2">Ideal para:</span>
            {["Integradoras Solares", "Empresas Fotovoltaicas", "Consultorias de Energia", "Instaladores Solares", "Franquias Solares"].map((item, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs md:text-sm font-medium backdrop-blur-sm">
                {item}
              </span>
            ))}
          </motion.div>

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
              🚀 Ver Nossas Soluções
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <div className="flex items-center gap-4 text-white/30 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-solar" /> Alta Conversão</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-solar" /> Design Premium</span>
            </div>

            <div className="flex items-center gap-6 mt-4 text-white/50 text-[10px] uppercase tracking-widest font-semibold">
              <span className="flex items-center gap-1.5">✔ Captação de Leads</span>
              <span className="flex items-center gap-1.5">✔ Automação Solar</span>
            </div>
          </motion.div>

          {/* Floating Elements (Optional for "Wow" effect) */}
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-solar/5 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
