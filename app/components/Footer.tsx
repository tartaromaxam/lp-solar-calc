export default function Footer(): React.JSX.Element {
  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="container mx-auto max-w-[1100px] px-8 text-center">
        <div className="flex flex-col items-center justify-center gap-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <span className="text-black font-black text-xl leading-none">M</span>
            </div>
            <span className="text-white font-light tracking-[0.2em] text-lg uppercase">
              Solar Pro <span className="text-[#D4AF37] font-bold italic tracking-normal">Mavinic</span>
            </span>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5">
          <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-light">
            © 2026 Mavinic Estúdio Digital • Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
