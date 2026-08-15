import React, { useState, useEffect } from 'react';
import { X, Package, User, ShoppingBag, MapPin, ShieldCheck, Clock, CheckCircle2, ArrowRight, Gift, Save, Landmark } from 'lucide-react';
import { User as UserType, TrackingOrder, CartItem } from '../types';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType | null;
  orders: TrackingOrder[];
  cartItems: CartItem[];
  onUpdateCurrentUser?: (user: UserType) => void;
  onNavigateToTracking: (code: string) => void;
  onNavigateToStore: () => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  orders,
  cartItems,
  onUpdateCurrentUser,
  onNavigateToTracking,
  onNavigateToStore
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'cart' | 'addresses'>('orders');

  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    idNumber: currentUser?.idNumber || '',
    rif: currentUser?.rif || '',
    state: currentUser?.state || '',
    city: currentUser?.city || '',
    address: currentUser?.address || '',
    birthday: currentUser?.birthday || '',
    favoriteBrand: currentUser?.favoriteBrand || '',
    instagram: currentUser?.instagram || '',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync profile editing fields when currentUser details load
  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        idNumber: currentUser.idNumber || '',
        rif: currentUser.rif || '',
        state: currentUser.state || '',
        city: currentUser.city || '',
        address: currentUser.address || '',
        birthday: currentUser.birthday || '',
        favoriteBrand: currentUser.favoriteBrand || '',
        instagram: currentUser.instagram || '',
      });
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !onUpdateCurrentUser) return;

    // Check if they completed secondary data (Birthday and brand/instagram)
    const secondaryCompletedNow = !!(profileForm.birthday || profileForm.favoriteBrand || profileForm.instagram);

    const updated: UserType = {
      ...currentUser,
      name: profileForm.name,
      phone: profileForm.phone,
      idNumber: profileForm.idNumber,
      rif: profileForm.rif,
      state: profileForm.state,
      city: profileForm.city,
      address: profileForm.address,
      birthday: profileForm.birthday,
      favoriteBrand: profileForm.favoriteBrand,
      instagram: profileForm.instagram,
      secondaryCompleted: secondaryCompletedNow,
      profileCompleted: true,
    };

    onUpdateCurrentUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const userOrders = currentUser
    ? orders.filter(o => o.clientEmail.toLowerCase() === currentUser.email.toLowerCase() || o.clientName.toLowerCase() === currentUser.name.toLowerCase())
    : orders; // fallback to show all or sample order 20517462

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fadeIn">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#20d8e2] text-slate-950 flex items-center justify-center font-black text-xl">
              {currentUser ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="text-xl font-normal tracking-wide">
                {currentUser ? currentUser.name : 'Panel de Cliente Viccell'}
              </h3>
              <p className="text-xs text-slate-400 font-light">
                {currentUser ? currentUser.email : 'cliente@viccell.com'} • {currentUser?.role === 'admin' ? 'Administrador' : 'Cliente Verificado'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 bg-slate-50 px-4 sm:px-6 gap-1 sm:gap-2 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-4 px-4 border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === 'orders' ? 'border-[#0c8f97] text-[#0c8f97] bg-white' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Mis Proyectos y Órdenes ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className={`py-4 px-4 border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === 'cart' ? 'border-[#0c8f97] text-[#0c8f97] bg-white' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Carrito Activo ({cartItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-4 border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === 'profile' ? 'border-[#0c8f97] text-[#0c8f97] bg-white' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Mi Perfil</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-4 px-4 border-b-2 cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === 'addresses' ? 'border-[#0c8f97] text-[#0c8f97] bg-white' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Agencias / Envíos</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Órdenes y Tracking de Importación</h4>
                <span className="text-slate-500 font-light">Código ejemplo: <strong>20517462</strong></span>
              </div>

              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-[#20d8e2] transition-all">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <div className="text-[11px] text-[#0c8f97] font-bold">Proyecto: {ord.projectName}</div>
                        <h5 className="text-base font-bold text-slate-900">Código de Orden: #{ord.code}</h5>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        ord.phase === 'DESPACHADO' ? 'bg-emerald-100 text-emerald-800' :
                        ord.phase === 'EN PROCESO' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.phase}
                      </span>
                    </div>

                    <div className="text-slate-600 font-light space-y-1">
                      <div><strong>Artículos:</strong> {ord.itemsDescription}</div>
                      <div><strong>Total:</strong> ${ord.totalAmount.toFixed(2)} USD • <strong>Fecha:</strong> {ord.createdAt}</div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          onClose();
                          onNavigateToTracking(ord.code);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#20d8e2] text-slate-950 font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#1bc6cf]"
                      >
                        <span>Ver Seguimiento Completo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cart' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Productos en Carrito</h4>
              {cartItems.length === 0 ? (
                <div className="p-8 text-center space-y-3 bg-slate-50 rounded-2xl">
                  <ShoppingBag className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-slate-500 font-light">Tu carrito está vacío actualmente.</p>
                  <button
                    onClick={() => { onClose(); onNavigateToStore(); }}
                    className="px-5 py-2.5 rounded-xl bg-[#20d8e2] text-slate-950 font-bold cursor-pointer"
                  >
                    Ir a la Tienda
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <img src={item.product.images[0]} alt={item.product.title} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <div className="font-bold text-slate-900">{item.product.title}</div>
                          <div className="text-slate-500 font-light">Modo: {item.mode} • Cantidad: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="font-black text-sm text-slate-900">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 flex-wrap gap-2">
                <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Editar Perfil de Cliente</h4>
                <div className="flex gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-bold">
                    {currentUser?.role === 'admin' ? 'Administrador' : 'Cliente Registrado'}
                  </span>
                  {currentUser?.isFirstPurchase !== false && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                      <Gift className="w-3 h-3" /> Descuento Activo
                    </span>
                  )}
                </div>
              </div>

              {/* Reward Surprise Promo banner */}
              <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-emerald-800 text-xs rounded-2xl flex items-start gap-3 shadow-inner">
                <Gift className="w-5 h-5 shrink-0 text-emerald-600 animate-bounce mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-emerald-900 font-extrabold">🎁 ¡Completa tu Perfil y Recibe Sorpresas!</strong>
                  <p className="font-light text-slate-600 leading-relaxed">
                    Completa tu fecha de nacimiento y marca preferida en los <strong>Datos Secundarios</strong> de abajo y <strong className="font-bold text-emerald-700">te regalaremos una sorpresa súper especial</strong> directo a tu WhatsApp ese mismo día.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-6">
                {savedSuccess && (
                  <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-2 animate-bounce">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>¡Perfil guardado con éxito! Tus datos se auto-completarán en la sección de Envíos.</span>
                  </div>
                )}

                {/* Section 1: Primary Dispatch Documents */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                  <h5 className="font-bold text-xs text-slate-800 border-b border-slate-200/80 pb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#0c8f97]" />
                    1. Datos de Despacho y Documentos Primarios (Auto-llenado)
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-500 block mb-1 font-bold">Nombre Completo:</label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#20d8e2] font-light"
                      />
                    </div>

                    <div>
                      <label className="text-slate-500 block mb-1 font-bold">Teléfono Móvil:</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="Ej. 0412-1234567"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#20d8e2] font-light"
                      />
                    </div>

                    <div>
                      <label className="text-slate-500 block mb-1 font-bold">Cédula de Identidad:</label>
                      <input
                        type="text"
                        value={profileForm.idNumber}
                        onChange={(e) => setProfileForm({ ...profileForm, idNumber: e.target.value })}
                        placeholder="Ej. V-26161731"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#20d8e2] font-light"
                      />
                    </div>

                    <div>
                      <label className="text-slate-500 block mb-1 font-bold">RIF (Registro Fiscal):</label>
                      <input
                        type="text"
                        value={profileForm.rif}
                        onChange={(e) => setProfileForm({ ...profileForm, rif: e.target.value })}
                        placeholder="Ej. J-26161731-0"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#20d8e2] font-light"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-500 block mb-1 font-bold">Estado:</label>
                      <input
                        type="text"
                        value={profileForm.state}
                        onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                        placeholder="Ej. Aragua"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#20d8e2] font-light"
                      />
                    </div>

                    <div>
                      <label className="text-slate-500 block mb-1 font-bold">Ciudad:</label>
                      <input
                        type="text"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                        placeholder="Ej. Maracay"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#20d8e2] font-light"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-500 block mb-1 font-bold">Dirección de Envío o Agencia Autorizada:</label>
                    <input
                      type="text"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      placeholder="Oficina MRW, ZOOM o Tealca de tu preferencia"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#20d8e2] font-light"
                    />
                  </div>
                </div>

                {/* Section 2: Secondary documents & Birthday Rewards */}
                <div className="bg-[#20d8e2]/5 p-5 rounded-2xl border border-[#20d8e2]/25 space-y-4">
                  <h5 className="font-bold text-xs text-slate-800 border-b border-[#20d8e2]/25 pb-1.5 flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-[#0c8f97] shrink-0" />
                    2. Datos Secundarios de Recompensa (Cumpleaños y Preferencias)
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-slate-600 block mb-1 font-bold flex items-center gap-1">
                        🎂 Fecha de Cumpleaños:
                      </label>
                      <input
                        type="date"
                        value={profileForm.birthday}
                        onChange={(e) => setProfileForm({ ...profileForm, birthday: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#20d8e2]/30 rounded-xl focus:outline-none focus:border-[#20d8e2] font-light"
                      />
                    </div>

                    <div>
                      <label className="text-slate-600 block mb-1 font-bold">📱 Marca Favorita:</label>
                      <select
                        value={profileForm.favoriteBrand}
                        onChange={(e) => setProfileForm({ ...profileForm, favoriteBrand: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#20d8e2]/30 rounded-xl focus:outline-none focus:border-[#20d8e2] text-xs"
                      >
                        <option value="">-- Seleccionar --</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Apple">Apple (iPhone)</option>
                        <option value="Xiaomi">Xiaomi / Redmi</option>
                        <option value="Tecno">Tecno Mobile</option>
                        <option value="Infinix">Infinix</option>
                        <option value="Motorola">Motorola</option>
                        <option value="Otra">Otra Marca</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-600 block mb-1 font-bold">📸 Instagram (Usuario):</label>
                      <input
                        type="text"
                        value={profileForm.instagram}
                        onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                        placeholder="@tu_usuario"
                        className="w-full p-2.5 bg-white border border-[#20d8e2]/30 rounded-xl focus:outline-none focus:border-[#20d8e2] font-light"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 font-light italic">
                    * Al rellenar estos datos, nuestro sistema te registrará automáticamente para obsequiarte sorpresas en tu cumpleaños (descuentos extra, cupones o envíos gratis).
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#0c8f97] hover:bg-[#0a787f] text-white font-black flex items-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Datos de Perfil</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Direcciones y Agencias para Despachos</h4>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                {currentUser?.address ? (
                  <div className="flex items-start justify-between p-4 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        Ubicación Registrada en su Perfil
                      </div>
                      <div className="text-slate-600 font-light text-xs">
                        📍 <strong>Estado:</strong> {currentUser.state} | <strong>Ciudad:</strong> {currentUser.city}
                      </div>
                      <div className="text-slate-500 font-light text-xs">
                        🏠 <strong>Dirección/Oficina:</strong> {currentUser.address}
                      </div>
                      {currentUser.rif && (
                        <div className="text-slate-500 font-light text-xs">
                          📄 <strong>RIF:</strong> {currentUser.rif}
                        </div>
                      )}
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold rounded-lg shrink-0">Activo</span>
                  </div>
                ) : (
                  <div className="p-8 text-center space-y-3 bg-white rounded-2xl border border-slate-100">
                    <MapPin className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-slate-500 font-light">Aún no has registrado ninguna dirección en tu perfil.</p>
                    <p className="text-xs text-[#0c8f97]">Completa tu perfil o regístralos al procesar un despacho para habilitar el llenado automático instantáneo.</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer"
          >
            Cerrar Panel
          </button>
        </div>

      </div>
    </div>
  );
};
