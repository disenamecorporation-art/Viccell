import React, { useState } from 'react';
import { Search, Package, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { TrackingOrder } from '../types';

interface TrackingWidgetProps {
  orders: TrackingOrder[];
  onViewOrder: (code: string) => void;
}

export const TrackingWidget: React.FC<TrackingWidgetProps> = ({ orders, onViewOrder }) => {
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const found = orders.find(o => o.code.toLowerCase() === inputCode.trim().toLowerCase());
    if (found) {
      setErrorMsg('');
      onViewOrder(found.code);
    } else {
      setErrorMsg(`No se encontró ninguna orden con el código "${inputCode}". Verifica tu número.`);
    }
  };

  return (
    <section className="relative -mt-4 sm:-mt-6 z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20d8e2]/10 text-[#0c8f97] text-xs font-semibold tracking-wide">
              <Package className="w-3.5 h-3.5" />
              <span>Sigue tu importación en tiempo real</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extralight text-slate-900 tracking-tight">
              Rastrear tu <span className="font-normal text-[#0c8f97]">Importación o Proyecto</span>
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-light">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Sistema Seguro Viccell</span>
          </div>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => { setInputCode(e.target.value); setErrorMsg(''); }}
                placeholder="Ingresa tu código de proyecto (ej: 20517462)..."
                className="w-full pl-12 pr-4 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm sm:text-base font-light focus:outline-none focus:ring-2 focus:ring-[#20d8e2] transition-all"
              />
            </div>

            <button
              type="submit"
              className="group w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-gradient-to-r from-[#20d8e2] to-[#12b3bc] hover:from-[#1bc6cf] hover:to-[#0f9ea7] text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-[#20d8e2]/20 hover:shadow-cyan-500/30 backdrop-blur-md border border-white/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Consultar Estado</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-500 font-light">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Clock className="w-4 h-4 text-[#0c8f97] shrink-0" />
            <span><strong>1. Cotizado:</strong> Registro inicial y verificación</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Package className="w-4 h-4 text-amber-600 shrink-0" />
            <span><strong>2. En Proceso:</strong> Preparación y tránsito</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>3. Despachado:</strong> Listo para entrega</span>
          </div>
        </div>

      </div>
    </section>
  );
};
