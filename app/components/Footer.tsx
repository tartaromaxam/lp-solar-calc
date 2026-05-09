export default function Footer(): React.JSX.Element {
  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="container mx-auto max-w-[1100px] px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-solar rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-lg">S</span>
          </div>
          <span className="text-white font-medium tracking-tighter text-xl">Solar<span className="text-solar italic font-semibold">Max</span></span>
        </div>
        
        <p className="text-white/20 text-xs uppercase tracking-[0.3em] font-light">
          © 2026 Simulação de Cliente Real • Mavinic Estúdio Digital
        </p>
      </div>
    </footer>
  );
}
