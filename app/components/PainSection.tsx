"use client";

import { motion } from "framer-motion";

export default function PainSection(): React.JSX.Element {
  return (
    <section className="py-24 md:py-32 bg-[#0F0F12] overflow-hidden">
      <div className="container mx-auto max-w-[900px] px-8">
        <div className="flex flex-col gap-16 md:gap-24">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-tight">
              Por que você ainda <br />
              <span className="text-red-500/80 font-semibold italic">perde vendas para a concorrência?</span>
            </h2>
          </motion.div>

          {/* Emotional Text Blocks */}
          <div className="flex flex-col gap-8 md:gap-12">
            {[
              {
                text: "Todo mês a mesma luta: você investe pesado em anúncios, mas ",
                highlight: "os leads chegam frios",
                after: " ou totalmente desqualificados."
              },
              {
                text: "Mandar PDFs genéricos no WhatsApp já não convence o cliente que está prestes a investir R$40.000 em um sistema.",
                highlight: "",
                after: ""
              },
              {
                text: "A sua empresa parece pequena na internet, enquanto seus concorrentes usam ",
                highlight: "experiências digitais premium",
                after: " para fechar projetos de alto valor."
              },
              {
                text: "A verdade é dura: cada dia com um site amador é ",
                highlight: "dinheiro sendo deixado na mesa",
                after: " para a concorrência."
              }
            ].map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-6 group"
              >
                <div className="w-1 h-12 bg-white/5 group-hover:bg-red-500/30 transition-colors rounded-full shrink-0 mt-1"></div>
                <p className="text-xl md:text-2xl lg:text-3xl text-white/50 font-light leading-relaxed">
                  {block.text}
                  {block.highlight && (
                    <span className="text-white/90 font-medium border-b border-red-500/20">
                      {block.highlight}
                    </span>
                  )}
                  {block.after}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Transition Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center pt-8 border-t border-white/5"
          >
            <p className="text-lg md:text-xl text-solar/80 font-medium tracking-wide uppercase">
              O mercado solar amadureceu. A sua presença digital também deveria.
            </p>
            <div className="mt-4 flex justify-center">
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-px h-12 bg-gradient-to-b from-solar/80 to-transparent"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
