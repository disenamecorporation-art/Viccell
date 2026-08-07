import React, { useState } from 'react';
import { X, MessageCircle, ShoppingCart, Check } from 'lucide-react';
import { Product, StoreMode } from '../types';

interface ProductModalProps {
  product: Product | null;
  storeMode: StoreMode;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, mode: StoreMode) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  storeMode,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Initial quantity based on mode
  const initialQty = storeMode === 'mayorista' ? product.minWholesaleQty : 1;
  const [quantity, setQuantity] = useState<number>(initialQty);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Calculate unit price according to tier/mode
  const getWholesaleUnitPrice = (qty: number): number => {
    let unitP = product.wholesalePrices[0].pricePerUnit;
    for (const tier of product.wholesalePrices) {
      if (qty >= tier.minQty) {
        unitP = tier.pricePerUnit;
      }
    }
    return unitP;
  };

  const currentUnitPrice = storeMode === 'mayorista' 
    ? getWholesaleUnitPrice(quantity)
    : product.retailPrice;

  const totalPriceUSD = currentUnitPrice * quantity;

  const handleQtyChange = (delta: number) => {
    const min = storeMode === 'mayorista' ? product.minWholesaleQty : 1;
    setQuantity(prev => Math.max(min, prev + delta));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, storeMode);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  // WhatsApp link generator
  const buildWhatsAppMessage = () => {
    const modeLabel = storeMode === 'mayorista' ? 'Mayorista' : 'Minorista';
    const text = `Hola Viccell! Quisiera solicitar el siguiente pedido (${modeLabel}):\n\n` +
      `📦 Producto: ${product.title}\n` +
      `🏷️ SKU: ${product.sku}\n` +
      `🔢 Cantidad: ${quantity} unidades\n` +
      `💵 Precio Unitario: $${currentUnitPrice.toFixed(2)}\n` +
      `💰 Total: $${totalPriceUSD.toFixed(2)} USD\n\n` +
      `¿Tienen disponibilidad para despacho?`;
    
    return `https://wa.me/584128006426?text=${encodeURIComponent(text)}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      
      {/* Apple-Style White Glass Modal */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white/90 text-slate-900 border border-white/80 rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all cursor-pointer z-10"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Pure Image Display */}
          <div className="md:col-span-5 space-y-4">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-inner flex items-center justify-center">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Gallery thumbnails if multiple */}
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImageIndex === idx ? 'border-amber-500 scale-105 shadow-sm' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Clean & Minimal Details */}
          <div className="md:col-span-7 space-y-5">
            
            {/* Category Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-slate-100 text-slate-600 font-bold text-xs px-3 py-1 rounded-full border border-slate-200">
                {product.brand}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-snug tracking-tight">
              {product.title}
            </h2>

            {/* Price Tag without background */}
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-[#ca8a04] tracking-tight">
                ${currentUnitPrice.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                USD c/u
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Clean Quantity Selector & Subtotal */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Cantidad:</span>
                {storeMode === 'mayorista' && (
                  <span className="text-amber-800 font-semibold bg-amber-100 px-2.5 py-0.5 rounded-md">
                    Mínimo mayorista: {product.minWholesaleQty} uds
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center bg-white border border-slate-300 rounded-xl p-1 shadow-xs">
                  <button
                    onClick={() => handleQtyChange(-1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition-all cursor-pointer text-base"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-center font-black text-slate-900 bg-transparent text-sm focus:outline-none"
                  />
                  <button
                    onClick={() => handleQtyChange(1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition-all cursor-pointer text-base"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-500">Subtotal:</div>
                  <div className="text-xl font-black text-slate-900">
                    ${totalPriceUSD.toFixed(2)} USD
                  </div>
                </div>
              </div>
            </div>

            {/* Sleek Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleAddToCart}
                className={`py-3.5 px-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  addedSuccess
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-400 hover:bg-amber-500 text-slate-950'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>¡Agregado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Agregar al Carrito</span>
                  </>
                )}
              </button>

              <a
                href={buildWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 rounded-2xl bg-[#20d8e2] hover:bg-[#1bc6cf] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir por WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
