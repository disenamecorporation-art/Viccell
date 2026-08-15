import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, ShieldCheck, Package, Save, Clock, CheckCircle2, FolderTree, Layers, Landmark, BookOpen } from 'lucide-react';
import { Product, Brand, Category, TrackingOrder, TrackingPhase, PaymentMethodConfig } from '../types';
import { getStoredCategories, saveStoredCategories, CategoryWithSubs } from '../data/categories';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (newProduct: Omit<Product, 'id'>) => void;
  onEditProduct: (updatedProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  trackingOrders: TrackingOrder[];
  onAddTrackingOrder: (newOrder: Omit<TrackingOrder, 'id'>) => void;
  onUpdateTrackingOrder: (updatedOrder: TrackingOrder) => void;
  onDeleteTrackingOrder: (orderId: string) => void;
  paymentMethods: PaymentMethodConfig;
  onUpdatePaymentMethods: (methods: PaymentMethodConfig) => void;
}

const BRANDS: Brand[] = [
  'Samsung',
  'Xiaomi',
  'Tecno',
  'Infinix',
  'Apple',
  'Motorola',
  'Huawei',
  'Universal',
];

const CATEGORIES: Category[] = [
  'Pines Micro-USB',
  'Pines Tipo-C',
  'Conectores FPC',
  'Pantallas / Módulos',
  'ICs & Placa',
  'Cables & Insumos',
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  trackingOrders,
  onAddTrackingOrder,
  onUpdateTrackingOrder,
  onDeleteTrackingOrder,
  paymentMethods,
  onUpdatePaymentMethods,
}) => {
  if (!isOpen) return null;

  const [activeTabMain, setActiveTabMain] = useState<'products' | 'tracking' | 'categories' | 'payment-methods'>('tracking');
  const [activeSubTab, setActiveSubTab] = useState<'list' | 'create'>('list');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Categories & Subcategories State
  const [categoriesList, setCategoriesList] = useState<CategoryWithSubs[]>(getStoredCategories());
  const [newCatName, setNewCatName] = useState('');
  const [newSubName, setNewSubName] = useState<{ [catName: string]: string }>({});

  // Payment Methods Admin form state
  const [payForm, setPayForm] = useState<PaymentMethodConfig>(paymentMethods);
  const [paySavedMessage, setPaySavedMessage] = useState(false);

  useEffect(() => {
    setPayForm(paymentMethods);
  }, [paymentMethods]);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePaymentMethods(payForm);
    setPaySavedMessage(true);
    setTimeout(() => setPaySavedMessage(false), 4000);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const catName = newCatName.trim();
    if (categoriesList.some(c => c.name.toLowerCase() === catName.toLowerCase())) {
      alert('La categoría ya existe');
      return;
    }
    const updated = [...categoriesList, { name: catName, subs: [] }];
    setCategoriesList(updated);
    saveStoredCategories(updated);
    setNewCatName('');
  };

  const handleDeleteCategory = (catName: string) => {
    if (confirm(`¿Estás seguro de eliminar la categoría "${catName}" y todas sus subcategorías?`)) {
      const updated = categoriesList.filter(c => c.name !== catName);
      setCategoriesList(updated);
      saveStoredCategories(updated);
    }
  };

  const handleAddSubCategory = (catName: string, e: React.FormEvent) => {
    e.preventDefault();
    const subText = newSubName[catName]?.trim();
    if (!subText) return;

    const updated = categoriesList.map(c => {
      if (c.name === catName) {
        if (c.subs.includes(subText)) return c;
        return { ...c, subs: [...c.subs, subText] };
      }
      return c;
    });
    setCategoriesList(updated);
    saveStoredCategories(updated);
    setNewSubName({ ...newSubName, [catName]: '' });
  };

  const handleDeleteSubCategory = (catName: string, subName: string) => {
    const updated = categoriesList.map(c => {
      if (c.name === catName) {
        return { ...c, subs: c.subs.filter(s => s !== subName) };
      }
      return c;
    });
    setCategoriesList(updated);
    saveStoredCategories(updated);
  };

  // Product Form state
  const [form, setForm] = useState({
    sku: '',
    title: '',
    description: '',
    brand: 'Samsung' as Brand,
    category: categoriesList[0]?.name || 'Pines Tipo-C',
    subcategory: categoriesList[0]?.subs[0] || '',
    imageUrl: '',
    retailPrice: 2.50,
    wholesaleQty: 10,
    wholesalePrice: 0.50,
    isPopular: false,
    isHighRotation: true,
  });

  // Tracking Order Form state
  const [editingOrder, setEditingOrder] = useState<TrackingOrder | null>(null);
  const [orderForm, setOrderForm] = useState({
    code: '20517462',
    clientName: '',
    clientEmail: '',
    projectName: 'Importación Especial Viccell',
    phase: 'EN PROCESO' as TrackingPhase,
    itemsDescription: '50x Pines de Carga y Módulos',
    totalAmount: 500.00,
    notes: '',
  });

  const resetForm = () => {
    setForm({
      sku: '',
      title: '',
      description: '',
      brand: 'Samsung',
      category: categoriesList[0]?.name || 'Pines Tipo-C',
      subcategory: categoriesList[0]?.subs[0] || '',
      imageUrl: '',
      retailPrice: 2.50,
      wholesaleQty: 10,
      wholesalePrice: 0.50,
      isPopular: false,
      isHighRotation: true,
    });
    setEditingProduct(null);
  };

  const resetOrderForm = () => {
    setOrderForm({
      code: Math.floor(10000000 + Math.random() * 90000000).toString(),
      clientName: '',
      clientEmail: '',
      projectName: 'Proyecto de Importación',
      phase: 'COTIZADO',
      itemsDescription: '',
      totalAmount: 150.00,
      notes: '',
    });
    setEditingOrder(null);
  };

  const startEditOrder = (ord: TrackingOrder) => {
    setEditingOrder(ord);
    setOrderForm({
      code: ord.code,
      clientName: ord.clientName,
      clientEmail: ord.clientEmail,
      projectName: ord.projectName,
      phase: ord.phase,
      itemsDescription: ord.itemsDescription,
      totalAmount: ord.totalAmount,
      notes: ord.notes || '',
    });
    setActiveSubTab('create');
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      onUpdateTrackingOrder({
        ...editingOrder,
        code: orderForm.code,
        clientName: orderForm.clientName,
        clientEmail: orderForm.clientEmail,
        projectName: orderForm.projectName,
        phase: orderForm.phase,
        itemsDescription: orderForm.itemsDescription,
        totalAmount: Number(orderForm.totalAmount),
        notes: orderForm.notes,
        updatedAt: new Date().toISOString().split('T')[0],
      });
    } else {
      onAddTrackingOrder({
        code: orderForm.code || '20517462',
        clientName: orderForm.clientName || 'Cliente Viccell',
        clientEmail: orderForm.clientEmail || 'cliente@viccell.com',
        projectName: orderForm.projectName,
        phase: orderForm.phase,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        itemsDescription: orderForm.itemsDescription,
        totalAmount: Number(orderForm.totalAmount),
        notes: orderForm.notes,
      });
    }
    resetOrderForm();
    setActiveSubTab('list');
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      sku: product.sku,
      title: product.title,
      description: product.description,
      brand: product.brand,
      category: product.category,
      subcategory: (product as any).subcategory || categoriesList.find(c => c.name === product.category)?.subs[0] || '',
      imageUrl: product.images[0] || '',
      retailPrice: product.retailPrice,
      wholesaleQty: product.minWholesaleQty,
      wholesalePrice: product.wholesalePrices[0]?.pricePerUnit || 0.5,
      isPopular: product.isPopular || false,
      isHighRotation: product.isHighRotation || false,
    });
    setActiveSubTab('create');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        sku: form.sku,
        title: form.title,
        description: form.description,
        brand: form.brand,
        category: form.category,
        subcategory: form.subcategory,
        images: [form.imageUrl || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'],
        retailPrice: Number(form.retailPrice),
        minWholesaleQty: Number(form.wholesaleQty),
        wholesalePrices: [
          { minQty: Number(form.wholesaleQty), pricePerUnit: Number(form.wholesalePrice) }
        ],
        isPopular: form.isPopular,
        isHighRotation: form.isHighRotation,
      } as any;
      onEditProduct(updated);
    } else {
      const newProd: Omit<Product, 'id'> = {
        sku: form.sku || `SKU-${Date.now().toString().slice(-5)}`,
        title: form.title,
        description: form.description,
        brand: form.brand,
        category: form.category,
        subcategory: form.subcategory,
        images: [form.imageUrl || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'],
        retailPrice: Number(form.retailPrice),
        minWholesaleQty: Number(form.wholesaleQty),
        wholesalePrices: [
          { minQty: Number(form.wholesaleQty), pricePerUnit: Number(form.wholesalePrice) }
        ],
        compatibility: [form.brand],
        stock: 500,
        tags: [form.brand.toLowerCase(), form.category.toLowerCase(), form.subcategory.toLowerCase()].filter(Boolean),
        isPopular: form.isPopular,
        isHighRotation: form.isHighRotation,
      } as any;
      onAddProduct(newProd);
    }

    resetForm();
    setActiveSubTab('list');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn font-sans"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 text-white border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#20d8e2]/20 text-[#20d8e2] border border-[#20d8e2]/30 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Panel de Administrador Especial Viccell</h2>
            <p className="text-xs text-slate-400 font-light">Gestión de Tracking de Proyectos y Catálogo de Tienda</p>
          </div>
        </div>

        {/* Main Section Switcher: Tracking vs Products vs Categories */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 flex-wrap">
          <button
            onClick={() => { setActiveTabMain('tracking'); setActiveSubTab('list'); resetOrderForm(); }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTabMain === 'tracking' ? 'bg-[#20d8e2] text-slate-950 font-black shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Sistema de Tracking ({trackingOrders.length})</span>
          </button>

          <button
            onClick={() => { setActiveTabMain('products'); setActiveSubTab('list'); resetForm(); }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTabMain === 'products' ? 'bg-[#20d8e2] text-slate-950 font-black shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Catálogo de Productos ({products.length})</span>
          </button>

          <button
            onClick={() => { setActiveTabMain('categories'); }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTabMain === 'categories' ? 'bg-[#20d8e2] text-slate-950 font-black shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Categorías y Subcategorías ({categoriesList.length})</span>
          </button>

          <button
            onClick={() => { setActiveTabMain('payment-methods'); }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTabMain === 'payment-methods' ? 'bg-[#20d8e2] text-slate-950 font-black shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Métodos de Pago (Banco)</span>
          </button>
        </div>

        {/* Sub Tabs (List vs Create/Edit) - Only for Tracking and Products */}
        {activeTabMain !== 'categories' && activeTabMain !== 'payment-methods' && (
          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={() => {
                if (activeTabMain === 'tracking') resetOrderForm(); else resetForm();
                setActiveSubTab('list');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'list' ? 'bg-slate-800 text-[#20d8e2] border border-[#20d8e2]/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Ver Lista
            </button>

            <button
              onClick={() => {
                if (activeTabMain === 'tracking') resetOrderForm(); else resetForm();
                setActiveSubTab('create');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'create' ? 'bg-[#20d8e2] text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{activeTabMain === 'tracking' ? (editingOrder ? 'Editar Orden / Fase' : 'Crear Proyecto / Orden') : (editingProduct ? 'Editar Producto' : 'Crear Producto')}</span>
            </button>
          </div>
        )}

        {/* PAYMENT METHODS MANAGEMENT VIEW */}
        {activeTabMain === 'payment-methods' ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-2xl flex items-center gap-2">
              <Landmark className="w-4 h-4 shrink-0 animate-pulse" />
              <span>Gestión de Métodos de Pago Viccell. Aquí puede modificar los datos bancarios y cuentas de Binance en tiempo real si el banco presenta inconvenientes. Los cambios se reflejarán inmediatamente en la sección de facturación y envíos.</span>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              {paySavedMessage && (
                <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs rounded-xl flex items-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>¡Métodos de pago guardados y actualizados con éxito en todo el sistema!</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pago Movil */}
                <div className="p-5 bg-slate-800/50 border border-slate-700/60 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#20d8e2]/20 flex items-center justify-center text-[#20d8e2]">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-black text-white">1. Pago Móvil</h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Nombre del Titular:</label>
                      <input
                        type="text"
                        required
                        value={payForm.pagoMovil.titular}
                        onChange={(e) => setPayForm({
                          ...payForm,
                          pagoMovil: { ...payForm.pagoMovil, titular: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Cédula del Titular:</label>
                        <input
                          type="text"
                          required
                          value={payForm.pagoMovil.cedula}
                          onChange={(e) => setPayForm({
                            ...payForm,
                            pagoMovil: { ...payForm.pagoMovil, cedula: e.target.value }
                          })}
                          className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Teléfono:</label>
                        <input
                          type="text"
                          required
                          value={payForm.pagoMovil.phone}
                          onChange={(e) => setPayForm({
                            ...payForm,
                            pagoMovil: { ...payForm.pagoMovil, phone: e.target.value }
                          })}
                          className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Banco Receptivo:</label>
                      <input
                        type="text"
                        required
                        value={payForm.pagoMovil.banco}
                        onChange={(e) => setPayForm({
                          ...payForm,
                          pagoMovil: { ...payForm.pagoMovil, banco: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                      />
                    </div>
                  </div>
                </div>

                {/* Transferencia Bancaria */}
                <div className="p-5 bg-slate-800/50 border border-slate-700/60 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#20d8e2]/20 flex items-center justify-center text-[#20d8e2]">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-black text-white">2. Transferencia Bancaria Nacional</h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Banco Receptor:</label>
                      <input
                        type="text"
                        required
                        value={payForm.transferencia.banco}
                        onChange={(e) => setPayForm({
                          ...payForm,
                          transferencia: { ...payForm.transferencia, banco: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Nombre del Titular:</label>
                      <input
                        type="text"
                        required
                        value={payForm.transferencia.titular}
                        onChange={(e) => setPayForm({
                          ...payForm,
                          transferencia: { ...payForm.transferencia, titular: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Cédula / RIF Titular:</label>
                        <input
                          type="text"
                          required
                          value={payForm.transferencia.cedula}
                          onChange={(e) => setPayForm({
                            ...payForm,
                            transferencia: { ...payForm.transferencia, cedula: e.target.value }
                          })}
                          className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Número de Cuenta (20 Dígitos):</label>
                        <input
                          type="text"
                          required
                          maxLength={20}
                          value={payForm.transferencia.cuenta}
                          onChange={(e) => setPayForm({
                            ...payForm,
                            transferencia: { ...payForm.transferencia, cuenta: e.target.value }
                          })}
                          className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Binance */}
                <div className="p-5 bg-slate-800/50 border border-slate-700/60 rounded-2xl space-y-4 md:col-span-2">
                  <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#20d8e2]/20 flex items-center justify-center text-[#20d8e2]">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-black text-white">3. Cuenta Binance (Cripto USDT)</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Usuario / Correo de Binance:</label>
                      <input
                        type="text"
                        required
                        value={payForm.binance.usuario}
                        onChange={(e) => setPayForm({
                          ...payForm,
                          binance: { ...payForm.binance, usuario: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Enlace de Imagen QR de Binance:</label>
                      <input
                        type="text"
                        value={payForm.binance.qrUrl || ''}
                        onChange={(e) => setPayForm({
                          ...payForm,
                          binance: { ...payForm.binance, qrUrl: e.target.value }
                        })}
                        placeholder="https://i.postimg.cc/ydTgPJ7P/QRbinance.jpg"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#20d8e2] hover:bg-[#1bc6cf] text-slate-950 font-black flex items-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Métodos de Pago</span>
                </button>
              </div>
            </form>

            {/* Tutorial Paso a Paso */}
            <div className="mt-8 p-6 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-5">
              <div className="flex items-center gap-2 text-[#20d8e2] border-b border-slate-800 pb-3">
                <BookOpen className="w-5 h-5" />
                <h4 className="text-sm font-black uppercase tracking-wider">Manual de Operación: Configurar Métodos de Pago Bancarios</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-[11px] text-slate-300 leading-relaxed font-light">
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">1</span>
                    <span>Ubicar los Datos</span>
                  </div>
                  <p>Diríjase a la sección correspondiente del formulario según el método de pago que desea configurar: <strong className="text-[#20d8e2]">Pago Móvil</strong>, <strong className="text-[#20d8e2]">Transferencia Banesco</strong>, o <strong className="text-[#20d8e2]">Binance USDT</strong>.</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">2</span>
                    <span>Rellenar Campos</span>
                  </div>
                  <p>Haga clic dentro de cada cuadro de texto para escribir. Introduzca el Banco, Cédula o RIF del titular, número de teléfono o ID de billetera. Si tiene un código QR, suba la imagen a un servidor (ej. Postimages) y pegue el enlace directo terminado en .png o .jpg en <strong className="text-white">QR URL</strong>. Si no lo tiene, deje ese campo totalmente en blanco.</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">3</span>
                    <span>Guardar Cambios</span>
                  </div>
                  <p>Baje al final de esta pestaña y haga clic en el botón verde azulado que dice <strong className="text-white">"Guardar Métodos de Pago"</strong>. Espere un segundo a que aparezca la confirmación visual de que los datos fueron sincronizados en la base de datos.</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800/60 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">4</span>
                    <span>Verificación Final</span>
                  </div>
                  <p>Cualquier cliente que realice una orden de compra y avance al paso de "Reportar Pago" en el carrito, verá inmediatamente los nuevos datos de cuenta actualizados de forma dinámica.</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTabMain === 'categories' ? (
          <div className="space-y-6">
            <div className="p-4 bg-[#20d8e2]/10 border border-[#20d8e2]/30 text-[#20d8e2] text-xs font-bold rounded-2xl flex items-center gap-2">
              <FolderTree className="w-4 h-4 shrink-0" />
              <span>Gestión de Categorías y Subcategorías de la Tienda Viccell. Los cambios se reflejan inmediatamente en el catálogo de clientes.</span>
            </div>

            {/* Add Category Form */}
            <form onSubmit={handleAddCategory} className="p-4 bg-slate-800/60 border border-slate-700/80 rounded-2xl flex gap-3 items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Nueva Categoría Principal (ej. Flex y Displays)"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#20d8e2]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-[#20d8e2] hover:bg-[#1bc6cf] text-slate-950 font-black text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Categoría</span>
              </button>
            </form>

            {/* Categories List */}
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
              {categoriesList.map((cat) => (
                <div key={cat.name} className="p-4 bg-slate-800/40 border border-slate-700/60 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#20d8e2]" />
                      <h3 className="text-sm font-black text-white">{cat.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold">{cat.subs.length} subcategorías</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.name)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition-colors cursor-pointer"
                      title="Eliminar Categoría"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Subcategories list */}
                  <div className="pl-6 space-y-2 border-l-2 border-slate-700 ml-2">
                    {cat.subs.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No hay subcategorías registradas.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {cat.subs.map((sub) => (
                          <div key={sub} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300">
                            <span>{sub}</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteSubCategory(cat.name, sub)}
                              className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                              title="Eliminar subcategoría"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add SubCategory Form */}
                    <form onSubmit={(e) => handleAddSubCategory(cat.name, e)} className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder={`Nueva subcategoría para ${cat.name}...`}
                        value={newSubName[cat.name] || ''}
                        onChange={(e) => setNewSubName({ ...newSubName, [cat.name]: e.target.value })}
                        className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#20d8e2]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Añadir</span>
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>

            {/* Tutorial Paso a Paso */}
            <div className="mt-8 p-6 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-5">
              <div className="flex items-center gap-2 text-[#20d8e2] border-b border-slate-800 pb-3">
                <BookOpen className="w-5 h-5" />
                <h4 className="text-sm font-black uppercase tracking-wider">Manual de Operación: Crear y Clasificar Categorías de la Tienda</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-[11px] text-slate-300 leading-relaxed font-light">
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">1</span>
                    <span>Crear Categoría</span>
                  </div>
                  <p>Haga clic en la caja de texto superior que dice <em className="text-slate-400">"Nombre de la nueva categoría principal..."</em>, escriba la categoría (ej. <code className="text-white bg-slate-800 px-1 rounded">Micas</code>) y luego haga clic en el botón azul de la derecha que dice <strong className="text-[#20d8e2]">"Añadir Categoría Principal"</strong>.</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">2</span>
                    <span>Añadir Subcategorías</span>
                  </div>
                  <p>Busque la tarjeta que se acaba de crear abajo. Haga clic en la caja de texto interna que dice <em className="text-slate-400">"Nueva subcategoría..."</em>, escriba el modelo o detalle específico (ej. <code className="text-white bg-slate-800 px-1 rounded">Mica Gel Samsung</code>) y haga clic en el botón azul <strong className="text-white">"Añadir"</strong> que está dentro de esa misma tarjeta.</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">3</span>
                    <span>Eliminar Elementos</span>
                  </div>
                  <p>Si desea borrar una subcategoría errónea, haga clic en el botón de la equis roja <strong className="text-red-400 font-bold">"x"</strong> al lado de su nombre. Si desea borrar una categoría entera con todo lo que tiene adentro, haga clic en el botón rojo de la esquina derecha de la tarjeta que dice <strong className="text-red-400">"Eliminar Categoría"</strong>.</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800/60 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">4</span>
                    <span>Filtros Automáticos</span>
                  </div>
                  <p>¡Listo! Estas nuevas categorías y subcategorías aparecerán inmediatamente en la barra lateral izquierda de la tienda para que sus clientes puedan buscar repuestos de forma rápida.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
        /* TRACKING ORDERS MANAGEMENT VIEW */
        activeTabMain === 'tracking' ? (
          <div>
            {activeSubTab === 'list' ? (
              <div className="space-y-4">
                <div className="p-4 bg-[#20d8e2]/10 border border-[#20d8e2]/30 text-[#20d8e2] text-xs font-bold rounded-2xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Cree proyectos de importación y asigne fases: Cotizado (33.3%), En Proceso (66.6%) o Despachado (100%).</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300 border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="p-3">Código</th>
                        <th className="p-3">Cliente</th>
                        <th className="p-3">Proyecto</th>
                        <th className="p-3">Fase Actual</th>
                        <th className="p-3">Total ($)</th>
                        <th className="p-3 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {trackingOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3 font-mono font-bold text-[#20d8e2]">#{ord.code}</td>
                          <td className="p-3 font-bold text-white">{ord.clientName}</td>
                          <td className="p-3 text-slate-300">{ord.projectName}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                              ord.phase === 'DESPACHADO' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              ord.phase === 'EN PROCESO' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {ord.phase}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-white">${ord.totalAmount.toFixed(2)}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => startEditOrder(ord)}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#20d8e2] transition-colors cursor-pointer"
                                title="Editar Fase u Orden"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDeleteTrackingOrder(ord.id)}
                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                                title="Eliminar Orden"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Código de Tracking / Pedido (ej: 20517462):</label>
                    <input
                      type="text"
                      required
                      value={orderForm.code}
                      onChange={(e) => setOrderForm({ ...orderForm, code: e.target.value })}
                      placeholder="20517462"
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono font-bold focus:outline-none focus:border-[#20d8e2]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Fase del Proyecto:</label>
                    <select
                      value={orderForm.phase}
                      onChange={(e) => setOrderForm({ ...orderForm, phase: e.target.value as TrackingPhase })}
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#20d8e2]"
                    >
                      <option value="COTIZADO">COTIZADO (Fase 1 - 33.3%)</option>
                      <option value="EN PROCESO">EN PROCESO (Fase 2 - 66.6%)</option>
                      <option value="DESPACHADO">DESPACHADO (Fase 3 - 100% Verde)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Nombre del Cliente:</label>
                    <input
                      type="text"
                      required
                      value={orderForm.clientName}
                      onChange={(e) => setOrderForm({ ...orderForm, clientName: e.target.value })}
                      placeholder="Carlos Mendoza"
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Correo del Cliente:</label>
                    <input
                      type="email"
                      required
                      value={orderForm.clientEmail}
                      onChange={(e) => setOrderForm({ ...orderForm, clientEmail: e.target.value })}
                      placeholder="carlos@ejemplo.com"
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Nombre del Proyecto:</label>
                    <input
                      type="text"
                      required
                      value={orderForm.projectName}
                      onChange={(e) => setOrderForm({ ...orderForm, projectName: e.target.value })}
                      placeholder="Importación Lote Pines"
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Monto Total ($ USD):</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={orderForm.totalAmount}
                      onChange={(e) => setOrderForm({ ...orderForm, totalAmount: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Detalle de Artículos / Repuestos:</label>
                  <textarea
                    rows={2}
                    required
                    value={orderForm.itemsDescription}
                    onChange={(e) => setOrderForm({ ...orderForm, itemsDescription: e.target.value })}
                    placeholder="50x Pines Tipo-C Samsung A12, 20x Módulos OLED"
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Notas del Administrador:</label>
                  <input
                    type="text"
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                    placeholder="En tránsito aéreo aduanal con guía express..."
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => { resetOrderForm(); setActiveSubTab('list'); }}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-[#20d8e2] hover:bg-[#1bc6cf] text-slate-950 font-black flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingOrder ? 'Actualizar Orden & Fase' : 'Crear Proyecto y Código'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Tutorial Paso a Paso */}
            <div className="mt-8 p-6 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-5">
              <div className="flex items-center gap-2 text-[#20d8e2] border-b border-slate-800 pb-3">
                <BookOpen className="w-5 h-5" />
                <h4 className="text-sm font-black uppercase tracking-wider">Manual de Operación: Administrar Tracking de Importaciones</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-[11px] text-slate-300 leading-relaxed font-light">
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">1</span>
                    <span>Abrir Formulario</span>
                  </div>
                  <p>Haga clic en el botón <strong className="text-[#20d8e2]">"Crear Proyecto / Orden"</strong> ubicado en las sub-pestañas superiores. Si desea editar uno existente, busque la orden en la tabla de abajo y haga clic en el botón azul celeste con forma de lápiz (<strong className="text-[#20d8e2]">Editar</strong>).</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">2</span>
                    <span>Rellenar Información</span>
                  </div>
                  <p>Escriba el <strong className="text-white">Nombre del Cliente</strong>, el <strong className="text-white">Código de Seguimiento</strong> único que le asignará (ej. su número de cédula o cédula jurídica/guía), el <strong className="text-white">Detalle del Pedido</strong> (ej. <em>"Mano de obra, flexores y 300 pantallas"</em>), y seleccione la <strong className="text-[#20d8e2]">Fase actual</strong> (Cotizado 33%, En Proceso 66% o Despachado 100%).</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">3</span>
                    <span>Guardar y Publicar</span>
                  </div>
                  <p>Escriba novedades específicas en la sección <strong className="text-white">Notas del Administrador</strong> (ej. <em>"Contenedor en aduana de Maracay, entrega estimada el martes"</em>). Para guardar, haga clic en el botón azul inferior <strong className="text-white">"Crear Proyecto y Código"</strong> (o "Actualizar" si está editando).</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800/60 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">4</span>
                    <span>Consulta de Cliente</span>
                  </div>
                  <p>Informe a su cliente de su código asignado. El cliente ingresará este código en la caja de <strong className="text-[#20d8e2]">"Rastrea tu Pedido"</strong> de la página principal para visualizar su barra de avance y notas en tiempo real sin tener que registrarse.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* PRODUCTS MANAGEMENT VIEW */
          <div>
            {activeSubTab === 'list' ? (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300 border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="p-3">Imagen</th>
                        <th className="p-3">Título</th>
                        <th className="p-3">Marca / Cat</th>
                        <th className="p-3">P. Mayor</th>
                        <th className="p-3">P. Detal</th>
                        <th className="p-3 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3">
                            <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg border border-slate-700" />
                          </td>
                          <td className="p-3 font-bold text-white max-w-[200px] truncate">{p.title}</td>
                          <td className="p-3">
                            <span className="font-bold text-slate-200">{p.brand}</span>
                            <div className="text-[10px] text-[#20d8e2]">{p.category}</div>
                          </td>
                          <td className="p-3 font-bold text-[#20d8e2]">
                            ${p.wholesalePrices[0]?.pricePerUnit.toFixed(2)} ({p.minWholesaleQty}+)
                          </td>
                          <td className="p-3 font-bold text-amber-400">
                            ${p.retailPrice.toFixed(2)}
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => startEdit(p)}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                                title="Editar"
                              >
                                <Edit2 className="w-4 h-4 text-[#20d8e2]" />
                              </button>
                              <button
                                onClick={() => onDeleteProduct(p.id)}
                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">SKU:</label>
                    <input
                      type="text"
                      required
                      value={form.sku}
                      onChange={(e) => setForm({ ...form, sku: e.target.value })}
                      placeholder="PIN-TYPEC-01"
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Título del Producto:</label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Pin de Carga Tipo-C Samsung A12"
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Marca:</label>
                    <select
                      value={form.brand}
                      onChange={(e) => setForm({ ...form, brand: e.target.value as Brand })}
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#20d8e2]"
                    >
                      {BRANDS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Categoría:</label>
                    <select
                      value={form.category}
                      onChange={(e) => {
                        const newCat = e.target.value;
                        const found = categoriesList.find(c => c.name === newCat);
                        setForm({ 
                          ...form, 
                          category: newCat, 
                          subcategory: found?.subs[0] || '' 
                        });
                      }}
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#20d8e2]"
                    >
                      {categoriesList.map((c) => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Subcategoría:</label>
                    <select
                      value={form.subcategory}
                      onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#20d8e2]"
                    >
                      {(() => {
                        const currentCatObj = categoriesList.find(c => c.name === form.category);
                        const subs = currentCatObj ? currentCatObj.subs : [];
                        if (subs.length === 0) {
                          return <option value="">Sin subcategorías</option>;
                        }
                        return subs.map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ));
                      })()}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Precio al Detal ($):</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={form.retailPrice}
                      onChange={(e) => setForm({ ...form, retailPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Mínimo Lote Mayorista (Uds):</label>
                    <input
                      type="number"
                      required
                      value={form.wholesaleQty}
                      onChange={(e) => setForm({ ...form, wholesaleQty: parseInt(e.target.value) || 10 })}
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Precio Mayorista por Unidad ($):</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={form.wholesalePrice}
                      onChange={(e) => setForm({ ...form, wholesalePrice: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">URL de Imagen (Unsplash u otro):</label>
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Descripción:</label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-light focus:outline-none focus:border-[#20d8e2]"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-bold">
                    <input
                      type="checkbox"
                      checked={form.isPopular}
                      onChange={(e) => setForm({ ...form, isPopular: e.target.checked })}
                      className="w-4 h-4 accent-[#20d8e2] rounded"
                    />
                    <span>Producto Destacado</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-bold">
                    <input
                      type="checkbox"
                      checked={form.isHighRotation}
                      onChange={(e) => setForm({ ...form, isHighRotation: e.target.checked })}
                      className="w-4 h-4 accent-[#20d8e2] rounded"
                    />
                    <span>Más Vendido (Alta Rotación)</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => { resetForm(); setActiveSubTab('list'); }}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-[#20d8e2] hover:bg-[#1bc6cf] text-slate-950 font-black flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingProduct ? 'Guardar Cambios' : 'Crear Producto'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Tutorial Paso a Paso */}
            <div className="mt-8 p-6 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-5">
              <div className="flex items-center gap-2 text-[#20d8e2] border-b border-slate-800 pb-3">
                <BookOpen className="w-5 h-5" />
                <h4 className="text-sm font-black uppercase tracking-wider">Manual de Operación: Creación, Edición y Publicación de Productos</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-[11px] text-slate-300 leading-relaxed font-light">
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">1</span>
                    <span>Acceder al Formulario</span>
                  </div>
                  <p>Haga clic en el botón <strong className="text-[#20d8e2]">"Crear Producto"</strong> con el símbolo <strong className="text-[#20d8e2] font-bold">(+)</strong> en la barra de sub-pestañas superiores. Si desea editar uno existente, en la sub-pestaña <strong className="text-white">"Ver Lista"</strong>, ubique el producto y presione el botón del lápiz celeste en la columna de <strong className="text-[#20d8e2]">Acciones</strong>.</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">2</span>
                    <span>Datos Principales</span>
                  </div>
                  <p>Haga clic en <strong className="text-white">Título del Producto</strong> e ingrese el nombre comercial (ej. <em>"Pantalla Redmi Note 12 Original"</em>). Rellene el cuadro <strong className="text-white">SKU</strong> con el código de inventario (ej. <code>PAN-RED-12</code>). Luego use los menús desplegables para seleccionar la <strong className="text-white">Marca</strong>, <strong className="text-white">Categoría</strong> y <strong className="text-white">Subcategoría</strong> correspondientes.</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">3</span>
                    <span>Precios de Venta</span>
                  </div>
                  <p>Ingrese el <strong className="text-amber-400">Precio Detal</strong> (venta por unidad, ej: <code>15.50</code>). Luego, configure el <strong className="text-[#20d8e2]">Precio Mayorista</strong> (ej: <code>12.00</code>) y especifique en <strong className="text-white">Cantidad Mínima Mayor</strong> la cantidad de unidades necesarias para activar este descuento en el carrito (ej: <code>3</code>).</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">4</span>
                    <span>Imagen y Descripción</span>
                  </div>
                  <p>Haga clic en <strong className="text-white">URL de la Imagen</strong> y pegue el enlace directo de su foto (subida previamente a servidores gratuitos como <em>Postimages.org</em> o <em>ImgBB</em>, asegurándose de que termine en <code>.jpg</code> o <code>.png</code>). Describa la compatibilidad y detalles del repuesto en la caja de <strong className="text-white">Descripción</strong>.</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-800/40 border border-slate-800/60 rounded-xl">
                  <div className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#20d8e2]/20 text-[#20d8e2] flex items-center justify-center text-[10px] font-black">5</span>
                    <span>Guardar Producto</span>
                  </div>
                  <p>Opcionalmente, active las casillas <strong className="text-white">"Producto Destacado"</strong> (para lucirlo en la portada) o <strong className="text-white">"Más Vendido"</strong> (para añadir una etiqueta de alta rotación). Finalmente, haga clic en el botón azul <strong className="text-white">"Crear Producto"</strong> (o "Guardar Cambios" si edita). ¡Y listo, se publicará en vivo!</p>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};
