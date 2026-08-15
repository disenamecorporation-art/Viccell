import React, { useState, useEffect } from 'react';
import { Send, MapPin, CheckCircle, Package, ShoppingCart, Trash2, Truck, AlertCircle, Landmark, Camera, ShieldCheck, UserCheck, Info } from 'lucide-react';
import { CartItem, DispatchForm, StoreMode, User, PaymentMethodConfig } from '../types';

interface ShippingSectionProps {
  cartItems?: CartItem[];
  storeMode?: StoreMode;
  currentUser?: User | null;
  paymentMethods: PaymentMethodConfig;
  onUpdateCurrentUser?: (user: User) => void;
  onUpdateQuantity?: (productId: string, delta: number) => void;
  onSetQuantity?: (productId: string, newQty: number) => void;
  onRemoveItem?: (productId: string) => void;
  onClearCart?: () => void;
}

export const ShippingSection: React.FC<ShippingSectionProps> = ({
  cartItems = [],
  storeMode = 'minorista',
  currentUser,
  paymentMethods,
  onUpdateCurrentUser,
  onUpdateQuantity,
  onSetQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [form, setForm] = useState<DispatchForm>({
    fullName: currentUser?.name || '',
    idNumber: currentUser?.idNumber || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    agency: 'MRW',
    state: currentUser?.state || 'Aragua',
    city: currentUser?.city || 'Maracay',
    agencyAddress: currentUser?.address || '',
    idPhotoName: currentUser?.idPhotoName || '',
    selfiePhotoName: currentUser?.selfiePhotoName || '',
    rif: currentUser?.rif || '',
  });

  const [idUploaded, setIdUploaded] = useState(!!currentUser?.idPhotoName);
  const [selfieUploaded, setSelfieUploaded] = useState(!!currentUser?.selfiePhotoName);
  const [idPhotoError, setIdPhotoError] = useState(false);
  const [saveToProfile, setSaveToProfile] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'pagoMovil' | 'transferencia' | 'binance' | 'whatsapp'>('pagoMovil');

  // Sync profile document registry if user logs in or profile changes
  useEffect(() => {
    if (currentUser) {
      setForm(prev => ({
        ...prev,
        fullName: prev.fullName || currentUser.name || '',
        email: prev.email || currentUser.email || '',
        idNumber: prev.idNumber || currentUser.idNumber || '',
        phone: prev.phone || currentUser.phone || '',
        rif: prev.rif || currentUser.rif || '',
        state: prev.state || currentUser.state || 'Aragua',
        city: prev.city || currentUser.city || 'Maracay',
        agencyAddress: prev.agencyAddress || currentUser.address || '',
        idPhotoName: prev.idPhotoName || currentUser.idPhotoName || '',
        selfiePhotoName: prev.selfiePhotoName || currentUser.selfiePhotoName || '',
      }));
      if (currentUser.idPhotoName) setIdUploaded(true);
      if (currentUser.selfiePhotoName) setSelfieUploaded(true);
    }
  }, [currentUser]);

  const totalUSD = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // Registration Incentives: first purchase 25% retail, 10% wholesale
  const isFirstPurchaseEligible = currentUser && (currentUser.isFirstPurchase !== false);
  const discountPercentage = isFirstPurchaseEligible ? (storeMode === 'minorista' ? 25 : 10) : 0;
  const discountAmount = totalUSD * (discountPercentage / 100);
  const finalTotalUSD = totalUSD - discountAmount;

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm(prev => ({ ...prev, idPhotoName: file.name }));
      setIdUploaded(true);
      setIdPhotoError(false);
    }
  };

  const handleSimulatedSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm(prev => ({ ...prev, selfiePhotoName: file.name }));
      setSelfieUploaded(true);
    }
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // STRICT MANDATORY FILE UPLOAD: ID Photo
    if (!idUploaded) {
      setIdPhotoError(true);
      const element = document.getElementById('id-upload-container');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Save profile documents dynamically for future auto-complete
    if (currentUser && saveToProfile && onUpdateCurrentUser) {
      onUpdateCurrentUser({
        ...currentUser,
        idNumber: form.idNumber,
        phone: form.phone,
        rif: form.rif,
        state: form.state,
        city: form.city,
        address: form.agencyAddress,
        idPhotoName: form.idPhotoName,
        selfiePhotoName: form.selfiePhotoName,
        profileCompleted: true
      });
    }

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

      if (discountPercentage > 0) {
        message += `💵 Subtotal Productos: $${totalUSD.toFixed(2)}\n`;
        message += `🎁 Descuento de Bienvenida (${discountPercentage}%): -$${discountAmount.toFixed(2)}\n`;
        message += `⭐ *TOTAL NETO USD: $${finalTotalUSD.toFixed(2)}*\n\n`;
      } else {
        message += `💵 *TOTAL PRODUCTOS USD: $${totalUSD.toFixed(2)}*\n\n`;
      }

      message += `📦 *DATOS DE DESPACHO Y ENVÍO:*\n`;
    } else {
      message += `📦 *REGISTRO DE DESPACHO VICCELL*\n`;
      message += `─────────────────────────\n\n`;
    }

    message += 
      `👤 Nombre: ${form.fullName || 'No especificado'}\n` +
      `🆔 Cédula: ${form.idNumber || 'No especificado'}\n` +
      `📄 RIF: ${form.rif || 'No especificado'}\n` +
      `📧 Correo: ${form.email || 'No especificado'}\n` +
      `📱 Teléfono: ${form.phone || 'No especificado'}\n` +
      `🏢 Método de Envío: ${form.agency}\n` +
      `📍 Ubicación: Estado ${form.state}, Ciudad ${form.city}\n` +
      `🏠 Dirección / Oficina Agencia: ${form.agencyAddress || 'No especificada'}\n` +
      `📁 Documento Cédula: ${idUploaded ? form.idPhotoName : 'Pendiente'}\n` +
      `🤳 Foto Selfie: ${selfieUploaded ? form.selfiePhotoName : 'No cargada'}\n\n`;

    message += `💳 *MÉTODO DE PAGO PREFERIDO:*\n`;
    if (selectedPaymentMethod === 'pagoMovil') {
      message += `• Pago Móvil: ${paymentMethods.pagoMovil.banco} | ${paymentMethods.pagoMovil.phone}\n\n`;
    } else if (selectedPaymentMethod === 'transferencia') {
      message += `• Transferencia: ${paymentMethods.transferencia.banco} | Cuenta: ${paymentMethods.transferencia.cuenta}\n\n`;
    } else if (selectedPaymentMethod === 'binance') {
      message += `• Binance Pay ID: ${paymentMethods.binance.usuario}\n\n`;
    } else {
      message += `• Confirmar vía Chat de WhatsApp\n\n`;
    }

    message += `Hola Viccell, envío este registro completo con mis documentos de identidad obligatorios para procesar la cotización e iniciar el despacho.`;

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
                        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 text-xs shadow-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-5 h-5 text-slate-500 hover:text-slate-900 flex items-center justify-center font-bold cursor-pointer"
                            aria-label="Disminuir"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (onSetQuantity) {
                                  onSetQuantity(item.product.id, isNaN(val) ? 1 : Math.max(1, val));
                              } else if (!isNaN(val)) {
                                const diff = val - item.quantity;
                                onUpdateQuantity(item.product.id, diff);
                              }
                            }}
                            className="w-10 text-center text-xs font-bold text-[#0c8f97] bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-5 h-5 text-slate-500 hover:text-slate-900 flex items-center justify-center font-bold cursor-pointer"
                            aria-label="Aumentar"
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

            {/* Registration Incentives Badge inside checkout summary */}
            {isFirstPurchaseEligible && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-800 animate-pulse">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">🎉 ¡Descuento de Primer Registro Activo!</p>
                  <p className="font-light text-slate-600">Por estar registrado se te aplica un descuento exclusivo del <strong className="font-black text-emerald-700">{discountPercentage}%</strong> en tu primera compra {storeMode === 'minorista' ? 'Minorista' : 'Mayorista'}.</p>
                </div>
              </div>
            )}

            <div className="border-t border-slate-100 pt-4 space-y-2 text-sm font-bold">
              <div className="flex items-center justify-between text-slate-500">
                <span>Subtotal Productos:</span>
                <span>${totalUSD.toFixed(2)}</span>
              </div>
              {isFirstPurchaseEligible && (
                <div className="flex items-center justify-between text-emerald-600">
                  <span>Descuento de Registro ({discountPercentage}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-base pt-1 border-t border-dashed border-slate-200">
                <span className="text-slate-800">Total Final a Confirmar:</span>
                <span className="text-3xl font-black text-[#0c8f97]">${finalTotalUSD.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-[#20d8e2]/10 border border-[#20d8e2]/30 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-[#0c8f97] font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#0c8f97]" />
              <span>Al completar el siguiente registro, se enviarán todos tus documentos adjuntos, detalle de pedido y método de pago directamente a WhatsApp de forma consolidada.</span>
            </div>
          </div>
        )}

        {/* Dispatch Form Container */}
        <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 max-w-3xl mx-auto space-y-6 shadow-sm">
          <div className="border-b border-slate-200/80 pb-4 text-center space-y-1">
            <h3 className="text-2xl font-extralight tracking-tight text-slate-900">Registro de Despacho</h3>
            <p className="text-xs text-slate-500 font-light">Completa tus datos obligatorios de identidad para envíos Nacionales, Marítimos o Aéreos</p>
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
                <label className="font-light text-slate-700 block tracking-wide">Cédula de Identidad * (Obligatoria)</label>
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
                <label className="font-light text-slate-700 block tracking-wide">RIF (Registro de Información Fiscal) *</label>
                <input
                  type="text"
                  required
                  value={form.rif}
                  onChange={(e) => setForm({ ...form, rif: e.target.value })}
                  placeholder="J-26161731-0"
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

            <div className="grid grid-cols-1 gap-5">
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
            </div>

            <div className="space-y-2">
              <label className="font-light text-slate-700 block tracking-wide">Método de Envío o Carga *</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {([
                  { id: 'MRW', label: 'MRW Nac.' },
                  { id: 'Zoom', label: 'Zoom Nac.' },
                  { id: 'Tealca', label: 'Tealca Nac.' },
                  { id: 'Marítimo', label: 'Marítimo Int.' },
                  { id: 'Aéreo', label: 'Aéreo Int.' }
                ] as const).map((ag) => (
                  <button
                    key={ag.id}
                    type="button"
                    onClick={() => setForm({ ...form, agency: ag.id })}
                    className={`py-3.5 rounded-2xl border text-[11px] font-normal cursor-pointer transition-all ${
                      form.agency === ag.id 
                        ? 'bg-[#20d8e2] text-slate-950 border-[#20d8e2] font-semibold shadow-md scale-102' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {ag.label}
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
              <label className="font-light text-slate-700 block tracking-wide">Dirección Exacta o Dirección de Agencia Autorizada *</label>
              <input
                type="text"
                required
                value={form.agencyAddress}
                onChange={(e) => setForm({ ...form, agencyAddress: e.target.value })}
                placeholder="Oficina MRW Centro Comercial Maracay Plaza, o Av. Las Delicias..."
                className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-light focus:outline-none focus:border-[#20d8e2]"
              />
            </div>

            {/* Document upload: Cédula (Mandatory) & Selfie (Optional) */}
            <div id="id-upload-container" className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block tracking-wide flex items-center gap-1.5">
                  Foto de Cédula * <span className="text-xs text-rose-500 font-extrabold">(Obligatoria)</span>
                </label>
                <div className={`flex items-center gap-4 p-4 bg-white border rounded-2xl transition-all ${idPhotoError ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-200' : 'border-slate-200'}`}>
                  <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer text-center">
                    <Camera className="w-5 h-5 text-slate-400 shrink-0" />
                    <span className="text-slate-500 font-light truncate text-[11px]">
                      {idUploaded ? form.idPhotoName : 'Seleccionar Foto de Cédula'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSimulatedFileUpload}
                      className="hidden"
                    />
                  </label>
                  {idUploaded && (
                    <span className="flex items-center gap-1 text-emerald-600 font-bold shrink-0">
                      <CheckCircle className="w-4 h-4" /> Listo
                    </span>
                  )}
                </div>
                {idPhotoError && (
                  <p className="text-[10px] text-rose-500 font-extrabold animate-pulse">⚠️ La foto de la cédula es estrictamente obligatoria para verificar tu despacho nacional/internacional.</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="font-light text-slate-700 block tracking-wide">Foto Selfie (Opcional - Verificación de seguridad)</label>
                <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl transition-all">
                  <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer text-center">
                    <Camera className="w-5 h-5 text-slate-400 shrink-0" />
                    <span className="text-slate-500 font-light truncate text-[11px]">
                      {selfieUploaded ? form.selfiePhotoName : 'Seleccionar Selfie'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSimulatedSelfieUpload}
                      className="hidden"
                    />
                  </label>
                  {selfieUploaded && (
                    <span className="flex items-center gap-1 text-emerald-600 font-bold shrink-0">
                      <CheckCircle className="w-4 h-4" /> Listo
                    </span>
                  )}
                </div>
              </div>
            </div>

            {currentUser && (
              <label className="flex items-center gap-2.5 p-3.5 bg-slate-100 rounded-2xl text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={saveToProfile}
                  onChange={(e) => setSaveToProfile(e.target.checked)}
                  className="w-4 h-4 accent-[#0c8f97] rounded"
                />
                <span className="font-medium text-[11px]">
                  Guardar y sincronizar estos datos en mi perfil para no tener que volver a colocarlos en futuras compras (Auto-completar activado).
                </span>
              </label>
            )}

            {/* INTEGRATED BANK INSTRUCTIONS SELECTOR & DISPLAY */}
            <div className="p-5 sm:p-6 bg-slate-100/80 rounded-3xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2.5">
                <Landmark className="w-5 h-5 text-[#0c8f97] shrink-0" />
                <h4 className="text-sm font-black text-slate-900">Métodos de Pago Autorizados</h4>
              </div>

              <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                Selecciona tu opción preferida para ver las instrucciones. Podrás pagar directamente y adjuntar tu comprobante, o confirmar el pago por WhatsApp en el chat de asesoría.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('pagoMovil')}
                  className={`py-3 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                    selectedPaymentMethod === 'pagoMovil' 
                      ? 'bg-[#0c8f97] text-white border-[#0c8f97] shadow-sm' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Pago Móvil
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('transferencia')}
                  className={`py-3 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                    selectedPaymentMethod === 'transferencia' 
                      ? 'bg-[#0c8f97] text-white border-[#0c8f97] shadow-sm' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Transferencia
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('binance')}
                  className={`py-3 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                    selectedPaymentMethod === 'binance' 
                      ? 'bg-[#0c8f97] text-white border-[#0c8f97] shadow-sm' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Binance Pay
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('whatsapp')}
                  className={`py-3 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                    selectedPaymentMethod === 'whatsapp' 
                      ? 'bg-[#0c8f97] text-white border-[#0c8f97] shadow-sm' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Coordinar Chat
                </button>
              </div>

              {/* Dynamic box displays values dynamically modified by admin panel! */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs">
                {selectedPaymentMethod === 'pagoMovil' && (
                  <div className="space-y-1.5">
                    <p className="font-bold text-slate-800 border-b border-slate-100 pb-1 flex items-center gap-1">🏦 Pago Móvil Directo:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 font-light text-slate-600 pt-1">
                      <div><span>Banco:</span> <strong className="font-bold text-slate-900 block sm:inline">{paymentMethods.pagoMovil.banco}</strong></div>
                      <div><span>Celular:</span> <strong className="font-bold text-slate-900 block sm:inline">{paymentMethods.pagoMovil.phone}</strong></div>
                      <div><span>Titular:</span> <strong className="font-bold text-slate-900 block sm:inline">{paymentMethods.pagoMovil.titular}</strong></div>
                      <div><span>Cédula:</span> <strong className="font-bold text-slate-900 block sm:inline">{paymentMethods.pagoMovil.cedula}</strong></div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === 'transferencia' && (
                  <div className="space-y-1.5">
                    <p className="font-bold text-slate-800 border-b border-slate-100 pb-1 flex items-center gap-1">🏦 Transferencia Bancaria Nacional:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 font-light text-slate-600 pt-1">
                      <div><span>Banco Receptor:</span> <strong className="font-bold text-slate-900 block sm:inline">{paymentMethods.transferencia.banco}</strong></div>
                      <div><span>Titular:</span> <strong className="font-bold text-slate-900 block sm:inline">{paymentMethods.transferencia.titular}</strong></div>
                      <div><span>Cédula / RIF:</span> <strong className="font-bold text-slate-900 block sm:inline">{paymentMethods.transferencia.cedula}</strong></div>
                      <div className="sm:col-span-2"><span>Nº de Cuenta (20 Dígitos):</span> <strong className="font-mono text-xs font-bold text-slate-900 block mt-0.5 tracking-widest bg-slate-100 px-2.5 py-1 rounded border border-slate-200 select-all w-full text-center">{paymentMethods.transferencia.cuenta}</strong></div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === 'binance' && (
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn p-2">
                    <div className="space-y-3 flex-1 w-full text-center md:text-left">
                      <p className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-1.5 flex items-center justify-center md:justify-start gap-1.5">🪙 Binance Pay USDT:</p>
                      <div className="space-y-1 text-slate-600">
                        <span className="text-[11px] block text-slate-400 font-light">Usuario de Pago:</span>
                        <strong className="font-black text-lg text-[#0c8f97] block tracking-wide select-all bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-xl mt-1 max-w-[240px] mx-auto md:mx-0 text-center">{paymentMethods.binance.usuario}</strong>
                      </div>
                      <p className="text-[10px] text-slate-400 font-light italic leading-relaxed pt-2">
                        Puedes escanear el código QR con tu aplicación de Binance o copiar el nombre de usuario para transferir mediante Binance Pay de forma directa.
                      </p>
                    </div>
                    {(paymentMethods.binance.qrUrl || 'https://i.postimg.cc/ydTgPJ7P/QRbinance.jpg') && (
                      <div className="flex flex-col items-center gap-1.5 shrink-0">
                        <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                          <img 
                            src={paymentMethods.binance.qrUrl || 'https://i.postimg.cc/ydTgPJ7P/QRbinance.jpg'} 
                            alt="Binance QR Code" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain rounded-xl"
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Escanear QR de Binance</span>
                      </div>
                    )}
                  </div>
                )}

                {selectedPaymentMethod === 'whatsapp' && (
                  <div className="space-y-1.5">
                    <p className="font-bold text-[#0c8f97] flex items-center gap-1">💬 Coordinar método único por WhatsApp:</p>
                    <p className="font-light text-slate-500 text-[11px] leading-relaxed">
                      Si posee algún inconveniente con los bancos listados, o prefiere pagar mediante efectivo, divisas, Zelle o PayPal, le enviaremos los datos alternativos de inmediato cuando confirme su pedido.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 flex flex-col items-center gap-2">
              <button
                type="submit"
                className="w-full max-w-md py-4 sm:py-5 px-8 bg-[#20d8e2] hover:bg-[#1bc5cf] text-slate-950 font-black text-base sm:text-lg tracking-wide rounded-2xl shadow-xl shadow-[#20d8e2]/30 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer hover:scale-103 active:scale-97"
              >
                <Send className="w-6 h-6 text-slate-950 shrink-0" />
                <span>Enviar Pedido y Registro</span>
              </button>
              <p className="text-[10px] text-slate-400 font-light text-center">
                Se requiere tener la Foto de la Cédula cargada de forma obligatoria para habilitar el envío de registro.
              </p>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};
