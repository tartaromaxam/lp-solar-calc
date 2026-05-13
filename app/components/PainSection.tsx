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
              Por que continuar <br />
              <span className="text-red-500/80 font-semibold italic">financiando a concessionária?</span>
            </h2>
          </motion.div>

          {/* Emotional Text Blocks */}
          <div className="flex flex-col gap-8 md:gap-12">
            {[
              {
                text: "Todo mês a mesma indignação: a conta sobe e o seu ",
                highlight: "poder de compra",
                after: " diminui."
              },
              {
                text: "Economizar no banho ou desligar o ar-condicionado não resolve o problema estrutural.",
                highlight: "",
                after: ""
              },
              {
                text: "Você está pagando caro por algo que o ",
                highlight: "sol te entrega de graça",
                after: " todos os dias."
              },
              {
                text: "A verdade é dura: cada mês sem energia solar é ",
                highlight: "dinheiro que nunca mais volta",
                after: " para o seu bolso."
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
              O sol é seu. A energia também deveria ser.
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
