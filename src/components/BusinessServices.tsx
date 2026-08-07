import React from 'react';
import { Globe, Truck, Box, Plane, Ship, CheckCircle2, ShieldCheck, MessageCircle } from 'lucide-react';

interface BusinessServicesProps {
  onOpenWhatsApp: () => void;
  onScrollToCatalog: () => void;
}

export const BusinessServices: React.FC<BusinessServicesProps> = ({
  onOpenWhatsApp,
  onScrollToCatalog,
}) => {
  return (
    <section id="servicios" className="py-12 bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-black tracking-widest text-[#0c8f97] uppercase px-3 py-1 bg-[#0c8f97]/10 rounded-full border border-[#0c8f97]/20">
            Servicio Exclusivo de Importación
          </span>
          <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight text-slate-900">
            Agente de <span className="font-normal text-[#0c8f97]">Importación & Logística</span>
          </h2>
          <p className="text-slate-500 font-light text-sm max-w-xl mx-auto">
            Abastecimiento directo y gestión aduanera profesional para tu negocio
          </p>
        </div>

        {/* Featured Gorgeous Import Card with Exact User Text */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-[#0c3138] rounded-3xl border border-[#20d8e2]/30 shadow-2xl overflow-hidden text-white p-8 sm:p-12 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#20d8e2]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] text-xs font-bold tracking-wide border border-[#20d8e2]/30">
                <ShieldCheck className="w-4 h-4" />
                <span>Agente Logístico de Importación Oficial</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extralight tracking-tight leading-tight">
                ¡Lleva tu negocio al siguiente nivel <span className="font-normal text-[#20d8e2]">sin complicaciones logísticas!</span>
              </h3>

              <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed">
                ¿Quieres traer mercancía para tu negocio pero los trámites y el transporte te abruman? Me encargo de todo el proceso de importación para que tú solo te preocupes por vender.
              </p>

              <div className="space-y-4 pt-2">
                <h4 className="text-xs uppercase font-black tracking-wider text-[#20d8e2]">Nuestros Servicios de Agente de Importación:</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-[#20d8e2]/50 transition-colors">
                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                      <Plane className="w-4 h-4 text-[#20d8e2]" />
                      <span>Carga Aérea</span>
                    </div>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      La solución perfecta si necesitas rapidez, prioridad y tiempos de entrega ajustados.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-[#20d8e2]/50 transition-colors">
                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                      <Ship className="w-4 h-4 text-[#20d8e2]" />
                      <span>Carga Marítima</span>
                    </div>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      La mejor opción para optimizar costos en volúmenes grandes y mercancía pesada.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase font-black tracking-wider text-[#20d8e2]">¿Por qué trabajar conmigo?</h4>
                <ul className="space-y-2.5 text-xs text-slate-300 font-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Asesoría personalizada desde origen hasta destino.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Gestión eficiente de consolidación de carga.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Transparencia, seguridad y seguimiento en cada etapa del envío.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-300 font-light max-w-sm leading-relaxed">
                  📩 ¿Tienes una compra en puerta? Escríbeme al DM o al WhatsApp y cotizamos tu carga hoy mismo. ¡Hagamos crecer tu negocio juntos!
                </p>

                <button
                  onClick={onOpenWhatsApp}
                  className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm tracking-wide shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Cotizar por WhatsApp</span>
                </button>
              </div>

            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl aspect-[4/3] group">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"
                  alt="Aduana e Importación Logística"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-[#20d8e2] uppercase tracking-wider">Logística Internacional & Aduana</div>
                    <div className="text-base font-bold text-white">Puerto, Aduana y Consolidación Express</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Secondary grid for wholesale and despacho */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#20d8e2]/15 border border-[#20d8e2]/30 flex items-center justify-center text-slate-950 font-bold">
                <Box className="w-5 h-5 text-[#0db3bd]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Venta Mayorista Directa</h3>
              <p className="text-slate-600 text-xs font-light leading-relaxed">
                Repuestos de alta rotación en lotes: Pines de carga, conectores FPC, pantallas y repuestos varios en Maracay.
              </p>
            </div>
            <button
              onClick={onScrollToCatalog}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer"
            >
              Ver Catálogo Mayorista
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#20d8e2]/15 border border-[#20d8e2]/30 flex items-center justify-center text-slate-950 font-bold">
                <Truck className="w-5 h-5 text-[#0db3bd]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Despacho Nacional 24h</h3>
              <p className="text-slate-600 text-xs font-light leading-relaxed">
                Envíos a todos los estados de Venezuela vía MRW, Zoom y Tealca en Cobro en Destino con empaque reforzado.
              </p>
            </div>
            <div className="text-xs text-[#0db3bd] font-bold pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>Despachos diarios desde Maracay</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[11px]">Activo 24/7</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

