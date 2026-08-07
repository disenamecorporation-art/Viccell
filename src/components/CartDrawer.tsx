import React from 'react';
import { X, ShoppingCart, Trash2, MessageCircle } from 'lucide-react';
import { CartItem, StoreMode } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  storeMode: StoreMode;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  storeMode,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalUSD = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const buildCartWhatsAppMessage = () => {
    let msg = `🛒 PEDIDO DE CARRITO - VICCELL (${storeMode.toUpperCase()})\n\n`;
    cartItems.forEach((item, i) => {
      msg += `${i + 1}. ${item.product.title}\n` +
        `   • SKU: ${item.product.sku}\n` +
        `   • Cantidad: ${item.quantity} uds\n` +
        `   • P.Unit: $${item.unitPrice.toFixed(2)} | Subtotal: $${(item.unitPrice * item.quantity).toFixed(2)}\n\n`;
    });

    msg += `💵 TOTAL USD: $${totalUSD.toFixed(2)}\n\n`;
    msg += `Hola Viccell, quisiera formalizar esta orden de pedido. Quedo atento a la confirmación de disponibilidad para despachar.`;

    return `https://wa.me/584128006426?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex sm:pl-10 pl-0">
        <div className="w-full sm:w-96 max-w-full sm:max-w-md bg-slate-900/95 text-white shadow-2xl border-l border-white/15 backdrop-blur-2xl flex flex-col justify-between h-full">
          
          {/* Cart Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#20d8e2]/20 border border-[#20d8e2]/30 rounded-2xl text-[#20d8e2] backdrop-blur-md">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Carrito de Repuestos</h2>
                <p className="text-xs text-slate-400 font-light">
                  {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en modo{' '}
                  <span className="text-[#20d8e2] uppercase font-extrabold">{storeMode}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-2xl hover:bg-white/10 border border-transparent hover:border-white/15 transition-all hover-bounce cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const itemSubtotal = item.unitPrice * item.quantity;
                return (
                  <div 
                    key={item.product.id}
                    className="bg-white/5 p-3.5 sm:p-4 rounded-3xl border border-white/10 flex items-start gap-3 relative group backdrop-blur-md hover:border-white/20 transition-all"
                  >
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.title} 
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover bg-slate-950 flex-shrink-0 border border-white/10"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono font-bold text-[#20d8e2] bg-[#20d8e2]/20 px-2 py-0.5 rounded border border-[#20d8e2]/30">
                          {item.product.sku}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                          title="Eliminar del carrito"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-white truncate leading-tight mt-1">
                        {item.product.title}
                      </h4>

                      <div className="text-[11px] text-slate-400 mt-1 font-light">
                        P.Unit: <strong className="text-slate-200 font-semibold">${item.unitPrice.toFixed(2)}</strong>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                        <div className="flex items-center bg-slate-950 rounded-xl border border-white/10 p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-6 h-6 text-slate-400 hover:text-white flex items-center justify-center font-bold text-xs cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-black text-[#20d8e2]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-6 h-6 text-slate-400 hover:text-white flex items-center justify-center font-bold text-xs cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-black text-white">
                          ${itemSubtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 space-y-3">
                <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-300">Tu carrito está vacío</h3>
                <p className="text-xs text-slate-500 font-light">
                  Explora el catálogo e introduce repuestos para cotizar al mayor o detal.
                </p>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-white/10 bg-slate-950/90 space-y-4 backdrop-blur-md shrink-0">
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-sm font-bold text-slate-200">
                  <span>Total USD:</span>
                  <span className="text-xl font-black text-[#20d8e2]">${totalUSD.toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                <a
                  href={buildCartWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl bg-[#20d8e2] hover:bg-[#1bc6cf] text-slate-950 font-black text-xs flex items-center justify-center gap-2 backdrop-blur-xl shadow-xl shadow-[#20d8e2]/20 transition-all duration-300 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Enviar Pedido por WhatsApp</span>
                </a>

                <button
                  onClick={onClearCart}
                  className="w-full py-2 text-slate-500 hover:text-slate-300 text-xs text-center font-medium cursor-pointer"
                >
                  Vaciar Carrito
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
