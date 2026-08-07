import React, { useState, useEffect } from 'react';
import { Send, MapPin, CheckCircle, Package, ShoppingCart, Trash2, Truck, AlertCircle } from 'lucide-react';
import { CartItem, DispatchForm, StoreMode, User } from '../types';

interface ShippingSectionProps {
  cartItems?: CartItem[];
  storeMode?: StoreMode;
  currentUser?: User | null;
  onUpdateQuantity?: (productId: string, delta: number) => void;
  onRemoveItem?: (productId: string) => void;
  onClearCart?: () => void;
}

export const ShippingSection: React.FC<ShippingSectionProps> = ({
  cartItems = [],
  storeMode = 'minorista',
  currentUser,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [form, setForm] = useState<DispatchForm>({
    fullName: currentUser?.name || '',
    idNumber: '',
    email: currentUser?.email || '',
    phone: '',
    agency: 'MRW',
    state: 'Aragua',
    city: 'Maracay',
    agencyAddress: '',
    idPhotoName: '',
  });

  const [idUploaded, setIdUploaded] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setForm(prev => ({
        ...prev,
        fullName: prev.fullName || currentUser.name || '',
        email: prev.email || currentUser.email || '',
      }));
    }
  }, [currentUser]);

  const totalUSD = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm(prev => ({ ...prev, idPhotoName: file.name }));
      setIdUploaded(true);
    }
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    let message = '';

    if (cartItems.length > 0) {
      message += `🛒 *PEDIDO Y REGISTRO DE DESPACHO - VICCELL (${storeMode.toUpperCase()})*\n`;
      message += `─────────────────────────\n\n`;

      message += `📋 *DETALLE DEL PEDIDO DE PRODUCTOS:*\n`;
      cartItems.forEach((item, i) => {
        message += `${i + 1}. *${item.product.title}*\n` +
          `   • SKU: ${item.product.sku}\n` +
          `   • Cantidad: ${item.quantity} uds\n` +
          `   • P.Unit: $${item.unitPrice.toFixed(2)} | Subtotal: $${(item.unitPrice * item.quantity).toFixed(2)}\n\n`;
      });

      message += `💵 *TOTAL PRODUCTOS USD: $${totalUSD.toFixed(2)}*\n\n`;

      message += `📦 *DATOS DE DESPACHO Y ENVÍO:*\n`;
    } else {
      message += `📦 *REGISTRO DE DESPACHO VICCELL*\n`;
      message += `─────────────────────────\n\n`;
    }

    message += 
      `👤 Nombre: ${form.fullName || 'No especificado'}\n` +
      `🆔 Cédula/RIF: ${form.idNumber || 'No especificado'}\n` +
      `📧 Correo: ${form.email || 'No especificado'}\n` +
      `📱 Teléfono: ${form.phone || 'No especificado'}\n` +
      `🏢 Agencia: ${form.agency} (Cobro en Destino)\n` +
      `📍 Ubicación: ${form.state}, ${form.city}\n` +
      `🏠 Dirección Agencia: ${form.agencyAddress || 'No especificada'}\n` +
      `📄 Foto Cédula: ${idUploaded ? form.idPhotoName : 'Adjunto por chat'}\n\n` +
      `Hola Viccell, envío este registro para procesar la cotización e instrucciones de pago. Quedo atento.`;

    window.open(`https://wa.me/584128006426?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="envios" className="py-16 bg-white text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
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

        {/* Shipping Agencies Cards */}
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

        {/* Floating/Prominent Order Summary Card (if cart has items) */}
        {cartItems.length > 0 && (
          <div className="max-w-3xl mx-auto bg-white text-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-[#20d8e2]/40 shadow-xl relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#20d8e2]/15 border border-[#20d8e2]/30 rounded-2xl text-[#0c8f97]">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    Pedido de Productos Adjunto
                    <span className="bg-[#20d8e2]/20 text-[#0c8f97] text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border border-[#20d8e2]/30">
                      {storeMode}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 font-light">
                    {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} listo(s) para incluir en tu registro de despacho
                  </p>
                </div>
              </div>

              {onClearCart && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-slate-400 hover:text-rose-500 underline font-medium cursor-pointer"
                >
                  Vaciar pedido
                </button>
              )}
            </div>

            {/* List of items */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => {
                const sub = item.unitPrice * item.quantity;
                return (
                  <div 
                    key={item.product.id}
                    className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3 flex items-center gap-3 justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.title} 
                        className="w-12 h-12 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{item.product.title}</p>
                        <p className="text-[11px] text-slate-500 font-mono">SKU: {item.product.sku} | ${item.unitPrice.toFixed(2)} c/u</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Quantity Controls */}
                      {onUpdateQuantity && (
                        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 text-xs shadow-sm">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-5 h-5 text-slate-500 hover:text-slate-900 flex items-center justify-center font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-bold text-[#0c8f97]">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-5 h-5 text-slate-500 hover:text-slate-900 flex items-center justify-center font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      )}

                      <span className="text-xs font-black text-slate-900 min-w-[55px] text-right">
                        ${sub.toFixed(2)}
                      </span>

                      {onRemoveItem && (
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold">
              <span className="text-slate-600">Total de Productos:</span>
              <span className="text-2xl font-black text-[#0c8f97]">${totalUSD.toFixed(2)}</span>
            </div>

            <div className="bg-[#20d8e2]/10 border border-[#20d8e2]/30 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-[#0c8f97] font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#0c8f97]" />
              <span>Al completar el siguiente formulario de despacho, se enviará el pedido completo junto con tus datos de envío directamente a WhatsApp.</span>
            </div>
          </div>
        )}

        {/* Dispatch Form Container */}
        <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 max-w-3xl mx-auto space-y-6 shadow-sm">
          <div className="border-b border-slate-200/80 pb-4 text-center space-y-1">
            <h3 className="text-2xl font-extralight tracking-tight text-slate-900">Registro de Despacho</h3>
            <p className="text-xs text-slate-500 font-light">Completa tus datos para agilizar el envío inmediato de tu paquete</p>
          </div>
          
          <form onSubmit={handleSendToWhatsApp} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="font-light text-slate-700 block tracking-wide">Nombre y Apellido *</label>
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
                <label className="font-light text-slate-700 block tracking-wide">Cédula / RIF *</label>
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
                <label className="font-light text-slate-700 block tracking-wide">Correo Electrónico *</label>
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
                <label className="font-light text-slate-700 block tracking-wide">Teléfono de Contacto *</label>
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
              <label className="font-light text-slate-700 block tracking-wide">Selecciona la Agencia *</label>
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
                <label className="font-light text-slate-700 block tracking-wide">Estado *</label>
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
                <label className="font-light text-slate-700 block tracking-wide">Ciudad *</label>
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
              <label className="font-light text-slate-700 block tracking-wide">Dirección Exacta o Código de Agencia *</label>
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
              <label className="font-light text-slate-700 block tracking-wide">Foto de Cédula (Opcional):</label>
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

            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                className="w-full max-w-md py-4 sm:py-5 px-8 bg-[#20d8e2] hover:bg-[#1bc5cf] text-slate-950 font-black text-base sm:text-lg tracking-wide rounded-2xl shadow-xl shadow-[#20d8e2]/30 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer animate-cart-bounce hover:scale-105 active:scale-95"
              >
                <Send className="w-6 h-6 text-slate-950 shrink-0" />
                <span>Enviar pedido</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};
