'use client';

import Script from 'next/script';

export default function SolarWidget() {
  return (
    <section id="simulador" className="w-full py-12 flex justify-center items-center">
      {/* 1. Container isolado para o widget. 
          Vazio para evitar Erro de Hidratação do React.
          min-h-[700px] evita o Layout Shift (CLS) enquanto carrega */}
      <div id="solar-pro-widget" className="w-full max-w-2xl px-4 min-h-[700px]"></div>

      {/* 2. Configuração Global Dinâmica */}
      <Script id="spc-config" strategy="afterInteractive">
        {`
          window.spc_config = {
            tarifa: 0.82,
            custo_kwp: 4800,
            producao_kwp: 145,
            taxa_economia: 0.95,
            whatsapp: "5544988160797", // Atualize com o número correto da Mavinic
            webhook: "https://hook.us2.make.com/uenwaqqn6cjyrx754med5l5hcarhby46", // Atualize com o webhook correto
            cor_primaria: "#D4AF37", 
            cor_secundaria: "#F5C518"
          };
        `}
      </Script>

      {/* 3. Carregamento do Widget (Equilíbrio Performance/Velocidade) */}
      <Script 
        src="/spc-widget.js?v=1.1.3" 
        strategy="afterInteractive" 
      />
    </section>
  );
}
