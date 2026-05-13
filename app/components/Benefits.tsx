"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp, Home, Settings, Leaf } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Economia imediata de até 95%",
    description: "Zere o desperdício e comece a pagar apenas o mínimo obrigatório na sua fatura.",
    highlight: "95%"
  },
  {
    icon: TrendingUp,
    title: "Lucro real no seu bolso",
    description: "O sistema se paga sozinho em poucos anos. Depois disso, o que era gasto vira lucro livre.",
    highlight: "lucro"
  },
  {
    icon: Home,
    title: "Valorização do seu patrimônio",
    description: "Imóveis com tecnologia solar são ativos mais valiosos, sustentáveis e desejados no mercado.",
    highlight: "patrimônio"
  },
  {
    icon: Settings,
    title: "Tecnologia de ponta sem preocupação",
    description: "Sistemas robustos com garantia de longa duração e baixíssima necessidade de manutenção.",
    highlight: "manutenção"
  },
  {
    icon: Leaf,
    title: "Liberdade e independência",
    description: "Produza sua própria energia limpa e proteja-se contra os constantes aumentos de tarifa.",
    highlight: "independência"
  }
];

export default function Benefits(): React.JSX.Element {
  return (
    <section id="beneficios" className="py-24 md:py-32 bg-[#0A0A0C] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-solar/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px] px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-[800px] mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6"
          >
            Por que investir em <br />
            <span className="italic font-semibold text-solar text-white">energia solar agora?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-xl font-light leading-relaxed"
          >
            Veja como você pode economizar e transformar sua conta de luz em investimento.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-10 rounded-[32px] border border-white/5 hover:border-solar/30 transition-all duration-500 group relative overflow-hidden ${
                index === 3 || index === 4 ? "lg:col-span-1.5" : ""
              }`}
            >
              {/* Card Hover Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-solar/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="w-14 h-14 bg-solar/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <benefit.icon className="w-7 h-7 text-solar" />
              </div>

              <h3 className="text-2xl font-medium text-white mb-4 leading-tight">
                {benefit.title.split(benefit.highlight).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-solar font-bold">{benefit.highlight}</span>
                    )}
                  </span>
                ))}
              </h3>

              <p className="text-white/40 font-light text-lg leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
