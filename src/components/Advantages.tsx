import React from 'react';
import { Truck, Layers, Award, Zap } from 'lucide-react';

export const Advantages: React.FC = () => {
  const advantagesList = [
    {
      icon: <Award className="w-5 h-5 text-[#20d8e2]" />,
      title: 'Importadores Directos',
      description: 'Precios directos de fábrica para mayoristas y servicios técnicos.',
    },
    {
      icon: <Truck className="w-5 h-5 text-[#20d8e2]" />,
      title: 'Despacho Nacional',
      description: 'Envíos rápidos por MRW, Zoom y Tealca en Cobro en Destino.',
    },
    {
      icon: <Layers className="w-5 h-5 text-[#20d8e2]" />,
      title: 'Amplio Stock Fijo',
      description: 'Variedad constante para Samsung, Xiaomi, Tecno e Infinix.',
    },
    {
      icon: <Zap className="w-5 h-5 text-[#20d8e2]" />,
      title: 'Garantía Técnica',
      description: 'Componentes e insumos verificados antes del despacho.',
    }
  ];

  return (
    <section id="ventajas" className="py-12 bg-white text-slate-900 border-t border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Ventajas para tu Negocio
          </h2>
          <p className="text-slate-500 font-light text-sm">
            Componentes probados y logística desde Maracay
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {advantagesList.map((adv, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2"
            >
              <div className="p-2.5 w-fit rounded-xl bg-white border border-slate-200">
                {adv.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {adv.title}
              </h3>
              <p className="text-slate-600 text-xs font-light leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
