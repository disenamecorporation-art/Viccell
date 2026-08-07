import React, { useState } from 'react';
import { ShoppingCart, Check, MessageCircle, Flame, ArrowRight } from 'lucide-react';
import { Product, StoreMode } from '../types';

interface BestSellersProps {
  products: Product[];
  storeMode: StoreMode;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, mode: StoreMode) => void;
  onNavigateToTab: (tab: any, mode?: StoreMode) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  storeMode,
  onSelectProduct,
  onAddToCart,
  onNavigateToTab,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const bestSellers = products.filter(p => p.isHighRotation).slice(0, 4);
  const displayProducts = bestSellers.length > 0 ? bestSellers : products.slice(0, 4);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const qty = storeMode === 'mayorista' ? product.minWholesaleQty : 1;
    onAddToCart(product, qty, storeMode);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const handleWhatsApp = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const qty = storeMode === 'mayorista' ? product.minWholesaleQty : 1;
    const price = storeMode === 'mayorista' ? product.wholesalePrices[0].pricePerUnit : product.retailPrice;
    const msg = `Hola Viccell, me interesa de los más vendidos:\n${product.title}\nSKU: ${product.sku} - $${price.toFixed(2)}`;
    window.open(`https://wa.me/584128006426?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="py-10 bg-slate-50 border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
              <span>Productos Más Vendidos</span>
            </h2>
            <p className="text-slate-500 font-light text-xs sm:text-sm">
              Insumos y repuestos con mayor salida en talleres de reparación
            </p>
          </div>

          <button
            onClick={() => onNavigateToTab('tienda-minorista', 'minorista')}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Ver Tienda Minorista</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0ebec8]" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayProducts.map((product) => {
            const wholesalePrice = product.wholesalePrices[0].pricePerUnit;
            const retailPrice = product.retailPrice;
            const price = storeMode === 'mayorista' ? wholesalePrice : retailPrice;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer space-y-3 group"
              >
                <div className="space-y-3">
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-1 bg-amber-500 text-slate-950 text-[10px] font-black rounded-lg uppercase tracking-wider">
                      Más Vendido
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug line-clamp-2">
                      {product.title}
                    </h3>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-[#ca8a04] tracking-tight">
                        ${price.toFixed(2)}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {storeMode === 'mayorista' ? `(${product.minWholesaleQty}+ uds)` : 'USD'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={(e) => handleAdd(e, product)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                        addedId === product.id
                          ? 'bg-emerald-500 text-white font-black'
                          : 'bg-amber-400 hover:bg-amber-500 text-slate-950 font-black'
                      }`}
                    >
                      {addedId === product.id ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                      <span>{addedId === product.id ? '¡Listo!' : 'Agregar'}</span>
                    </button>

                    <button
                      onClick={(e) => handleWhatsApp(e, product)}
                      className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Pedir</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
