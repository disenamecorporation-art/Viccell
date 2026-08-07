import React from 'react';
import { Phone, MapPin, Clock, ArrowUp } from 'lucide-react';
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
          
          <div className="space-y-3">
            <img 
              src="https://i.postimg.cc/FzxhJP5t/LOGO-VICELL-WEB.png" 
              alt="Logo Viccell" 
              className="h-16 w-auto object-contain hover:scale-105 transition-transform"
            />
            <p className="text-slate-400 font-light leading-relaxed">
              Importación directa de repuestos y componentes para telefonía móvil. Despachos desde Maracay a toda Venezuela.
            </p>
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
                <button onClick={() => onNavigateToTab('precios-mayor')} className="hover:text-[#20d8e2] cursor-pointer">
                  Escala de Precios
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
          <div>© {new Date().getFullYear()} Viccell. Todos los derechos reservados.</div>
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
