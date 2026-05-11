"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, ShieldCheck, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LeadForm(): React.JSX.Element {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | 'success' | null, message: string }>({ type: null, message: "" });
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    companyName: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      console.log("[Solar-Leads] Enviando dados para as automações...", formData);
      
      // Envia para o Railway e Make em paralelo
      const [response, makeResponse] = await Promise.all([
        fetch("https://bot-telegram-production-0a8d.up.railway.app/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }),
        fetch("https://hook.us2.make.com/uenwaqqn6cjyrx754med5l5hcarhby46", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      ]);

      const result = await response.json().catch(() => ({ success: false, error: "Resposta inválida do servidor" }));

      if (response.ok && result.success) {
        console.log("✅ [Solar-Leads] Sucesso!");
        setSubmitted(true);
      } else {
        console.error("❌ [Solar-Leads] Erro na resposta:", result);
        setStatus({ 
          type: 'error', 
          message: result.error || "Erro ao processar simulação. Tente novamente em instantes." 
        });
      }
    } catch (error: any) {
      console.error("❌ [Solar-Leads] Erro de conexão/CORS:", error);
      setStatus({ 
        type: 'error', 
        message: "Erro de conexão. Verifique seu sinal de internet ou WiFi." 
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="orcamento" className="py-24 md:py-32 flex items-center justify-center bg-[#0a0a0c]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 rounded-[40px] text-center max-w-[600px] mx-auto border-solar/20"
        >
          <div className="w-20 h-20 bg-solar/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-solar" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Simulação Solicitada!</h2>
          <p className="text-white/60 text-lg font-light leading-relaxed">
            Seus dados foram recebidos. Em breve, um de nossos especialistas entrará em contato com sua simulação completa.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="orcamento" className="py-24 md:py-32 pb-48 md:pb-32 bg-[#0A0A0C] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-solar/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px] px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Content Side */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-8 leading-[1.1]"
            >
              Descubra quanto você <span className="italic font-semibold text-solar text-white">pode economizar</span> na sua conta de luz
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-xl font-light leading-relaxed mb-12"
            >
              Solicite agora sua simulação gratuita e veja quanto você pode reduzir já nos próximos meses.
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 mb-12"
            >
              {[
                { text: "Leva menos de 1 minuto", icon: CheckCircle2 },
                { text: "Sem compromisso", icon: CheckCircle2 },
                { text: "Atendimento rápido", icon: CheckCircle2 }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white/80">
                  <item.icon className="w-6 h-6 text-solar" />
                  <span className="text-lg font-light tracking-wide italic leading-none flex items-center gap-1.5">
                    <span className="text-solar opacity-100">✔</span> {item.text}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* Urgency Element */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-2xl text-red-500/90 text-sm"
            >
              <AlertCircle className="w-5 h-5" />
              <p className="font-medium italic">
                Atendimento limitado por região — solicite sua simulação enquanto ainda há disponibilidade.
              </p>
            </motion.div>
          </div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 md:p-14 rounded-[50px] shadow-2xl relative border-white/5"
          >
            <div className="absolute top-0 right-16 w-32 h-1.5 bg-solar rounded-b-full"></div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4 font-bold">Seu Nome</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Como deseja ser chamado?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-solar/40 transition-all font-light text-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4 font-bold">WhatsApp</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    placeholder="(00) 00000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-solar/40 transition-all font-light text-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4 font-bold">
                    Nome da Empresa <span className="text-white/10 italic">(Opcional)</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder="Ex: SolarTech Brasil"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-solar/40 transition-all font-light text-lg"
                  />
                </div>
              </div>

              {status.type === 'error' && (
                <div className="bg-red-500/10 border border-red-500/50 p-5 rounded-2xl text-red-500 text-sm animate-shake">
                  {status.message}
                </div>
              )}

              <div className="space-y-6">
                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full group relative flex items-center justify-center gap-4 bg-solar text-black py-6 rounded-2xl text-xl font-black transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(251,191,36,0.3)] overflow-hidden disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine"></div>
                  {loading ? "Processando..." : "🚀 Receber minha simulação agora"}
                </button>
                
                <div className="flex items-center justify-center gap-2 text-[10px] text-white/20 uppercase tracking-[0.3em]">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Seus dados estão seguros</span>
                </div>
              </div>

              {/* Secondary CTA */}
              <div className="pt-10 border-t border-white/5 text-center">
                <p className="text-white/50 text-sm font-light mb-6">
                  Precisa de uma resposta rápida? Fale agora com um especialista 👇
                </p>
                <a 
                  href="https://wa.me/5544988160797" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 active:scale-95"
                >
                  <MessageSquare className="w-5 h-5" />
                  💬 Falar no WhatsApp
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
