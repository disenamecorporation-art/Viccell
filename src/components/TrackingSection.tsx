import React, { useState } from 'react';
import { Search, Package, CheckCircle2, Clock, ShieldCheck, ArrowRight, AlertCircle, FileText, User, DollarSign, Calendar, MessageCircle, Plane, Ship } from 'lucide-react';
import { TrackingOrder, TrackingPhase } from '../types';

interface TrackingSectionProps {
  orders: TrackingOrder[];
  initialCode?: string;
  onOpenAdminPanel?: () => void;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({ orders, initialCode = '', onOpenAdminPanel }) => {
  const [searchCode, setSearchCode] = useState(initialCode);
  const [searchedOrder, setSearchedOrder] = useState<TrackingOrder | null>(
    initialCode ? orders.find(o => o.code.toLowerCase() === initialCode.toLowerCase()) || null : null
  );
  const [hasSearched, setHasSearched] = useState(!!initialCode);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    const found = orders.find(o => o.code.toLowerCase() === searchCode.trim().toLowerCase());
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const handleWhatsAppImport = () => {
    window.open(
      'https://wa.me/584128006426?text=Hola%20Viccell,%20quiero%20cotizar%20mi%20carga%20de%20importaci%C3%B3n%20y%20conocer%20m%C3%A1s%20sobre%20sus%20servicios.',
      '_blank'
    );
  };

  const getPhaseDetails = (phase: TrackingPhase) => {
    switch (phase) {
      case 'COTIZADO':
        return {
          progress: 33.33,
          label: 'Cotizado',
          desc: 'Su proyecto y cotización han sido registrados exitosamente en el sistema.',
          color: 'bg-amber-500 text-slate-950',
          barColor: 'bg-amber-500',
          stepNumber: 1
        };
      case 'EN PROCESO':
        return {
          progress: 66.66,
          label: 'En Proceso',
          desc: 'Su pedido se encuentra en preparación, consolidación o tránsito internacional.',
          color: 'bg-blue-500 text-white',
          barColor: 'bg-blue-500',
          stepNumber: 2
        };
      case 'DESPACHADO':
        return {
          progress: 100,
          label: 'Despachado',
          desc: '¡Su orden ha sido despachada y entregada con éxito a la agencia de envío!',
          color: 'bg-emerald-600 text-white',
          barColor: 'bg-emerald-500',
          stepNumber: 3
        };
      default:
        return {
          progress: 33.33,
          label: 'Cotizado',
          desc: 'En revisión',
          color: 'bg-slate-500 text-white',
          barColor: 'bg-slate-500',
          stepNumber: 1
        };
    }
  };

  return (
    <section className="py-12 bg-slate-50 text-slate-900 font-sans min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#20d8e2]/10 text-[#0c8f97] text-xs font-semibold tracking-widest uppercase">
            Sistema Oficial de Seguimiento y Aduana
          </span>
          <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-slate-900">
            Rastreo de <span className="font-normal text-[#0c8f97]">Órdenes y Proyectos</span>
          </h2>
          <p className="text-slate-500 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Consulte el estado actual de su importación, repuestos o proyecto especial ingresando su código numérico.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Ingrese código de proyecto (ej: 20517462)..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm sm:text-base font-light focus:outline-none focus:ring-2 focus:ring-[#20d8e2]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#20d8e2] hover:bg-[#1bc6cf] text-slate-950 font-black text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Buscar Orden</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick suggestions */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-light">
            <div className="flex items-center gap-2">
              <span>Orden de ejemplo activa:</span>
              <button
                type="button"
                onClick={() => { setSearchCode('20517462'); }}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 font-bold font-mono cursor-pointer"
              >
                #20517462
              </button>
            </div>

            {onOpenAdminPanel && (
              <button
                type="button"
                onClick={onOpenAdminPanel}
                className="text-[#0c8f97] hover:underline font-semibold cursor-pointer"
              >
                + Administrador: Crear nueva orden
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div>
            {searchedOrder ? (
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-8 sm:p-10 space-y-8 animate-fadeIn">
                
                {/* Order Top Summary */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <div className="text-xs font-semibold text-[#0c8f97] tracking-wider uppercase">
                      Proyecto: {searchedOrder.projectName}
                    </div>
                    <h3 className="text-3xl font-extralight text-slate-900 tracking-tight flex items-center gap-3">
                      <span>Código: #{searchedOrder.code}</span>
                    </h3>
                  </div>

                  <div className={`px-4 py-2 rounded-2xl font-black text-xs tracking-wide shadow-sm ${getPhaseDetails(searchedOrder.phase).color}`}>
                    FASE: {searchedOrder.phase}
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-medium text-slate-600">
                    <span>Progreso de la Orden</span>
                    <span className="font-bold text-slate-900">{getPhaseDetails(searchedOrder.phase).progress}% Completado</span>
                  </div>

                  <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        searchedOrder.phase === 'DESPACHADO' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-[#20d8e2]'
                      }`}
                      style={{ width: `${getPhaseDetails(searchedOrder.phase).progress}%` }}
                    />
                  </div>

                  {/* 3 Phases Visual Stepper */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {/* Step 1: Cotizado */}
                    <div className={`p-4 rounded-2xl border text-center space-y-1 transition-all ${
                      ['COTIZADO', 'EN PROCESO', 'DESPACHADO'].includes(searchedOrder.phase)
                        ? 'bg-amber-50 border-amber-300 text-amber-900 font-medium'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                      <div className="text-[10px] uppercase font-bold tracking-wider">Fase 1 (33.3%)</div>
                      <div className="text-xs sm:text-sm font-bold">1. Cotizado</div>
                    </div>

                    {/* Step 2: En Proceso */}
                    <div className={`p-4 rounded-2xl border text-center space-y-1 transition-all ${
                      ['EN PROCESO', 'DESPACHADO'].includes(searchedOrder.phase)
                        ? 'bg-blue-50 border-blue-300 text-blue-900 font-medium'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                      <div className="text-[10px] uppercase font-bold tracking-wider">Fase 2 (66.6%)</div>
                      <div className="text-xs sm:text-sm font-bold">2. En Proceso</div>
                    </div>

                    {/* Step 3: Despachado */}
                    <div className={`p-4 rounded-2xl border text-center space-y-1 transition-all ${
                      searchedOrder.phase === 'DESPACHADO'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold shadow-md'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                      <div className="text-[10px] uppercase font-bold tracking-wider">Fase 3 (100%)</div>
                      <div className="text-xs sm:text-sm font-bold">3. Despachado</div>
                    </div>
                  </div>
                </div>

                {/* Phase Status Banner */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-semibold text-slate-500">Estado actual:</div>
                  <div className="text-sm font-normal text-slate-900">
                    {getPhaseDetails(searchedOrder.phase).desc}
                  </div>
                </div>

                {/* Order Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs">
                  <div className="space-y-4 p-5 rounded-2xl bg-slate-50/70 border border-slate-100">
                    <h4 className="font-bold uppercase tracking-wider text-slate-900">Información del Cliente</h4>
                    <div className="space-y-2 font-light text-slate-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span><strong>Cliente:</strong> {searchedOrder.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span><strong>Fecha:</strong> {searchedOrder.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-5 rounded-2xl bg-slate-50/70 border border-slate-100">
                    <h4 className="font-bold uppercase tracking-wider text-slate-900">Resumen Financiero y Artículos</h4>
                    <div className="space-y-2 font-light text-slate-600">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        <span><strong>Monto Total:</strong> ${searchedOrder.totalAmount.toFixed(2)} USD</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-slate-400 mt-0.5" />
                        <span><strong>Detalle:</strong> {searchedOrder.itemsDescription}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {searchedOrder.notes && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-light">
                    <strong>Notas del Administrador:</strong> {searchedOrder.notes}
                  </div>
                )}

              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-slate-800">No se encontró ninguna orden</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  El código ingresado no existe en nuestro sistema de tracking. Por favor verifique el número e intente de nuevo o pruebe con el ejemplo <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-bold">20517462</code>.
                </p>
              </div>
            )}
          </div>
        )}

        {/* BEAUTIFUL IMPORT AGENT CARD WITH CUSTOMS IMAGE & WHATSAPP CTA */}
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
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                      <Plane className="w-4 h-4 text-[#20d8e2]" />
                      <span>Carga Aérea</span>
                    </div>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      La solución perfecta si necesitas rapidez, prioridad y tiempos de entrega ajustados.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
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
                <ul className="space-y-2 text-xs text-slate-300 font-light">
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
                <p className="text-xs text-slate-300 font-light max-w-sm">
                  📩 ¿Tienes una compra en puerta? Escríbeme al DM o al WhatsApp y cotizamos tu carga hoy mismo. ¡Hagamos crecer tu negocio juntos!
                </p>

                <button
                  onClick={handleWhatsAppImport}
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
                    <div className="text-xs font-bold text-[#20d8e2] uppercase tracking-wider">Logística Internacional</div>
                    <div className="text-base font-bold text-white">Puerto, Aduana y Consolidación Express</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

