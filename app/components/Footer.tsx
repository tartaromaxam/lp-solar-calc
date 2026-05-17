import Image from "next/image";

export default function Footer(): React.JSX.Element {
  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="container mx-auto max-w-[1100px] px-8 text-center">
        <div className="flex flex-col items-center justify-center gap-6 mb-10">
          <div className="flex items-center gap-3 group">
            <div className="relative w-56 h-16 md:w-72 md:h-20 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/assets/branding/logo-light.svg"
                alt="Mavinic Solar"
                fill
                className="object-contain object-center scale-[2.5]"
              />
            </div>
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
