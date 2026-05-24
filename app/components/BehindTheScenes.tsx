"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, Workflow, Zap, Layout, Bot, ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Calculadora Inteligente",
    description: "Captura leads de fundo de funil instantaneamente. Ao invés de um botão 'Fale Conosco' morto, oferecemos uma experiência interativa que o cliente deseja usar.",
    colSpan: "md:col-span-2",
    bgClass: "bg-gradient-to-br from-[#0B1220] to-[#121E33]",
    iconColor: "text-[#F7C843]",
    iconBg: "bg-[#F7C843]/10"
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Arquitetura SEO",
    description: "Estrutura semântica otimizada para dominar o Google localmente e gerar tráfego orgânico sem depender apenas de tráfego pago.",
    colSpan: "md:col-span-1",
    bgClass: "bg-white/5",
    iconColor: "text-white",
    iconBg: "bg-white/10"
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Automação Integrada",
    description: "Leads caem direto no WhatsApp do seu vendedor e no seu CRM em tempo real, sem intervenção humana.",
    colSpan: "md:col-span-1",
    bgClass: "bg-white/5",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-400/10"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Performance Absoluta",
    description: "Carregamento ultra-rápido focado em retenção mobile. Não perca leads porque o site demorou para carregar no 4G.",
    colSpan: "md:col-span-1",
    bgClass: "bg-white/5",
    iconColor: "text-green-400",
    iconBg: "bg-green-400/10"
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "UX Premium",
    description: "Design imersivo que transmite confiança imediata para a venda de projetos de alto ticket.",
    colSpan: "md:col-span-1",
    bgClass: "bg-white/5",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-400/10"
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Inteligência Artificial",
    description: "Otimizações contínuas de copywriting e performance baseadas em dados e comportamento do usuário.",
    colSpan: "md:col-span-3",
    bgClass: "bg-gradient-to-r from-transparent via-[#F7C843]/5 to-transparent border-t border-[#F7C843]/10",
    iconColor: "text-[#F7C843]",
    iconBg: "bg-transparent"
  }
];

export default function BehindTheScenes() {
  return (
    <section className="py-24 bg-[#0A0A0C] relative overflow-hidden" id="bastidores">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#F7C843]/30 to-transparent"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F7C843]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7C843]/10 border border-[#F7C843]/20 mb-6 backdrop-blur-sm"
          >
            <Code2 className="w-4 h-4 text-[#F7C843]" />
            <span className="text-[#F7C843] text-sm font-bold tracking-widest uppercase">Showroom B2B</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Por trás da Mavinic Solar
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Este projeto não é apenas um site. É uma <strong className="text-white">máquina de aquisição de clientes</strong> construída com o que há de mais moderno em engenharia de software para o mercado fotovoltaico.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className={`p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors ${feature.bgClass} ${feature.colSpan}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${feature.iconBg} ${feature.iconColor}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/80 font-medium mb-6 text-lg">
            Sua empresa solar precisa de uma engenharia de vendas como esta.
          </p>
          <Link
            href="#orcamento"
            className="inline-flex items-center gap-3 bg-[#F7C843] text-black px-10 py-5 rounded-2xl text-lg font-black transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(247,200,67,0.3)]"
          >
            🚀 Quero este ecossistema na minha empresa
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
