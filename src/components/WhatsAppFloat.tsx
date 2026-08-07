import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const whatsappUrl = "https://wa.me/584128006426?text=Hola%20Viccell,%20quisiera%20solicitar%20el%20cat%C3%A1logo%20mayorista%20de%20repuestos.";

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      
      {/* Glow Effect */}
      <div className="absolute -inset-1 rounded-full bg-[#20d8e2]/40 blur-lg opacity-80 group-hover:opacity-100 transition-opacity animate-pulse" />

      {/* Floating Button Glassmorphism */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-950/90 border border-[#20d8e2]/60 text-[#20d8e2] hover:bg-[#20d8e2] hover:text-slate-950 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Hover Tooltip Notification */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-slate-900/90 text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-2xl border border-white/15 whitespace-nowrap backdrop-blur-md">
        <span>💬 Cotizar por WhatsApp</span>
      </div>

    </div>
  );
};
