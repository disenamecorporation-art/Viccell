import React from 'react';
import { MapPin, Phone, Instagram, Facebook, MessageCircle, Globe } from 'lucide-react';

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
              href="https://www.instagram.com/viccell_proveedor?igsh=dHZjaTlnazR0cnMw" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram Viccell"
              className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#20d8e2] hover:border-[#20d8e2]/50 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61586090654729" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook Viccell"
              className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#20d8e2] hover:border-[#20d8e2]/50 transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://www.tiktok.com/@viccelll?_r=1&_t=ZS-98ijFg8TgBh" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok Viccell"
              className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#20d8e2] hover:border-[#20d8e2]/50 transition-colors"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.97 1.2 2.37 1.93 3.86 2.14V10.2c-1.24-.07-2.42-.55-3.37-1.34-.82-.69-1.42-1.61-1.74-2.64-.04 1.71-.02 3.42-.03 5.12 0 2.29-.19 4.61-1.12 6.74-.89 2.05-2.52 3.73-4.59 4.64-2.12.93-4.57 1.13-6.81.57-2.34-.57-4.47-2.12-5.74-4.22C-.84 14.88-.99 11.89.5 9.29c1.23-2.16 3.44-3.73 5.92-4.14.3-.05.61-.08.92-.09v3.91c-.34.05-.68.13-1 .28-1.04.49-1.81 1.48-1.99 2.63-.26 1.63.53 3.29 1.93 4.1.84.49 1.83.64 2.78.41 1.09-.26 1.99-1.1 2.33-2.16.27-.85.24-1.77.25-2.66V0h.9zm0 0"/>
              </svg>
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
