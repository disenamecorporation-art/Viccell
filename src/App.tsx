import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { StoreMode, ActiveTab, Product, CartItem, User, TrackingOrder, PaymentMethodConfig } from './types';
import { PRODUCTS } from './data/products';
import { syncCategoriesFromSupabase } from './data/categories';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrackingWidget } from './components/TrackingWidget';
import { FeaturedProducts } from './components/FeaturedProducts';
import { CallToActionBanner } from './components/CallToActionBanner';
import { BestSellers } from './components/BestSellers';
import { AdBanners } from './components/AdBanners';
import { Advantages } from './components/Advantages';
import { BusinessServices } from './components/BusinessServices';
import { StoreSection } from './components/StoreSection';
import { TrackingSection } from './components/TrackingSection';
import { ProductModal } from './components/ProductModal';
import { ShippingSection } from './components/ShippingSection';
import { HowToBuySection } from './components/HowToBuySection';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { UserDashboardModal } from './components/UserDashboardModal';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';

const DEFAULT_PAYMENT_METHODS: PaymentMethodConfig = {
  pagoMovil: {
    titular: 'Victor Jimenez',
    cedula: 'V-26.161.731',
    phone: '0412-973.26.52',
    banco: '0105 - Banco Mercantil C.A.'
  },
  transferencia: {
    banco: 'Mercantil, C.A, Banco Universal',
    titular: 'Victor Jimenez',
    cuenta: '01050066441066447705',
    cedula: 'V-26.161.731'
  },
  binance: {
    usuario: 'Liamyah3l',
    qrUrl: 'https://i.postimg.cc/ydTgPJ7P/QRbinance.jpg'
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [storeMode, setStoreMode] = useState<StoreMode>('mayorista');
  const [trackingSearchCode, setTrackingSearchCode] = useState('');
  
  // Dynamic Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodConfig>(() => {
    try {
      const saved = localStorage.getItem('viccell_payment_methods');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clean out cached Victor Binance values or obsolete RIF configuration
        if (parsed.binance?.usuario === 'Victor Binance' || parsed.binance?.rif !== undefined || parsed.binance?.usuario !== 'Liamyah3l') {
          localStorage.setItem('viccell_payment_methods', JSON.stringify(DEFAULT_PAYMENT_METHODS));
          return DEFAULT_PAYMENT_METHODS;
        }
        return parsed;
      }
      return DEFAULT_PAYMENT_METHODS;
    } catch {
      return DEFAULT_PAYMENT_METHODS;
    }
  });
  
  // Products state (persisted in localStorage for Admin CRUD)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('viccell_products_db');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Tracking Orders state (persisted in localStorage for Admin & User tracking)
  const [trackingOrders, setTrackingOrders] = useState<TrackingOrder[]>(() => {
    try {
      const saved = localStorage.getItem('viccell_tracking_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'ord-1',
        code: '20517462',
        clientName: 'Carlos Mendoza',
        clientEmail: 'carlos@ejemplo.com',
        projectName: 'Importación Lote Pines & Pantallas OLED',
        phase: 'EN PROCESO',
        createdAt: '2026-08-01',
        updatedAt: '2026-08-05',
        itemsDescription: '50x Pines Tipo-C Samsung A12, 20x Módulos OLED iPhone 11',
        totalAmount: 1450.00,
        notes: 'Mercancía en tránsito aduanal aéreo con guía express.',
        carrier: 'Zoom'
      }
    ];
  });

  // User & Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('viccell_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('viccell_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Persist Products
  useEffect(() => {
    try {
      localStorage.setItem('viccell_products_db', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Persist Tracking Orders
  useEffect(() => {
    try {
      localStorage.setItem('viccell_tracking_orders', JSON.stringify(trackingOrders));
    } catch (e) {
      console.error(e);
    }
  }, [trackingOrders]);

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem('viccell_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Persist User
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('viccell_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('viccell_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Persist Payment Methods
  useEffect(() => {
    try {
      localStorage.setItem('viccell_payment_methods', JSON.stringify(paymentMethods));
    } catch (e) {
      console.error(e);
    }
  }, [paymentMethods]);

  // Load Payment Methods, Categories, Products, and Tracking Orders from Supabase on Mount
  useEffect(() => {
    async function loadData() {
      if (!supabase) return;
      
      // 1. Load Categories
      try {
        await syncCategoriesFromSupabase();
      } catch (err) {
        console.error('Error syncing categories:', err);
      }

      // 2. Load Payment Methods
      try {
        const { data, error } = await supabase
          .from('payment_methods')
          .select('*')
          .eq('id', 'default_config')
          .single();
        
        if (data) {
          setPaymentMethods(prev => ({
            ...prev,
            pagoMovil: {
              ...prev.pagoMovil,
              phone: data.banesco_telefono || prev.pagoMovil.phone,
              cedula: data.banesco_cedula || prev.pagoMovil.cedula,
            },
            binance: {
              usuario: data.binance_usuario || prev.binance.usuario,
              qrUrl: data.binance_qr_url || prev.binance.qrUrl,
            }
          }));
        }
      } catch (err) {
        console.error('Error loading payment methods from Supabase:', err);
      }

      // 3. Load Products (with Seeding)
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) {
          console.warn('Could not load products from Supabase (ignore if table not created yet):', error.message);
        } else if (data && data.length > 0) {
          const mapped: Product[] = data.map((item: any) => ({
            id: item.id,
            sku: item.sku || '',
            title: item.title || '',
            brand: item.brand || 'Universal',
            category: item.category || '',
            description: item.description || '',
            compatibility: Array.isArray(item.compatibility) ? item.compatibility : (item.compatibility ? JSON.parse(JSON.stringify(item.compatibility)) : []),
            images: Array.isArray(item.images) ? item.images : (item.images ? JSON.parse(JSON.stringify(item.images)) : []),
            wholesalePrices: Array.isArray(item.wholesale_prices) ? item.wholesale_prices : (item.wholesale_prices ? JSON.parse(JSON.stringify(item.wholesale_prices)) : []),
            retailPrice: Number(item.retail_price ?? 0),
            minWholesaleQty: Number(item.min_wholesale_qty ?? 1),
            stock: Number(item.stock ?? 0),
            isPopular: !!item.is_popular,
            isHighRotation: !!item.is_high_rotation,
            tags: Array.isArray(item.tags) ? item.tags : (item.tags ? JSON.parse(JSON.stringify(item.tags)) : []),
          }));
          setProducts(mapped);
          localStorage.setItem('viccell_products_db', JSON.stringify(mapped));
        } else {
          // Table exists but is empty -> seed default products
          console.log('Seeding products to Supabase...');
          for (const prod of PRODUCTS) {
            await supabase.from('products').insert({
              id: prod.id,
              sku: prod.sku,
              title: prod.title,
              brand: prod.brand,
              category: prod.category,
              description: prod.description,
              compatibility: prod.compatibility,
              images: prod.images,
              wholesale_prices: prod.wholesalePrices,
              retail_price: prod.retailPrice,
              min_wholesale_qty: prod.minWholesaleQty,
              stock: prod.stock,
              is_popular: prod.isPopular || false,
              is_high_rotation: prod.isHighRotation || false,
              tags: prod.tags
            });
          }
        }
      } catch (err) {
        console.error('Error processing products from Supabase:', err);
      }

      // 4. Load Tracking Orders (with Seeding)
      try {
        const { data, error } = await supabase
          .from('tracking_orders')
          .select('*');

        if (error) {
          console.warn('Could not load tracking orders from Supabase (ignore if table not created yet):', error.message);
        } else if (data && data.length > 0) {
          const mapped: TrackingOrder[] = data.map((item: any) => ({
            id: item.id,
            code: item.code || '',
            clientName: item.client_name || '',
            clientEmail: item.client_email || '',
            projectName: item.project_name || '',
            phase: item.phase || 'COTIZADO',
            createdAt: item.created_at_val || item.created_at?.split('T')[0] || '',
            updatedAt: item.updated_at_val || item.updated_at?.split('T')[0] || '',
            itemsDescription: item.items_description || '',
            totalAmount: Number(item.total_amount ?? 0),
            notes: item.notes || '',
            carrier: item.carrier || ''
          }));
          setTrackingOrders(mapped);
          localStorage.setItem('viccell_tracking_orders', JSON.stringify(mapped));
        } else {
          // Table exists but is empty -> seed default tracking order
          const defaultOrder = {
            id: 'ord-1',
            code: '20517462',
            client_name: 'Carlos Mendoza',
            client_email: 'carlos@ejemplo.com',
            project_name: 'Importación Lote Pines & Pantallas OLED',
            phase: 'EN PROCESO',
            created_at_val: '2026-08-01',
            updated_at_val: '2026-08-05',
            items_description: '50x Pines Tipo-C Samsung A12, 20x Módulos OLED iPhone 11',
            total_amount: 1450.00,
            notes: 'Mercancía en tránsito aduanal aéreo con guía express.',
            carrier: 'Zoom'
          };
          await supabase.from('tracking_orders').insert(defaultOrder);
        }
      } catch (err) {
        console.error('Error processing tracking orders from Supabase:', err);
      }
    }
    loadData();
  }, []);

  const handleUpdatePaymentMethods = async (newMethods: PaymentMethodConfig) => {
    setPaymentMethods(newMethods);
    if (supabase) {
      try {
        await supabase.from('payment_methods').upsert({
          id: 'default_config',
          banesco_telefono: newMethods.pagoMovil.phone,
          banesco_cedula: newMethods.pagoMovil.cedula,
          pago_rapido_telefono: newMethods.pagoMovil.phone,
          pago_rapido_cedula: newMethods.pagoMovil.cedula,
          binance_usuario: newMethods.binance.usuario,
          binance_qr_url: newMethods.binance.qrUrl || null,
          updated_at: new Date().toISOString()
        });
      } catch (err) {
        console.error('Error syncing with Supabase:', err);
      }
    }
  };

  const handleUpdateCurrentUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  const handleNavigateToTab = (tab: ActiveTab, mode?: StoreMode) => {
    if (mode) {
      setStoreMode(mode);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewTrackingOrder = (code: string) => {
    setTrackingSearchCode(code);
    setActiveTab('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateUnitPrice = (product: Product, quantity: number, mode: StoreMode): number => {
    if (mode === 'minorista') {
      return product.retailPrice;
    }
    let price = product.wholesalePrices[0].pricePerUnit;
    for (const tier of product.wholesalePrices) {
      if (quantity >= tier.minQty) {
        price = tier.pricePerUnit;
      }
    }
    return price;
  };

  const handleAddToCart = (product: Product, quantity: number, mode: StoreMode) => {
    const unitPrice = calculateUnitPrice(product, quantity, mode);
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.mode === mode);
      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + quantity;
        const newUnitPrice = calculateUnitPrice(product, newQty, mode);
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          unitPrice: newUnitPrice,
        };
        return updated;
      } else {
        return [...prev, { product, quantity, mode, unitPrice }];
      }
    });
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          const newUnitPrice = calculateUnitPrice(item.product, newQty, item.mode);
          return { ...item, quantity: newQty, unitPrice: newUnitPrice };
        }
        return item;
      });
    });
  };

  const handleSetCartQty = (productId: string, newQty: number) => {
    const validQty = Math.max(1, newQty);
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newUnitPrice = calculateUnitPrice(item.product, validQty, item.mode);
          return { ...item, quantity: validQty, unitPrice: newUnitPrice };
        }
        return item;
      });
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenWhatsAppGeneral = () => {
    window.open(
      'https://wa.me/584128006426?text=Hola%20Viccell,%20quisiera%20solicitar%20informaci%C3%B3n.',
      '_blank'
    );
  };

  // Admin Product Actions (CRUD)
  const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
    const created: Product = {
      ...newProduct,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [created, ...prev]);

    if (supabase) {
      try {
        const { error } = await supabase.from('products').insert({
          id: created.id,
          sku: created.sku,
          title: created.title,
          brand: created.brand,
          category: created.category,
          description: created.description,
          compatibility: created.compatibility,
          images: created.images,
          wholesale_prices: created.wholesalePrices,
          retail_price: created.retailPrice,
          min_wholesale_qty: created.minWholesaleQty,
          stock: created.stock,
          is_popular: created.isPopular || false,
          is_high_rotation: created.isHighRotation || false,
          tags: created.tags
        });
        if (error) {
          console.error('Error inserting product in Supabase:', error.message);
        }
      } catch (err) {
        console.error('Error adding product in Supabase:', err);
      }
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));

    if (supabase) {
      try {
        const { error } = await supabase.from('products').upsert({
          id: updatedProduct.id,
          sku: updatedProduct.sku,
          title: updatedProduct.title,
          brand: updatedProduct.brand,
          category: updatedProduct.category,
          description: updatedProduct.description,
          compatibility: updatedProduct.compatibility,
          images: updatedProduct.images,
          wholesale_prices: updatedProduct.wholesalePrices,
          retail_price: updatedProduct.retailPrice,
          min_wholesale_qty: updatedProduct.minWholesaleQty,
          stock: updatedProduct.stock,
          is_popular: updatedProduct.isPopular || false,
          is_high_rotation: updatedProduct.isHighRotation || false,
          tags: updatedProduct.tags
        });
        if (error) {
          console.error('Error updating product in Supabase:', error.message);
        }
      } catch (err) {
        console.error('Error updating product in Supabase:', err);
      }
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));

    if (supabase) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', productId);
        if (error) {
          console.error('Error deleting product in Supabase:', error.message);
        }
      } catch (err) {
        console.error('Error deleting product in Supabase:', err);
      }
    }
  };

  // Tracking Orders CRUD Actions (Admin)
  const handleAddTrackingOrder = async (newOrder: Omit<TrackingOrder, 'id'>) => {
    const created: TrackingOrder = {
      ...newOrder,
      id: `ord-${Date.now()}`
    };
    setTrackingOrders(prev => [created, ...prev]);

    if (supabase) {
      try {
        const { error } = await supabase.from('tracking_orders').insert({
          id: created.id,
          code: created.code,
          client_name: created.clientName,
          client_email: created.clientEmail,
          project_name: created.projectName,
          phase: created.phase,
          created_at_val: created.createdAt,
          updated_at_val: created.updatedAt,
          items_description: created.itemsDescription,
          total_amount: created.totalAmount,
          notes: created.notes || '',
          carrier: created.carrier || ''
        });
        if (error) {
          console.error('Error inserting tracking order in Supabase:', error.message);
        }
      } catch (err) {
        console.error('Error adding tracking order in Supabase:', err);
      }
    }
  };

  const handleUpdateTrackingOrder = async (updatedOrder: TrackingOrder) => {
    setTrackingOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));

    if (supabase) {
      try {
        const { error } = await supabase.from('tracking_orders').upsert({
          id: updatedOrder.id,
          code: updatedOrder.code,
          client_name: updatedOrder.clientName,
          client_email: updatedOrder.clientEmail,
          project_name: updatedOrder.projectName,
          phase: updatedOrder.phase,
          created_at_val: updatedOrder.createdAt,
          updated_at_val: updatedOrder.updatedAt,
          items_description: updatedOrder.itemsDescription,
          total_amount: updatedOrder.totalAmount,
          notes: updatedOrder.notes || '',
          carrier: updatedOrder.carrier || ''
        });
        if (error) {
          console.error('Error updating tracking order in Supabase:', error.message);
        }
      } catch (err) {
        console.error('Error updating tracking order in Supabase:', err);
      }
    }
  };

  const handleDeleteTrackingOrder = async (orderId: string) => {
    setTrackingOrders(prev => prev.filter(o => o.id !== orderId));

    if (supabase) {
      try {
        const { error } = await supabase.from('tracking_orders').delete().eq('id', orderId);
        if (error) {
          console.error('Error deleting tracking order in Supabase:', error.message);
        }
      } catch (err) {
        console.error('Error deleting tracking order in Supabase:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden w-full max-w-full">
      <TopBar />

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        storeMode={storeMode}
        setStoreMode={setStoreMode}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAdminPanel={() => setIsAdminModalOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onLogout={() => setCurrentUser(null)}
      />

      {/* HOME PAGE */}
      {activeTab === 'home' && (
        <main className="space-y-2">
          <Hero
            storeMode={storeMode}
            onNavigateToTab={handleNavigateToTab}
            onOpenWhatsApp={handleOpenWhatsAppGeneral}
          />

          {/* Apple-minimalist Tracking Widget right below Hero */}
          <TrackingWidget
            orders={trackingOrders}
            onViewOrder={handleViewTrackingOrder}
          />

          {/* Featured Products Carousel/Grid */}
          <FeaturedProducts
            products={products}
            storeMode={storeMode}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onNavigateToTab={handleNavigateToTab}
          />

          {/* Elegant Call to Action Banner */}
          <CallToActionBanner
            onNavigateToTab={handleNavigateToTab}
          />

          {/* Best Sellers Section */}
          <BestSellers
            products={products}
            storeMode={storeMode}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onNavigateToTab={handleNavigateToTab}
          />

          <Advantages />
        </main>
      )}

      {/* TRACKING DEDICATED TAB */}
      {activeTab === 'tracking' && (
        <main className="min-h-[85vh] py-6">
          <TrackingSection
            orders={trackingOrders}
            initialCode={trackingSearchCode}
            onOpenAdminPanel={() => setIsAdminModalOpen(true)}
          />
        </main>
      )}

      {/* TIENDA MAYORISTA */}
      {activeTab === 'tienda-mayorista' && (
        <main className="min-h-[80vh] py-4">
          <StoreSection
            storeMode="mayorista"
            setStoreMode={setStoreMode}
            products={products}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
        </main>
      )}

      {/* TIENDA MINORISTA */}
      {activeTab === 'tienda-minorista' && (
        <main className="min-h-[80vh] py-4">
          <StoreSection
            storeMode="minorista"
            setStoreMode={setStoreMode}
            products={products}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
          <ShippingSection
            cartItems={cartItems}
            storeMode={storeMode}
            currentUser={currentUser}
            paymentMethods={paymentMethods}
            onUpdateCurrentUser={handleUpdateCurrentUser}
            onUpdateQuantity={handleUpdateCartQty}
            onSetQuantity={handleSetCartQty}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
          />
        </main>
      )}

      {/* SERVICIOS */}
      {activeTab === 'servicios' && (
        <main className="min-h-[80vh] py-4 space-y-4">
          <BusinessServices
            onOpenWhatsApp={handleOpenWhatsAppGeneral}
            onScrollToCatalog={() => handleNavigateToTab('tienda-mayorista', 'mayorista')}
          />
          <Advantages />
        </main>
      )}

      {/* ENVIOS */}
      {activeTab === 'envios' && (
        <main className="min-h-[80vh] py-4">
          <ShippingSection
            cartItems={cartItems}
            storeMode={storeMode}
            currentUser={currentUser}
            paymentMethods={paymentMethods}
            onUpdateCurrentUser={handleUpdateCurrentUser}
            onUpdateQuantity={handleUpdateCartQty}
            onSetQuantity={handleSetCartQty}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
          />
        </main>
      )}

      {/* COMO COMPRAR TUTORIAL */}
      {activeTab === 'como-comprar' && (
        <main className="min-h-[80vh] py-4">
          <HowToBuySection onNavigateToTab={handleNavigateToTab} />
        </main>
      )}

      <Footer onNavigateToTab={handleNavigateToTab} />

      <WhatsAppFloat />

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        storeMode={storeMode}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        storeMode={storeMode}
        onUpdateQuantity={handleUpdateCartQty}
        onSetQuantity={handleSetCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currentUser={currentUser}
        onProceedToDispatch={() => handleNavigateToTab('envios')}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={(user) => {
          setCurrentUser(user);
          if (user.role === 'admin') {
            setIsAdminModalOpen(true);
          }
        }}
      />

      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onEditProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        trackingOrders={trackingOrders}
        onAddTrackingOrder={handleAddTrackingOrder}
        onUpdateTrackingOrder={handleUpdateTrackingOrder}
        onDeleteTrackingOrder={handleDeleteTrackingOrder}
        paymentMethods={paymentMethods}
        onUpdatePaymentMethods={handleUpdatePaymentMethods}
      />

      <UserDashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        currentUser={currentUser}
        orders={trackingOrders}
        cartItems={cartItems}
        onUpdateCurrentUser={handleUpdateCurrentUser}
        onNavigateToTracking={(code) => handleViewTrackingOrder(code)}
        onNavigateToStore={() => handleNavigateToTab('tienda-mayorista', 'mayorista')}
      />
    </div>
  );
}
