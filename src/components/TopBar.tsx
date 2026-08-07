import React from 'react';
import { MapPin, Phone, Instagram, MessageCircle, Globe } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div id="top-bar" className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#20d8e2]" />
          <span className="font-light">Maracay, Venezuela (Despacho Nacional a Todo el País)</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-slate-400 font-light">Síguenos:</span>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram Viccell"
              className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#20d8e2] hover:border-[#20d8e2]/50 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://wa.me/584128006426" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="WhatsApp Viccell"
              className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#20d8e2] hover:border-[#20d8e2]/50 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://viccell.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Web Viccell"
              className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#20d8e2] hover:border-[#20d8e2]/50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>

          <a 
            href="https://wa.me/584128006426?text=Hola%20Viccell"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-200 hover:text-[#20d8e2] font-bold"
          >
            <Phone className="w-3.5 h-3.5 text-[#20d8e2]" />
            <span>+58 4128006426</span>
          </a>
        </div>
      </div>
    </div>
  );
};
