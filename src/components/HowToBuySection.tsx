import React, { useState } from 'react';
import { 
  Store, 
  Building2, 
  Search, 
  ShoppingCart, 
  Truck, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Package, 
  HelpCircle,
  Clock,
  Send,
  Zap,
  Check,
  ChevronRight
} from 'lucide-react';
import { ActiveTab, StoreMode } from '../types';

interface HowToBuySectionProps {
  onNavigateToTab: (tab: ActiveTab, mode?: StoreMode) => void;
}

export const HowToBuySection: React.FC<HowToBuySectionProps> = ({ onNavigateToTab }) => {
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const steps = [
    {
      number: 1,
      numStr: '01',
      badge: 'Modalidad de Compra',
      title: 'Elige tu Tienda (Mayorista o Minorista)',
      subtitle: 'Selecciona la opción que mejor se adapte a tu requerimiento de repuestos.',
      icon: Layers,
      color: 'bg-cyan-50 border-cyan-200 text-[#0c8f97]',
      details: [
        {
          heading: '🏪 Tienda Minorista (Detal)',
          text: 'Ideal para técnicos independientes o compras individuales. Sin mínimo de cantidad por producto.'
        },
        {
          heading: '🏢 Tienda Mayorista (Lotes / Escalas)',
          text: 'Accede a precios especiales con escalas por volumen (5+, 10+, 50+ unidades). Perfecto para negocios de servicio técnico.'
        }
      ],
      actionText: 'Explorar Tienda Mayorista',
      actionTab: 'tienda-mayorista' as ActiveTab,
      actionMode: 'mayorista' as StoreMode,
    },
    {
      number: 2,
      numStr: '02',
      badge: 'Búsqueda Inteligente',
      title: 'Encuentra Repuestos por Marca, SKU o Categoría',
      subtitle: 'Navega en nuestro catálogo organizado o usa los filtros rápidos.',
      icon: Search,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      details: [
        {
          heading: '🔍 Filtro por Marca y Categoría',
          text: 'Encuentra conectores FPC, Pines Micro-USB / Tipo-C, Pantallas, ICs de Carga e insumos para Samsung, Xiaomi, Tecno, Infinix, Apple y más.'
        },
        {
          heading: '⚡ Búsqueda Rápida por SKU',
          text: 'Si ya tienes el código SKU o modelo del repuesto, escríbelo en el buscador para ver disponibilidad inmediata.'
        }
      ],
      actionText: 'Ir al Catálogo de Repuestos',
      actionTab: 'tienda-minorista' as ActiveTab,
      actionMode: 'minorista' as StoreMode,
    },
    {
      number: 3,
      numStr: '03',
      badge: 'Gestión de Carrito',
      title: 'Agrega Productos y Ajusta Cantidades',
      subtitle: 'El sistema calcula automáticamente el total en USD en tiempo real.',
      icon: ShoppingCart,
      color: 'bg-amber-50 border-amber-200 text-amber-700',
      details: [
        {
          heading: '🛒 Carrito Flotante Dinámico',
          text: 'Cada producto agregado se acumula en tu carrito. En modo mayorista verás cómo baja el precio unitario según el volumen.'
        },
        {
          heading: '✏️ Modificación Directa',
          text: 'Aumenta o disminuye cantidades con un clic. Puedes revisar el subtotal antes de confirmar.'
        }
      ],
      actionText: 'Ver Mi Carrito Actual',
      actionTab: 'home' as ActiveTab,
    },
    {
      number: 4,
      numStr: '04',
      badge: 'Envío y Logística',
      title: 'Ve al Registro de Despacho con tu Pedido Flotante',
      subtitle: 'Al presionar "Proceder a Registro de Despacho", tu pedido se transfiere a la sección de Envíos.',
      icon: Truck,
      color: 'bg-sky-50 border-sky-200 text-sky-700',
      details: [
        {
          heading: '📦 Pedido Adjunto Visible',
          text: 'En la pestaña Despachos verás la tarjeta resumen de tus repuestos seleccionados arriba del formulario.'
        },
        {
          heading: '📝 Datos de Envío Requeridos',
          text: 'Ingresa tu Nombre, Cédula/RIF, Teléfono, Agencia preferida (MRW, Zoom o Tealca), Estado y Dirección de Oficina.'
        }
      ],
      actionText: 'Ir a Registro de Despacho',
      actionTab: 'envios' as ActiveTab,
    },
    {
      number: 5,
      numStr: '05',
      badge: 'Confirmación WhatsApp',
      title: 'Haz Clic en "Enviar pedido" a WhatsApp',
      subtitle: 'Tu orden completa e información de agencia llega directo a nuestro equipo.',
      icon: Send,
      color: 'bg-teal-50 border-teal-200 text-teal-700',
      details: [
        {
          heading: '📲 Mensaje Estructurado Automático',
          text: 'Se genera un texto limpio con tus repuestos, cantidades, subtotales y datos de destino para procesar tu cotización.'
        },
        {
          heading: '💳 Instrucciones de Pago e Imputación',
          text: 'Nuestro equipo confirma disponibilidad de stock, te envía cuentas bancarias/Zelle/PagoMóvil y coordina el envío inmediato.'
        }
      ],
      actionText: 'Contactar Asesor por WhatsApp',
      actionTab: 'contacto' as ActiveTab,
    },
  ];

  return (
    <section id="como-comprar" className="py-12 bg-white text-slate-900 font-['Montserrat',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header with Thin Elegant Montserrat Typography */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20d8e2]/15 text-[#0c8f97] text-xs font-bold tracking-widest uppercase border border-[#20d8e2]/30">
            <HelpCircle className="w-4 h-4 text-[#0c8f97]" />
            Guía Paso a Paso Viccell
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-slate-900 font-['Montserrat',sans-serif]">
            ¿Cómo realizar tu compra en <span className="font-semibold text-[#0c8f97]">Viccell</span>?
          </h1>

          <p className="text-slate-500 font-light text-base sm:text-lg leading-relaxed">
            Aprende lo fácil que es solicitar tus repuestos de telefonía móvil al mayor o detal y recibir tu despacho asegurado en cualquier ciudad de Venezuela.
          </p>
        </div>

        {/* Quick Process Flow Overview Cards with BIG Numbers and Animated Connectors */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s, idx) => {
            const IconComponent = s.icon;
            const isSelected = selectedStep === s.number;
            const hasNext = idx < steps.length - 1;

            return (
              <div key={s.number} className="relative group">
                <button
                  onClick={() => setSelectedStep(s.number)}
                  className={`w-full p-5 rounded-3xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden ${
                    isSelected 
                      ? 'bg-slate-950 text-white border-slate-900 shadow-2xl scale-105 ring-2 ring-[#20d8e2]' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/90 shadow-sm'
                  }`}
                >
                  {/* Giant Background Step Number */}
                  <span className={`absolute -right-2 -bottom-3 text-5xl sm:text-6xl font-black pointer-events-none select-none transition-colors ${
                    isSelected ? 'text-[#20d8e2]/20' : 'text-slate-200/70'
                  }`}>
                    {s.numStr}
                  </span>

                  {/* Header Row */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className={`text-2xl sm:text-3xl font-black tracking-tighter ${
                      isSelected ? 'text-[#20d8e2]' : 'text-slate-900'
                    }`}>
                      {s.numStr}
                    </span>
                    <div className={`p-2 rounded-xl ${
                      isSelected ? 'bg-[#20d8e2]/20 text-[#20d8e2]' : 'bg-slate-200/60 text-slate-700'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <div className="relative z-10 space-y-1">
                    <p className={`text-[10px] font-extrabold uppercase tracking-widest ${
                      isSelected ? 'text-[#20d8e2]' : 'text-slate-500'
                    }`}>
                      {s.badge}
                    </p>
                    <p className="text-xs font-bold leading-snug line-clamp-2">
                      {s.title}
                    </p>
                  </div>
                </button>

                {/* Animated Arrow Connector between steps for large screens */}
                {hasNext && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-[#0c8f97]">
                      <ArrowRight className="w-3.5 h-3.5 animate-arrow-slide" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Detailed Interactive Step Banner */}
        {(() => {
          const current = steps.find(s => s.number === selectedStep) || steps[0];
          const IconComp = current.icon;

          return (
            <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 animate-fade-in relative overflow-hidden">
              {/* Giant Watermark Background Number */}
              <div className="absolute top-2 right-6 text-7xl sm:text-9xl font-black text-slate-200/40 pointer-events-none select-none">
                {current.numStr}
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/80 pb-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-[#20d8e2]/20 border border-[#20d8e2]/40 rounded-2xl text-[#0c8f97] shrink-0 shadow-sm">
                    <IconComp className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#0c8f97] text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                        <span className="text-sm">PASO {current.numStr}</span> DE 05
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {current.badge}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-1">
                      {current.title}
                    </h2>
                    <p className="text-slate-600 text-sm font-light">
                      {current.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToTab(current.actionTab, current.actionMode)}
                  className="px-6 py-3.5 bg-[#20d8e2] hover:bg-[#1bc5cf] text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#20d8e2]/20 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>{current.actionText}</span>
                  <ArrowRight className="w-4 h-4 animate-arrow-slide" />
                </button>
              </div>

              {/* Sub-cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {current.details.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-2 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#0c8f97]" />
                      {item.heading}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Step Navigation Controls with Animated Arrows */}
              <div className="flex items-center justify-between pt-2 relative z-10">
                <button
                  disabled={selectedStep === 1}
                  onClick={() => setSelectedStep(prev => Math.max(1, prev - 1))}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer flex items-center gap-1.5"
                >
                  <span>← Paso Anterior</span>
                </button>

                <div className="flex items-center gap-2">
                  {steps.map(s => (
                    <button
                      key={s.number}
                      onClick={() => setSelectedStep(s.number)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        selectedStep === s.number ? 'bg-[#0c8f97] w-8' : 'bg-slate-300 w-2.5'
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={selectedStep === 5}
                  onClick={() => setSelectedStep(prev => Math.min(5, prev + 1))}
                  className="text-xs font-bold text-[#0c8f97] hover:underline disabled:opacity-30 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Siguiente Paso</span>
                  <ArrowRight className="w-3.5 h-3.5 animate-arrow-slide" />
                </button>
              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
};
