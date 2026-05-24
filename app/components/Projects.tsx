"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Laptop, Smartphone, Search, MessageSquare, Briefcase, TrendingUp } from "lucide-react";
import Image from "next/image";

const comparison = [
  {
    type: "Amador",
    title: "A panfletagem digital",
    icon: XCircle,
    color: "text-red-500",
    bgIcon: "bg-red-500/10",
    border: "border-red-500/20 hover:border-red-500/40",
    features: [
      { icon: Laptop, text: "Site lento e poluído visualmente", status: "bad" },
      { icon: MessageSquare, text: "Apenas um botão 'Fale no WhatsApp' genérico", status: "bad" },
      { icon: Search, text: "Invisível no Google para buscas locais", status: "bad" },
      { icon: Briefcase, text: "Leads frios pesquisando apenas preço", status: "bad" }
    ]
  },
  {
    type: "Premium",
    title: "A máquina de vendas",
    icon: CheckCircle2,
    color: "text-solar",
    bgIcon: "bg-solar/10",
    border: "border-solar/30 hover:border-solar/60 shadow-[0_0_40px_rgba(247,200,67,0.15)]",
    features: [
      { icon: Smartphone, text: "Design imersivo focado em mobile", status: "good" },
      { icon: TrendingUp, text: "Calculadora solar que retém o usuário", status: "good" },
      { icon: Search, text: "Arquitetura SEO para dominar a região", status: "good" },
      { icon: Briefcase, text: "Leads qualificados enviados direto ao CRM", status: "good" }
    ]
  }
];

export default function Projects(): React.JSX.Element {
  return (
    <section id="comparacao" className="py-24 md:py-32 bg-[#0A0A0C] border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-solar/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px] px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-[800px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
          >
            <span>Por que mudar?</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6"
          >
            A diferença entre um site que panfleta e <span className="italic font-semibold text-solar">um site que vende.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-xl font-light leading-relaxed"
          >
            A maioria das empresas solares perde dinheiro todos os dias com sites amadores. Veja o que acontece quando você investe em tecnologia de verdade.
          </motion.p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-24 max-w-5xl mx-auto">
          {comparison.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`glass-card rounded-[40px] p-8 md:p-12 border transition-all duration-500 relative ${item.border}`}
            >
              {/* Badge */}
              <div className="absolute top-8 right-8">
                <item.icon className={`w-10 h-10 ${item.color} opacity-20`} />
              </div>

              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${item.bgIcon}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              
              <p className="text-white/40 uppercase tracking-widest text-xs font-bold mb-2">Integrador</p>
              <h3 className="text-3xl font-bold text-white mb-8">{item.type}</h3>
              
              <ul className="space-y-6">
                {item.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-4">
                    <div className={`mt-1 rounded-full p-1.5 shrink-0 ${feature.status === 'good' ? 'bg-solar/20 text-solar' : 'bg-red-500/20 text-red-500'}`}>
                      <feature.icon className="w-4 h-4" />
                    </div>
                    <span className="text-white/70 text-lg leading-relaxed">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Final CTA in section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-[#0B1220] to-[#121E33] rounded-[60px] p-12 md:p-20 border border-solar/10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-solar/5 to-transparent pointer-events-none"></div>
          
          <p className="text-solar text-sm font-bold uppercase tracking-widest mb-4">
            Pare de perder orçamentos para a concorrência
          </p>
          <h3 className="text-3xl md:text-5xl font-medium text-white mb-8 tracking-tight max-w-2xl mx-auto leading-tight">
            Quer transformar sua captação de clientes hoje?
          </h3>
          <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Agende uma consultoria rápida e entenda como implementar esse funil na sua empresa.
          </p>
          
          <a 
            href="#orcamento"
            className="inline-flex items-center gap-4 bg-solar text-black px-12 py-6 rounded-2xl text-xl font-black transition-all duration-500 hover:scale-105 hover:shadow-[0_30px_60px_rgba(251,191,36,0.3)] group"
          >
            🚀 Agendar Consultoria Estratégica
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
