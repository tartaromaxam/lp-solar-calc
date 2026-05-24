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
            Sites e automações para <span className="text-solar italic font-semibold text-white">empresas solares</span> venderem mais.
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/60 text-lg md:text-xl lg:text-2xl font-light mb-8 max-w-[800px] leading-relaxed"
          >
            Criamos experiências digitais premium, calculadoras inteligentes e sistemas de geração de leads para o mercado fotovoltaico.
          </motion.p>

          {/* Case Real Alert */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="bg-solar/10 border border-solar/20 px-6 py-4 rounded-2xl mb-12 flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 max-w-[800px] backdrop-blur-md"
          >
            <div className="w-12 h-12 bg-solar/20 rounded-full flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-solar" />
            </div>
            <p className="text-white/80 font-medium text-sm md:text-base leading-relaxed">
              <strong className="text-solar block sm:inline">Showroom:</strong> Este projeto é um case real de tecnologia aplicada ao mercado solar.
            </p>
          </motion.div>

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          >
            <Link
              href="#orcamento"
              className="group relative flex items-center justify-center gap-3 bg-solar text-black px-8 py-5 rounded-2xl text-lg font-black transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_15px_40px_rgba(251,191,36,0.3)] overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine"></div>
              🚀 Quero um site assim
            </Link>

            <Link
              href="#beneficios"
              className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-5 rounded-2xl text-lg font-bold transition-all duration-300 w-full sm:w-auto"
            >
              Ver demonstração
            </Link>

            <Link
              href="#simulador"
              className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-5 rounded-2xl text-lg font-bold transition-all duration-300 w-full sm:w-auto"
            >
              Simular projeto
            </Link>
          </motion.div>

          {/* Floating Elements (Optional for "Wow" effect) */}
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-solar/5 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
