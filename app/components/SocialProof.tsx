"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "CEO, EcoSolar Integradores",
    content: "O simulador transformou nosso site. Antes os clientes entravam e saíam sem deixar contato. Agora, a calculadora retém a atenção e eles nos enviam a conta de luz no WhatsApp na mesma hora. Nossa conversão triplicou.",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Amanda Costa",
    role: "Diretora de Vendas, Lux Fotovoltaica",
    content: "A arquitetura SEO que a Mavinic construiu nos colocou no topo do Google em nossa região em menos de 3 meses. Não dependemos mais apenas de anúncios no Facebook para fechar grandes projetos comerciais.",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Roberto Almeida",
    role: "Fundador, Sol&Energia",
    content: "O design do site passa tanta autoridade que os clientes param de pechinchar preço. Eles sentem que estão contratando a melhor engenharia do estado. A automação jogando os leads direto no meu CRM foi a cereja do bolo.",
    image: "https://i.pravatar.cc/150?img=8",
  }
];

export default function SocialProof(): React.JSX.Element {
  return (
    <section className="py-24 bg-[#0F0F12] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-solar/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solar/10 border border-solar/20 mb-6 backdrop-blur-sm"
          >
            <Star className="w-4 h-4 text-solar" fill="currentColor" />
            <span className="text-solar text-sm font-bold tracking-widest uppercase">Prova Social</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            O que as integradoras estão dizendo
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Empresas de energia solar de todo o país que deixaram a panfletagem digital para trás e escalaram suas vendas com nossa tecnologia.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 relative hover:border-solar/30 transition-colors"
            >
              <Quote className="w-10 h-10 text-solar/20 absolute top-6 right-6" />
              
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-solar" fill="currentColor" />
                ))}
              </div>
              
              <p className="text-white/80 italic leading-relaxed mb-8 text-sm md:text-base">
                &quot;{testimonial.content}&quot;
              </p>
              
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-solar/80 text-xs font-medium uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
