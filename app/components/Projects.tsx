"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, TrendingDown, ArrowRight, Home, Building2, Factory } from "lucide-react";

const caseStudies = [
  {
    category: "Residencial",
    icon: Home,
    title: "Família Silva – São Paulo",
    before: "850,00",
    after: "68,00",
    savings: "92%",
    image: "/residential-proof.png",
    benefits: ["Economia real na conta de luz", "Redução imediata de custos", "Retorno previsível"]
  },
  {
    category: "Comercial",
    icon: Building2,
    title: "Supermercado – Rio de Janeiro",
    before: "3.200,00",
    after: "220,00",
    savings: "93%",
    image: "/commercial-proof.png",
    benefits: ["Economia real na conta de luz", "Redução imediata de custos", "Retorno previsível"]
  },
  {
    category: "Industrial",
    icon: Factory,
    title: "Indústria Têxtil – Paraná",
    before: "15.000,00",
    after: "980,00",
    savings: "93%",
    image: "/industrial-proof.png",
    benefits: ["Economia real na conta de luz", "Redução imediata de custos", "Retorno previsível"]
  }
];

export default function Projects(): React.JSX.Element {
  return (
    <section id="projetos" className="py-24 md:py-32 bg-[#0A0A0C] border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-solar/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px] px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-[800px] mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6"
          >
            Projetos reais. <br />
            <span className="italic font-semibold text-solar">Resultados comprovados.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-xl font-light leading-relaxed"
          >
            Veja como nossos clientes estão reduzindo drasticamente a conta de luz com energia solar.
          </motion.p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {caseStudies.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass-card rounded-[40px] overflow-hidden border border-white/5 hover:border-solar/20 shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Header */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/20 to-transparent"></div>
                <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <study.icon className="w-4 h-4 text-solar" />
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">{study.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h4 className="text-xl font-medium text-white mb-8 group-hover:text-solar transition-colors">
                  {study.title}
                </h4>

                {/* Numbers Visualization */}
                <div className="bg-white/5 rounded-3xl p-6 mb-8 relative">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Antes</p>
                      <p className="text-white/50 text-lg line-through font-light italic">R$ {study.before}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-solar text-[10px] uppercase tracking-widest mb-1 font-bold">Depois</p>
                      <p className="text-white text-3xl font-bold tracking-tight">R$ {study.after}</p>
                    </div>
                  </div>
                  
                  {/* Savings Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-solar/10 border border-solar/20 px-4 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-sm">
                    <TrendingDown className="w-4 h-4 text-solar" />
                    <span className="text-solar font-black text-sm">Economia: {study.savings}</span>
                  </div>

                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-solar"
                    ></motion.div>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-4 mb-2">
                  {study.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/50 font-light">
                      <CheckCircle2 className="w-4 h-4 text-solar shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA in section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-solar/10 via-solar/5 to-transparent rounded-[60px] p-12 md:p-20 border border-solar/10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-solar/5 to-transparent pointer-events-none"></div>
          
          <p className="text-solar text-sm font-bold uppercase tracking-widest mb-4">
            Esses são apenas alguns exemplos. O seu pode ser o próximo.
          </p>
          <h3 className="text-3xl md:text-5xl font-medium text-white mb-8 tracking-tight max-w-2xl mx-auto leading-tight">
            Quer transformar sua conta assim também?
          </h3>
          <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Leva menos de 1 minuto • Sem compromisso • Atendimento rápido
          </p>
          
          <a 
            href="#orcamento"
            className="inline-flex items-center gap-4 bg-solar text-black px-12 py-6 rounded-2xl text-xl font-black transition-all duration-500 hover:scale-105 hover:shadow-[0_30px_60px_rgba(251,191,36,0.3)] group"
          >
            🚀 Quero minha simulação gratuita
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
