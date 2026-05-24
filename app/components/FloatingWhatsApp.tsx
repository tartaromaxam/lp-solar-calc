"use client";

import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show tooltip after 5 seconds to grab attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const WHATSAPP_NUMBER = "5544988160797";
  const B2B_MSG = encodeURIComponent("Olá! Quero transformar minha empresa solar em uma máquina de vendas. Podemos agendar uma consultoria rápida?");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Tooltip Message */}
      {showTooltip && !isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white text-black p-4 rounded-2xl shadow-2xl mb-4 relative max-w-[250px] mr-2"
        >
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition-colors"
          >
            <X className="w-3 h-3 text-gray-600" />
          </button>
          <p className="text-sm font-medium">
            Quer um site e um simulador como este para a sua empresa solar? Fale com a gente! 👇
          </p>
          {/* Tooltip triangle tail */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 transform origin-top-left"></div>
        </motion.div>
      )}

      {/* Floating Button */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${B2B_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowTooltip(true)}
        className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-colors relative group"
      >
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></div>
        
        <MessageCircle className="w-8 h-8 relative z-10" />
      </motion.a>
    </div>
  );
}
