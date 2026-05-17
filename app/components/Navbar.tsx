"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#" },
    { name: "Simulador", href: "#orcamento" },
    { name: "Blog", href: "#" },
    { name: "Contato", href: "#" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B1220]/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-[#0B1220]/50 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-50 flex items-center gap-3 group">
              <div className="relative w-56 h-16 md:w-72 md:h-20 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/branding/logo-light.svg"
                  alt="Mavinic Solar"
                  fill
                  className="object-contain object-left scale-[4] origin-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/70 hover:text-white hover:text-shadow-sm transition-all text-sm font-medium tracking-wide uppercase"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#orcamento"
                className="bg-transparent border border-[#F7C843]/50 text-[#F7C843] hover:bg-[#F7C843] hover:text-[#0B1220] px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(247,200,67,0.1)] hover:shadow-[0_0_20px_rgba(247,200,67,0.4)]"
              >
                Simular Economia
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden relative z-50 p-2 text-white/80 hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0B1220]/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white/80 hover:text-white text-2xl font-light tracking-widest uppercase transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Link
                  href="#orcamento"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#F7C843] text-[#0B1220] px-8 py-3 rounded-full text-lg font-bold tracking-wider transition-all duration-300 shadow-[0_10px_30px_rgba(247,200,67,0.3)] inline-block"
                >
                  Simular Economia
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
