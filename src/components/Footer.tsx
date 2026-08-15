import React from 'react';
import { Phone, MapPin, Clock, ArrowUp, Instagram, Facebook } from 'lucide-react';
import { ActiveTab, StoreMode } from '../types';

interface FooterProps {
  onNavigateToTab: (tab: ActiveTab, mode?: StoreMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacto" className="bg-slate-950 text-slate-300 border-t border-slate-800 py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          
          <div className="space-y-4">
            <img 
              src="https://i.postimg.cc/FzxhJP5t/LOGO-VICELL-WEB.png" 
              alt="Logo Viccell" 
              className="h-16 w-auto object-contain hover:scale-105 transition-transform"
            />
            <p className="text-slate-400 font-light leading-relaxed">
              Importación directa de repuestos y componentes para telefonía móvil. Despachos desde Maracay a toda Venezuela.
            </p>
            {/* Redes Sociales en el Footer */}
            <div className="flex items-center gap-2 pt-1.5">
              <a 
                href="https://www.instagram.com/viccell_proveedor?igsh=dHZjaTlnazR0cnMw" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram Viccell"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#20d8e2] hover:border-[#20d8e2]/50 transition-all shadow-md"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61586090654729" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook Viccell"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#20d8e2] hover:border-[#20d8e2]/50 transition-all shadow-md"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@viccelll?_r=1&_t=ZS-98ijFg8TgBh" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="TikTok Viccell"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#20d8e2] hover:border-[#20d8e2]/50 transition-all shadow-md"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.97 1.2 2.37 1.93 3.86 2.14V10.2c-1.24-.07-2.42-.55-3.37-1.34-.82-.69-1.42-1.61-1.74-2.64-.04 1.71-.02 3.42-.03 5.12 0 2.29-.19 4.61-1.12 6.74-.89 2.05-2.52 3.73-4.59 4.64-2.12.93-4.57 1.13-6.81.57-2.34-.57-4.47-2.12-5.74-4.22C-.84 14.88-.99 11.89.5 9.29c1.23-2.16 3.44-3.73 5.92-4.14.3-.05.61-.08.92-.09v3.91c-.34.05-.68.13-1 .28-1.04.49-1.81 1.48-1.99 2.63-.26 1.63.53 3.29 1.93 4.1.84.49 1.83.64 2.78.41 1.09-.26 1.99-1.1 2.33-2.16.27-.85.24-1.77.25-2.66V0h.9zm0 0"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Navegación</h4>
            <ul className="space-y-1.5 font-light text-slate-400">
              <li>
                <button onClick={() => onNavigateToTab('home')} className="hover:text-[#20d8e2] cursor-pointer">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('tienda-mayorista', 'mayorista')} className="hover:text-[#20d8e2] cursor-pointer">
                  Tienda Mayorista
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('tienda-minorista', 'minorista')} className="hover:text-[#20d8e2] cursor-pointer">
                  Tienda Minorista
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('como-comprar')} className="hover:text-[#20d8e2] cursor-pointer">
                  ¿Cómo comprar?
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Contacto</h4>
            <div className="space-y-1.5 font-light text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#20d8e2]" />
                <span>Maracay, Estado Aragua, Venezuela</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#20d8e2]" />
                <span>Lun - Sáb: 8:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#20d8e2]" />
                <span className="text-[#20d8e2] font-bold">+58 4128006426</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-light">
          <div>© {new Date().getFullYear()} Viccell. Todos los derechos reservados. Hecho por Legaint Corporation</div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-[#20d8e2] cursor-pointer font-bold"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
