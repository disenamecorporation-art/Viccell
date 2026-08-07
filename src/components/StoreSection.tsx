import React, { useState, useEffect, useMemo } from 'react';
import { Search, Store, Building2, ShoppingCart, MessageCircle, Check, SlidersHorizontal, ChevronDown, ChevronRight, X, Sparkles } from 'lucide-react';
import { Product, StoreMode, Brand, Category } from '../types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { getStoredCategories, CategoryWithSubs } from '../data/categories';

interface StoreSectionProps {
  storeMode: StoreMode;
  setStoreMode: (mode: StoreMode) => void;
  products?: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, mode: StoreMode) => void;
}

interface SubCategory {
  name: string;
  count?: number;
}


const BRANDS: (Brand | 'Todas')[] = [
  'Todas',
  'Samsung',
  'Xiaomi',
  'Tecno',
  'Infinix',
  'Apple',
  'Motorola',
  'Huawei',
  'Universal',
];

export const StoreSection: React.FC<StoreSectionProps> = ({
  storeMode,
  setStoreMode,
  products = DEFAULT_PRODUCTS,
  onSelectProduct,
  onAddToCart,
}) => {
  const [categoriesWithSubs, setCategoriesWithSubs] = useState<CategoryWithSubs[]>(getStoredCategories());

  useEffect(() => {
    const handleUpdate = () => {
      setCategoriesWithSubs(getStoredCategories());
    };
    window.addEventListener('viccell_categories_updated', handleUpdate);
    return () => window.removeEventListener('viccell_categories_updated', handleUpdate);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<Brand | 'Todas'>('Todas');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todas'>('Todas');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchesSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesBrand = selectedBrand === 'Todas' || p.brand === selectedBrand;
      const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
      
      const matchesSub = !selectedSubCategory || p.title.toLowerCase().includes(selectedSubCategory.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(selectedSubCategory.toLowerCase()));

      return matchesSearch && matchesBrand && matchesCategory && matchesSub;
    });

    // Sorting
    return list.sort((a, b) => {
      const priceA = storeMode === 'mayorista' ? a.wholesalePrices[0].pricePerUnit : a.retailPrice;
      const priceB = storeMode === 'mayorista' ? b.wholesalePrices[0].pricePerUnit : b.retailPrice;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0; // featured
    });
  }, [products, searchQuery, selectedBrand, selectedCategory, selectedSubCategory, sortBy, storeMode]);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const qty = storeMode === 'mayorista' ? product.minWholesaleQty : 1;
    onAddToCart(product, qty, storeMode);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1200);
  };

  const handleWhatsApp = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const qty = storeMode === 'mayorista' ? product.minWholesaleQty : 1;
    const price = storeMode === 'mayorista' ? product.wholesalePrices[0].pricePerUnit : product.retailPrice;
    const modeName = storeMode === 'mayorista' ? 'Mayorista' : 'Minorista';
    
    const message = `Hola Viccell, me interesa:\n${product.title}\nSKU: ${product.sku}\nModo: ${modeName} (${qty} uds) - $${price.toFixed(2)}`;
    window.open(`https://wa.me/584128006426?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="tienda" className="py-10 bg-slate-50 text-slate-900 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Store Switcher */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20d8e2]/10 text-[#0c8f97] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Catálogo Oficial Viccell</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight text-slate-900">
              {storeMode === 'mayorista' ? 'Tienda Mayorista' : 'Tienda Minorista'}
            </h2>
            <p className="text-slate-500 font-light text-xs sm:text-sm">
              {storeMode === 'mayorista' ? 'Precios escalonados y lotes para talleres de reparación' : 'Venta al detal con disponibilidad inmediata'}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setStoreMode('mayorista')}
              className={`px-5 py-3 rounded-xl flex items-center gap-2 font-bold text-xs sm:text-sm cursor-pointer transition-all ${
                storeMode === 'mayorista'
                  ? 'bg-[#20d8e2] text-slate-950 shadow-md font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Mayorista</span>
            </button>

            <button
              onClick={() => setStoreMode('minorista')}
              className={`px-5 py-3 rounded-xl flex items-center gap-2 font-bold text-xs sm:text-sm cursor-pointer transition-all ${
                storeMode === 'minorista'
                  ? 'bg-[#20d8e2] text-slate-950 shadow-md font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Minorista</span>
            </button>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="flex lg:hidden justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
          <span className="text-xs font-medium text-slate-600">Filtros y Categorías WooCommerce</span>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{mobileFilterOpen ? 'Ocultar Filtros' : 'Filtrar Catálogo'}</span>
          </button>
        </div>

        {/* Main WooCommerce Layout (Sidebar + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar (Categories, Subcategories, Brands) */}
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6 lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs h-fit`}>
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-sm font-bold tracking-wider uppercase text-slate-900">Categorías</h3>
              {selectedCategory !== 'Todas' && (
                <button
                  onClick={() => { setSelectedCategory('Todas'); setSelectedSubCategory(null); }}
                  className="text-xs text-[#0c8f97] hover:underline font-medium cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Categories & Subcategories Tree */}
            <div className="space-y-3 text-xs">
              <button
                onClick={() => { setSelectedCategory('Todas'); setSelectedSubCategory(null); }}
                className={`w-full text-left py-2 px-3 rounded-xl font-medium transition-colors cursor-pointer flex justify-between items-center ${
                  selectedCategory === 'Todas' ? 'bg-[#20d8e2]/20 text-[#0c8f97] font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>Todas las Categorías</span>
                <span className="text-slate-400 font-light">({products.length})</span>
              </button>

              {categoriesWithSubs.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <div key={cat.name} className="space-y-1">
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setSelectedSubCategory(null);
                      }}
                      className={`w-full text-left py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        isSelected ? 'bg-[#20d8e2] text-slate-950 font-black shadow-xs' : 'text-slate-700 hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {isSelected ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                    </button>

                    {/* Subcategories (WooCommerce style sub-list) */}
                    {isSelected && (
                      <div className="pl-4 space-y-1 pt-1 pb-2 border-l-2 border-[#20d8e2] ml-2">
                        <button
                          onClick={() => setSelectedSubCategory(null)}
                          className={`w-full text-left py-1.5 px-2 rounded-lg cursor-pointer ${
                            !selectedSubCategory ? 'text-[#0c8f97] font-bold' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          • Ver todo en {cat.name}
                        </button>
                        {cat.subs.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSubCategory(sub)}
                            className={`w-full text-left py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${
                              selectedSubCategory === sub ? 'text-[#0c8f97] font-bold bg-slate-100' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            - {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Brand Filter */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h3 className="text-sm font-bold tracking-wider uppercase text-slate-900">Filtrar por Marca</h3>
              <div className="space-y-1 text-xs">
                {BRANDS.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`w-full text-left py-2 px-3 rounded-xl cursor-pointer transition-colors flex justify-between items-center ${
                      selectedBrand === brand ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{brand}</span>
                    {selectedBrand === brand && <Check className="w-3 h-3 text-[#20d8e2]" />}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Right Product Listing Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Search and Sort Toolbar */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar repuesto, SKU o modelo..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#20d8e2] font-light"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs text-slate-500 font-light">
                  Mostrando <strong className="text-slate-900">{filteredProducts.length}</strong> resultados
                </span>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-2xl px-4 py-3 font-medium cursor-pointer focus:outline-none focus:border-[#20d8e2]"
                >
                  <option value="featured">Ordenar por: Destacados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name">Nombre: A - Z</option>
                </select>
              </div>
            </div>

            {/* Active Filters Badges */}
            {(selectedCategory !== 'Todas' || selectedSubCategory || selectedBrand !== 'Todas' || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-slate-200 text-xs">
                <span className="text-slate-400">Filtros activos:</span>
                {selectedCategory !== 'Todas' && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg flex items-center gap-1 font-medium">
                    Categoría: {selectedCategory}
                    <button onClick={() => setSelectedCategory('Todas')}><X className="w-3 h-3 hover:text-rose-600" /></button>
                  </span>
                )}
                {selectedSubCategory && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg flex items-center gap-1 font-medium">
                    Subcategoría: {selectedSubCategory}
                    <button onClick={() => setSelectedSubCategory(null)}><X className="w-3 h-3 hover:text-rose-600" /></button>
                  </span>
                )}
                {selectedBrand !== 'Todas' && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg flex items-center gap-1 font-medium">
                    Marca: {selectedBrand}
                    <button onClick={() => setSelectedBrand('Todas')}><X className="w-3 h-3 hover:text-rose-600" /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg flex items-center gap-1 font-medium">
                    Búsqueda: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}><X className="w-3 h-3 hover:text-rose-600" /></button>
                  </span>
                )}
                <button
                  onClick={() => { setSelectedCategory('Todas'); setSelectedSubCategory(null); setSelectedBrand('Todas'); setSearchQuery(''); }}
                  className="text-rose-600 hover:underline font-semibold ml-auto cursor-pointer"
                >
                  Restablecer todo
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-slate-800">No se encontraron productos</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Prueba cambiando los filtros de categoría, marca o términos de búsqueda.
                </p>
                <button
                  onClick={() => { setSelectedCategory('Todas'); setSelectedSubCategory(null); setSelectedBrand('Todas'); setSearchQuery(''); }}
                  className="px-6 py-2.5 rounded-xl bg-[#20d8e2] text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Ver todos los repuestos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => {
                  const wholesalePrice = product.wholesalePrices[0].pricePerUnit;
                  const retailPrice = product.retailPrice;
                  const displayPrice = storeMode === 'mayorista' ? wholesalePrice : retailPrice;

                  return (
                    <div
                      key={product.id}
                      onClick={() => onSelectProduct(product)}
                      className="bg-white border border-slate-200/90 rounded-2xl p-4 hover:border-[#20d8e2] hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-3 group"
                    >
                      <div className="space-y-3">
                        <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="text-[10px] text-[#0c8f97] font-semibold tracking-wider uppercase">
                            {product.brand} • {product.category}
                          </div>
                          
                          {/* PRODUCT TITLE: COMPACT & FONT-SEMIBOLD */}
                          <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#0c8f97] transition-colors">
                            {product.title}
                          </h3>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 space-y-3">
                        <div>
                          {/* PRICE: COMPACT & ML YELLOW */}
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl sm:text-3xl font-semibold text-[#ca8a04] tracking-tight">
                              ${displayPrice.toFixed(2)}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              {storeMode === 'mayorista' ? `(Mín. ${product.minWholesaleQty})` : 'USD'}
                            </span>
                          </div>
                          {storeMode === 'mayorista' && product.wholesalePrices[1] && (
                            <div className="text-[10px] text-emerald-600 font-medium pt-0.5">
                              Mayor: ${product.wholesalePrices[1].pricePerUnit.toFixed(2)} ({product.wholesalePrices[1].minWholesaleQty || '100+'}+)
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={(e) => handleAdd(e, product)}
                            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all shadow-xs ${
                              addedProductId === product.id
                                ? 'bg-emerald-500 text-white font-black'
                                : 'bg-amber-400 hover:bg-amber-500 text-slate-950 font-black'
                            }`}
                          >
                            {addedProductId === product.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-white" />
                                <span>¡Listo!</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-3.5 h-3.5 text-slate-950" />
                                <span>Agregar</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={(e) => handleWhatsApp(e, product)}
                            className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all shadow-xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-[#20d8e2]" />
                            <span>WhatsApp</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
