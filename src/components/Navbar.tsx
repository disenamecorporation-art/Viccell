import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Store, Building2, Home, User as UserIcon, LogOut, ShieldCheck, LogIn } from 'lucide-react';
import { StoreMode, ActiveTab, User } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  storeMode: StoreMode;
  setStoreMode: (mode: StoreMode) => void;
  cartCount: number;
  onOpenCart: () => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenAdminPanel: () => void;
  onOpenDashboard?: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  setStoreMode,
  cartCount,
  onOpenCart,
  currentUser,
  onOpenAuth,
  onOpenAdminPanel,
  onOpenDashboard,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabSelect = (tab: ActiveTab, mode?: StoreMode) => {
    if (mode) {
      setStoreMode(mode);
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950 text-white border-b border-slate-800 shadow-xl font-['Montserrat',sans-serif]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-2">
          
          {/* Brand Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer py-1" 
            onClick={() => handleTabSelect('home')}
          >
            <img 
              src="https://i.postimg.cc/FzxhJP5t/LOGO-VICELL-WEB.png" 
              alt="Logo Viccell" 
              className="h-12 sm:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Center Navigation Links (Montserrat Font) */}
          <nav className="hidden xl:flex items-center space-x-1 font-bold text-xs uppercase tracking-wider text-slate-300 font-['Montserrat',sans-serif]">
            <button 
              onClick={() => handleTabSelect('home')} 
              className={`px-3 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'home' ? 'bg-[#20d8e2] text-slate-950 font-black' : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              Inicio
            </button>

            <button 
              onClick={() => handleTabSelect('tienda-mayorista', 'mayorista')} 
              className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tienda-mayorista' ? 'bg-[#20d8e2] text-slate-950 font-black' : 'bg-slate-900 hover:bg-slate-800 text-[#20d8e2] border border-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Tienda Mayorista
            </button>

            <button 
              onClick={() => handleTabSelect('tienda-minorista', 'minorista')} 
              className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tienda-minorista' ? 'bg-[#20d8e2] text-slate-950 font-black' : 'bg-slate-900 hover:bg-slate-800 text-[#20d8e2] border border-slate-800'
              }`}
            >
              <Store className="w-4 h-4" />
              Tienda Minorista
            </button>

            <button 
              onClick={() => handleTabSelect('servicios')} 
              className={`px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'servicios' ? 'bg-[#20d8e2] text-slate-950 font-black' : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              Importaciones
            </button>

            <button 
              onClick={() => handleTabSelect('envios')} 
              className={`px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'envios' ? 'bg-[#20d8e2] text-slate-950 font-black' : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              Despachos
            </button>

            <button 
              onClick={() => handleTabSelect('tracking')} 
              className={`px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'tracking' ? 'bg-[#20d8e2] text-slate-950 font-black' : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              Rastrear Orden
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Animated Bouncing Cart Button */}
            <button
              onClick={onOpenCart}
              className={`relative p-2.5 sm:p-3 rounded-2xl bg-[#20d8e2] hover:bg-[#1bc5cf] text-slate-950 shadow-lg transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 font-black text-xs shrink-0 ${
                cartCount > 0 ? 'animate-cart-bounce' : 'hover:animate-cart-bounce'
              }`}
              aria-label="Ver Carrito de Compras"
            >
              <ShoppingCart className="w-5 h-5 text-slate-950" />
              <span className="hidden sm:inline">Carrito</span>
              {cartCount > 0 && (
                <span className="bg-slate-950 text-[#20d8e2] text-[10px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded-full border border-[#20d8e2]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth / User / Admin Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                {currentUser.role === 'admin' && (
                  <button
                    onClick={onOpenAdminPanel}
                    className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer animate-pulse"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="hidden sm:inline">Admin</span>
                  </button>
                )}

                <button
                  onClick={onOpenDashboard}
                  className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3.5 py-2 rounded-xl text-xs cursor-pointer transition-colors"
                  title="Abrir Mi Dashboard"
                >
                  <UserIcon className="w-4 h-4 text-[#20d8e2]" />
                  <span className="font-bold text-slate-200">{currentUser.name.split(' ')[0]}</span>
                </button>

                <button
                  onClick={onLogout}
                  className="p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs flex items-center gap-1.5 sm:gap-2 shadow-md transition-all cursor-pointer shrink-0"
              >
                <LogIn className="w-4 h-4 text-[#20d8e2]" />
                <span className="hidden min-[380px]:inline">Ingresar</span>
              </button>
            )}

            {/* Mobile Burger Menu Toggle Button */}
            <div className="flex xl:hidden items-center shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0 min-w-[40px] min-h-[40px]"
                aria-label="Abrir Menú de Navegación"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#20d8e2]" /> : <Menu className="w-6 h-6 text-[#20d8e2]" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation (Montserrat Font) */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 font-['Montserrat',sans-serif]">
          <div className="flex flex-col space-y-2 font-bold text-slate-200 text-sm">
            <button 
              onClick={() => handleTabSelect('home')} 
              className={`text-left py-3 px-4 rounded-xl flex items-center gap-2.5 ${
                activeTab === 'home' ? 'bg-[#20d8e2] text-slate-950 font-black' : 'hover:bg-slate-900'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Inicio</span>
            </button>

            <button 
              onClick={() => handleTabSelect('tienda-mayorista', 'mayorista')} 
              className={`text-left py-3 px-4 rounded-xl flex items-center gap-2.5 ${
                activeTab === 'tienda-mayorista' ? 'bg-[#20d8e2] text-slate-950 font-black' : 'hover:bg-slate-900 text-[#20d8e2]'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>Tienda Mayorista</span>
            </button>

            <button 
              onClick={() => handleTabSelect('tienda-minorista', 'minorista')} 
              className={`text-left py-3 px-4 rounded-xl flex items-center gap-2.5 ${
                activeTab === 'tienda-minorista' ? 'bg-[#20d8e2] text-slate-950 font-black' : 'hover:bg-slate-900 text-[#20d8e2]'
              }`}
            >
              <Store className="w-5 h-5" />
              <span>Tienda Minorista</span>
            </button>

            <button 
              onClick={() => handleTabSelect('servicios')} 
              className={`text-left py-3 px-4 rounded-xl flex items-center gap-2.5 ${
                activeTab === 'servicios' ? 'bg-[#20d8e2] text-slate-950 font-black' : 'hover:bg-slate-900'
              }`}
            >
              <span>Importaciones Directas</span>
            </button>

            <button 
              onClick={() => handleTabSelect('envios')} 
              className={`text-left py-3 px-4 rounded-xl flex items-center gap-2.5 ${
                activeTab === 'envios' ? 'bg-[#20d8e2] text-slate-950 font-black' : 'hover:bg-slate-900'
              }`}
            >
              <span>Envíos & Despacho</span>
            </button>

            <button 
              onClick={() => handleTabSelect('tracking')} 
              className={`text-left py-3 px-4 rounded-xl flex items-center gap-2.5 ${
                activeTab === 'tracking' ? 'bg-[#20d8e2] text-slate-950 font-black' : 'hover:bg-slate-900'
              }`}
            >
              <span>Rastrear Orden</span>
            </button>

            {currentUser && (
              <button
                onClick={() => { onOpenDashboard?.(); setMobileMenuOpen(false); }}
                className="text-left py-3 px-4 rounded-xl bg-slate-900 text-white font-bold flex items-center gap-2.5"
              >
                <UserIcon className="w-5 h-5 text-[#20d8e2]" />
                <span>Mi Cuenta ({currentUser.name})</span>
              </button>
            )}

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => { onOpenAdminPanel(); setMobileMenuOpen(false); }}
                className="text-left py-3 px-4 rounded-xl bg-amber-500/20 text-amber-300 font-bold flex items-center gap-2.5"
              >
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>Panel Administrativo</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
