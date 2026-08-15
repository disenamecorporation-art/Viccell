import React, { useState } from 'react';
import { ArrowRight, Image as ImageIcon, Edit3, Check } from 'lucide-react';
import { ActiveTab, StoreMode, User } from '../types';

interface AdBannersProps {
  onNavigateToTab: (tab: ActiveTab, mode?: StoreMode) => void;
  currentUser: User | null;
}

const DEFAULT_BANNERS = [
  {
    id: 'banner-1',
    title: 'Kits Especiales de Pines Tipo-C',
    subtitle: 'Lotes de 100 y 500 unidades para Samsung, Xiaomi, Tecno e Infinix con súper descuento.',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1000&auto=format&fit=crop&q=80',
    buttonText: 'Explorar Ofertas Mayoristas',
    tabTarget: 'tienda-mayorista' as ActiveTab,
    modeTarget: 'mayorista' as StoreMode,
  },
  {
    id: 'banner-2',
    title: 'Insumos de Micro-Soldadura Relife',
    subtitle: 'Estaño en pasta 183°C, flux de alta pureza y pegamento B-7000 para pantallas.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80',
    buttonText: 'Ver Insumos en Tienda Minorista',
    tabTarget: 'tienda-minorista' as ActiveTab,
    modeTarget: 'minorista' as StoreMode,
  },
];

export const AdBanners: React.FC<AdBannersProps> = ({ onNavigateToTab, currentUser }) => {
  const [banners, setBanners] = useState(() => {
    try {
      const saved = localStorage.getItem('viccell_ad_banners');
      return saved ? JSON.parse(saved) : DEFAULT_BANNERS;
    } catch {
      return DEFAULT_BANNERS;
    }
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempUrl, setTempUrl] = useState('');
  const [tempTitle, setTempTitle] = useState('');

  const handleStartEdit = (idx: number) => {
    setEditingIndex(idx);
    setTempUrl(banners[idx].imageUrl);
    setTempTitle(banners[idx].title);
  };

  const handleSaveEdit = (idx: number) => {
    const updated = [...banners];
    updated[idx] = {
      ...updated[idx],
      imageUrl: tempUrl || updated[idx].imageUrl,
      title: tempTitle || updated[idx].title,
    };
    setBanners(updated);
    localStorage.setItem('viccell_ad_banners', JSON.stringify(updated));
    setEditingIndex(null);
  };

  return (
    <section className="py-10 bg-white font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Promociones y Novedades Viccell
          </h2>
          <p className="text-slate-500 font-light text-xs sm:text-sm">
            Ofertas destacadas en repuestos e insumos técnicos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner, idx) => (
            <div
              key={banner.id}
              className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md group min-h-[200px] sm:min-h-[280px] flex flex-col justify-end p-5 sm:p-8 space-y-3 sm:space-y-4"
            >
              {/* Background Image */}
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

              {/* Admin Edit Overlay Option */}
              {currentUser?.role === 'admin' && (
                <div className="absolute top-4 right-4 z-20">
                  {editingIndex === idx ? (
                    <button
                      onClick={() => handleSaveEdit(idx)}
                      className="px-3 py-1.5 bg-[#20d8e2] text-slate-950 font-black rounded-xl text-xs flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Guardar</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartEdit(idx)}
                      className="px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#20d8e2]" />
                      <span>Cambiar Imagen Banner</span>
                    </button>
                  )}
                </div>
              )}

              {/* Editing Form for Admin */}
              {editingIndex === idx ? (
                <div className="relative z-10 bg-slate-900/95 p-4 rounded-2xl border border-slate-700 space-y-2 text-xs">
                  <div>
                    <label className="font-bold text-slate-300 block">Título Banner:</label>
                    <input
                      type="text"
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                      className="w-full p-2 bg-slate-800 text-white border border-slate-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block">URL de la Imagen:</label>
                    <input
                      type="text"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      className="w-full p-2 bg-slate-800 text-white border border-slate-700 rounded-lg"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              ) : (
                <div className="relative z-10 space-y-3">
                  <span className="px-3 py-1 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] border border-[#20d8e2]/30 text-[10px] font-bold uppercase tracking-wider">
                    Banner Publicitario {idx + 1}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {banner.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm font-light max-w-md leading-relaxed">
                    {banner.subtitle}
                  </p>

                  <button
                    onClick={() => onNavigateToTab(banner.tabTarget, banner.modeTarget)}
                    className="pt-1 px-6 py-3 rounded-2xl bg-[#20d8e2] hover:bg-[#1bc6cf] text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer w-fit"
                  >
                    <span>{banner.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
