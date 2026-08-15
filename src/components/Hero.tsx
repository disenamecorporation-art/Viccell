import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StoreMode, ActiveTab } from '../types';

interface HeroProps {
  storeMode: StoreMode;
  onNavigateToTab: (tab: ActiveTab, mode?: StoreMode) => void;
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const images = [
    { url: "https://i.postimg.cc/8PF1wmz1/prueba1.jpg", alt: "Banner Viccell 1" },
    { url: "https://i.postimg.cc/pd1vD9MM/prueba2.jpg", alt: "Banner Viccell 2" },
    { url: "https://i.postimg.cc/KjTgXSDF/prueba4.jpg", alt: "Banner Viccell 4" },
    { url: "https://i.postimg.cc/htDhs76Q/prueba6.jpg", alt: "Banner Viccell 6" },
    { url: "https://i.postimg.cc/XNwyj30G/prueba8.jpg", alt: "Banner Viccell 8" },
    { url: "https://i.postimg.cc/76tgrrJw/prueba9.jpg", alt: "Banner Viccell 9" },
    { url: "https://i.postimg.cc/141zh8v0/prueba10.jpg", alt: "Banner Viccell 10" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section id="hero" className="w-full bg-slate-950 flex justify-center items-center py-0 px-0">
      <div 
        className="relative overflow-hidden bg-slate-950 flex items-center justify-center mx-auto group w-full max-w-[390px] sm:max-w-[1275px] h-[158px] sm:h-[350px] lg:h-[515px]"
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover sm:object-fill object-center"
            />
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={handlePrev}
          aria-label="Anterior"
          className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-slate-950/60 text-white hover:bg-[#20d8e2] hover:text-slate-950 transition-all border border-white/20 backdrop-blur-md cursor-pointer opacity-80 hover:opacity-100"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Siguiente"
          className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-slate-950/60 text-white hover:bg-[#20d8e2] hover:text-slate-950 transition-all border border-white/20 backdrop-blur-md cursor-pointer opacity-80 hover:opacity-100"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-3 sm:bottom-5 z-20 flex items-center gap-1.5 sm:gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir al slide ${idx + 1}`}
              className={`h-2 sm:h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? 'bg-[#20d8e2] w-6 sm:w-8' : 'bg-white/50 w-2 sm:w-2.5 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


