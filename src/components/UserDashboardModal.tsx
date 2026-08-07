import React, { useState } from 'react';
import { X, Package, User, ShoppingBag, MapPin, ShieldCheck, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { User as UserType, TrackingOrder, CartItem } from '../types';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType | null;
  orders: TrackingOrder[];
  cartItems: CartItem[];
  onNavigateToTracking: (code: string) => void;
  onNavigateToStore: () => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  orders,
  cartItems,
  onNavigateToTracking,
  onNavigateToStore
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'cart' | 'addresses'>('orders');

  if (!isOpen) return null;

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
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Datos de Cuenta</h4>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-500 block mb-1 font-medium">Nombre Completo</label>
                    <input type="text" readOnly value={currentUser ? currentUser.name : 'Cliente Viccell'} className="w-full p-3 bg-white border border-slate-200 rounded-xl font-light" />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1 font-medium">Correo Electrónico</label>
                    <input type="email" readOnly value={currentUser ? currentUser.email : 'cliente@viccell.com'} className="w-full p-3 bg-white border border-slate-200 rounded-xl font-light" />
                  </div>
                </div>
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Rol de Usuario</label>
                  <input type="text" readOnly value={currentUser?.role === 'admin' ? 'Administrador Especial' : 'Cliente Mayorista / Minorista'} className="w-full p-3 bg-white border border-slate-200 rounded-xl font-light" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Agencias de Envío Registradas</h4>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900">MRW Oficina Maracay Centro</div>
                    <div className="text-slate-500 font-light">Cobro en Destino • Estado Aragua</div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg">Principal</span>
                </div>
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
