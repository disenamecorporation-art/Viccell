import React from 'react';
import { StoreMode, ActiveTab } from '../types';

interface HeroProps {
  storeMode: StoreMode;
  onNavigateToTab: (tab: ActiveTab, mode?: StoreMode) => void;
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const bannerImage = "https://i.postimg.cc/L604jftP/BANNER1-VICCELL.jpg";

  return (
    <section id="hero" className="w-full bg-slate-950 text-white font-sans overflow-hidden">
      <div className="w-full h-[280px] sm:h-[450px] lg:h-[600px] bg-slate-900 overflow-hidden flex items-center justify-center">
        <img
          src={bannerImage}
          alt="Viccell Banner Publicitario"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
};
