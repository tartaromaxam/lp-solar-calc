'use client';

import Script from 'next/script';

export default function SolarWidget() {
  return (
    <section id="simulador" className="w-full py-12 flex justify-center items-center">
      <div className="w-full flex flex-col items-center gap-6">
        <div className="bg-white/5 border border-solar/20 px-6 py-3 rounded-full flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center backdrop-blur-md">
          <span className="w-3 h-3 rounded-full bg-solar animate-pulse shadow-[0_0_10px_rgba(247,200,67,0.8)]"></span>
          <span className="text-white/80 font-medium text-sm md:text-base">
            <strong className="text-solar uppercase tracking-wider">Módulo de Demonstração:</strong> Simulador de Captação B2C de Alta Conversão.
          </span>
        </div>
        <div id="solar-pro-widget" className="w-full max-w-2xl px-4 min-h-[700px]"></div>
      </div>

      {/* 2. Configuração Global Dinâmica */}
      <Script id="spc-config" strategy="afterInteractive">
        {`
          window.spc_config = {
            tarifa: 0.82,
            custo_kwp: 4800,
            producao_kwp: 145,
            taxa_economia: 0.95,
            whatsapp: "5544988160797", // Atualize com o número correto da Mavinic
            cor_primaria: "#D4AF37", 
            cor_secundaria: "#F5C518"
          };
        `}
      </Script>

      {/* 3. Carregamento do Widget (Equilíbrio Performance/Velocidade) */}
      <Script 
        src="/spc-widget.js?v=1.1.4" 
        strategy="afterInteractive" 
        onReady={() => {
          if (typeof window !== 'undefined' && (window as any).renderSolarWidget) {
            (window as any).renderSolarWidget();
          }
        }}
      />
    </section>
  );
}
