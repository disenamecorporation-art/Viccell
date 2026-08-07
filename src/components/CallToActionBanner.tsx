import React from 'react';
import { Store, ArrowRight, Sparkles } from 'lucide-react';
import { StoreMode, ActiveTab } from '../types';

interface CallToActionBannerProps {
  onNavigateToTab: (tab: ActiveTab, mode?: StoreMode) => void;
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({ onNavigateToTab }) => {
  return (
    <section className="py-16 bg-slate-950 font-sans relative overflow-hidden text-white border-y border-slate-900">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#20d8e2]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[#20d8e2] text-xs font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Catálogo Verificado Viccell</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
          Consigue todo para tus reparaciones <br />
          <span className="font-bold text-[#20d8e2]">en nuestras tiendas</span>
        </h2>

        <p className="text-slate-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Explora stock disponible al mayor y detal con despachos inmediatos desde Maracay a todo el país.
        </p>

        <div className="pt-4 flex justify-center">
          <button
            onClick={() => onNavigateToTab('tienda-mayorista', 'mayorista')}
            className="group px-8 py-4 rounded-full bg-[#20d8e2] hover:bg-[#1bc6cf] text-slate-950 font-bold text-sm tracking-wide shadow-xl hover:shadow-[#20d8e2]/20 transition-all duration-300 flex items-center gap-3 animate-bounce cursor-pointer"
            style={{ animationDuration: '2.5s' }}
          >
            <Store className="w-4 h-4 text-slate-950" />
            <span>Explorar Tienda y Repuestos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
