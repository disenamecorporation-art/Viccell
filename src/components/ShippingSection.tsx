import React, { useState } from 'react';
import { Send, MapPin, CheckCircle, Package } from 'lucide-react';
import { DispatchForm } from '../types';

export const ShippingSection: React.FC = () => {
  const [form, setForm] = useState<DispatchForm>({
    fullName: '',
    idNumber: '',
    email: '',
    phone: '',
    agency: 'MRW',
    state: 'Aragua',
    city: 'Maracay',
    agencyAddress: '',
    idPhotoName: '',
  });

  const [idUploaded, setIdUploaded] = useState(false);

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm(prev => ({ ...prev, idPhotoName: file.name }));
      setIdUploaded(true);
    }
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const message = 
      `📦 Datos de Despacho Viccell:\n` +
      `👤 Nombre: ${form.fullName}\n` +
      `🆔 Cédula/RIF: ${form.idNumber}\n` +
      `📧 Correo: ${form.email}\n` +
      `📱 Teléfono: ${form.phone}\n` +
      `🏢 Agencia: ${form.agency} (Cobro en Destino)\n` +
      `📍 Ubicación: ${form.state}, ${form.city}\n` +
      `🏠 Dirección Agencia: ${form.agencyAddress}\n` +
      `📄 Foto Cédula: ${idUploaded ? form.idPhotoName : 'Adjunto por chat'}`;

    window.open(`https://wa.me/584128006426?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="envios" className="py-16 bg-white text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header with Montserrat Thin & Elegant Typography */}
        <div className="text-center space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#20d8e2]/10 text-[#0c8f97] text-xs font-semibold tracking-widest uppercase">
            Logística Nacional Segura
          </span>
          <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-slate-900">
            Envíos y <span className="font-normal text-[#0c8f97]">Despachos</span>
          </h2>
          <p className="text-slate-500 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Despachos diarios a toda Venezuela en modalidad Cobro en Destino con las principales agencias del país.
          </p>
        </div>

        {/* Shipping Agencies Cards with Exact Logos and Gentle Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* MRW Card */}
          <div className="bg-slate-50 border border-slate-200/80 hover:border-[#20d8e2] rounded-3xl p-8 text-center space-y-5 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="h-20 w-full rounded-2xl bg-white border border-slate-100 p-4 flex items-center justify-center shadow-inner">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqBJ1U9S2awbb9F0Wre2av7fxLwSSXleu5tcWDqFvET3YQlaIaXVMOSLg&s=10" 
                alt="MRW Venezuela" 
                className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-normal text-lg tracking-wide text-slate-900">MRW Express</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Cobro a destino en todas las oficinas y sucursales a nivel nacional con cobertura inmediata.
              </p>
            </div>
          </div>

          {/* ZOOM Card */}
          <div className="bg-slate-50 border border-slate-200/80 hover:border-[#20d8e2] rounded-3xl p-8 text-center space-y-5 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="h-20 w-full rounded-2xl bg-white border border-slate-100 p-4 flex items-center justify-center shadow-inner">
              <img 
                src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/022018/untitled-1_44.png?wohdoRZUqlV_VDgUdAXAysccVIwmMqCy&itok=HQzAu-yY" 
                alt="Grupo ZOOM Venezuela" 
                className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-normal text-lg tracking-wide text-slate-900">Grupo ZOOM</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Envíos asegurados con guía de seguimiento en tiempo real y máxima seguridad.
              </p>
            </div>
          </div>

          {/* TEALCA Card */}
          <div className="bg-slate-50 border border-slate-200/80 hover:border-[#20d8e2] rounded-3xl p-8 text-center space-y-5 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="h-20 w-full rounded-2xl bg-white border border-slate-100 p-4 flex items-center justify-center shadow-inner">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp0wVd1xpbIAJ4JFvC3UPsRG9p62c0M3eWWuMXzCnWPw&s=10" 
                alt="TEALCA Venezuela" 
                className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-normal text-lg tracking-wide text-slate-900">Tealca</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Entrega rápida de 24 a 48 horas hábiles directamente en taquilla autorizada.
              </p>
            </div>
          </div>

        </div>

        {/* Dispatch Form Container */}
        <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 max-w-3xl mx-auto space-y-6 shadow-sm">
          <div className="border-b border-slate-200/80 pb-4 text-center space-y-1">
            <h3 className="text-2xl font-extralight tracking-tight text-slate-900">Registro de Despacho</h3>
            <p className="text-xs text-slate-500 font-light">Completa tus datos para agilizar el envío inmediato de tu paquete</p>
          </div>
          
          <form onSubmit={handleSendToWhatsApp} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="font-light text-slate-700 block tracking-wide">Nombre y Apellido:</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Carlos Mendoza"
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-light focus:outline-none focus:border-[#20d8e2] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-light text-slate-700 block tracking-wide">Cédula / RIF:</label>
                <input
                  type="text"
                  required
                  value={form.idNumber}
                  onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
                  placeholder="V-18450920"
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-light focus:outline-none focus:border-[#20d8e2] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="font-light text-slate-700 block tracking-wide">Correo Electrónico:</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="correo@ejemplo.com"
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-light focus:outline-none focus:border-[#20d8e2] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-light text-slate-700 block tracking-wide">Teléfono de Contacto:</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="04121234567"
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-light focus:outline-none focus:border-[#20d8e2] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-light text-slate-700 block tracking-wide">Selecciona la Agencia:</label>
              <div className="grid grid-cols-3 gap-4">
                {(['MRW', 'Zoom', 'Tealca'] as const).map((ag) => (
                  <button
                    key={ag}
                    type="button"
                    onClick={() => setForm({ ...form, agency: ag })}
                    className={`py-3.5 rounded-2xl border text-xs font-normal cursor-pointer transition-all ${
                      form.agency === ag 
                        ? 'bg-[#20d8e2] text-slate-950 border-[#20d8e2] font-semibold shadow-md scale-102' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {ag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="font-light text-slate-700 block tracking-wide">Estado:</label>
                <input
                  type="text"
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  placeholder="Aragua"
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-light focus:outline-none focus:border-[#20d8e2]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-light text-slate-700 block tracking-wide">Ciudad:</label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Maracay"
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-light focus:outline-none focus:border-[#20d8e2]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-light text-slate-700 block tracking-wide">Dirección Exacta o Código de Agencia:</label>
              <input
                type="text"
                required
                value={form.agencyAddress}
                onChange={(e) => setForm({ ...form, agencyAddress: e.target.value })}
                placeholder="Oficina MRW Centro Comercial Maracay Plaza"
                className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-light focus:outline-none focus:border-[#20d8e2]"
              />
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="font-light text-slate-700 block tracking-wide">Foto de Cédula (Opcional para registro):</label>
              <div className="flex items-center gap-4">
                <label className="flex-1 flex items-center justify-center gap-2 p-4 bg-white border border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-[#20d8e2] transition-colors">
                  <Package className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-500 font-light truncate">
                    {idUploaded ? form.idPhotoName : 'Seleccionar archivo o foto'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSimulatedFileUpload}
                    className="hidden"
                  />
                </label>
                {idUploaded && (
                  <span className="flex items-center gap-1 text-emerald-600 font-normal">
                    <CheckCircle className="w-4 h-4" /> Listo
                  </span>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#20d8e2] hover:bg-[#1bc5cf] text-slate-950 font-semibold text-sm tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Datos de Envío por WhatsApp</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};
