import Link from 'next/link';
import { Zap, ArrowRight, MessageCircle } from 'lucide-react';

export default function ArticleCTA() {
  return (
    <div className="my-12 p-8 rounded-2xl bg-gradient-to-br from-[#0B1220] to-[#121E33] border border-[#F7C843]/20 shadow-[0_0_30px_rgba(247,200,67,0.05)] relative overflow-hidden not-prose">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F7C843] rounded-full blur-[100px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-[#F7C843] font-bold text-sm tracking-widest uppercase mb-3">
            <Zap className="w-4 h-4" />
            Pare de Alugar Energia
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Descubra quanto você pode economizar.
          </h3>
          <p className="text-white/70 text-sm md:text-base mb-0">
            Use nosso simulador gratuito e veja o seu projeto solar ganhar vida em menos de 1 minuto. Sem compromisso.
          </p>
        </div>
        
        <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
          <Link 
            href="/#simulador" 
            className="bg-[#F7C843] text-[#0B1220] px-8 py-3.5 rounded-full font-bold text-center hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(247,200,67,0.3)] flex items-center justify-center gap-2"
          >
            <span>Simular Agora</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a 
            href="https://wa.me/5544999999999?text=Ol%C3%A1%2C%20estava%20lendo%20o%20blog%20da%20Mavinic%20Solar%20e%20gostaria%20de%20falar%20com%20um%20especialista."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-full font-bold text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
