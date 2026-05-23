"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const WHATSAPP_NUMBER = "5544999999999";
  const MSG = encodeURIComponent("Olá! Estava navegando no site da Mavinic Solar e gostaria de tirar algumas dúvidas.");

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-50 md:hidden"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:bg-green-400 transition-colors"
            aria-label="Falar no WhatsApp"
          >
            <MessageCircle className="w-7 h-7" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
