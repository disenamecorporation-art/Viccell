import React, { useState, useEffect } from 'react';
import { StoreMode, ActiveTab, Product, CartItem, User, TrackingOrder } from './types';
import { PRODUCTS } from './data/products';
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

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [storeMode, setStoreMode] = useState<StoreMode>('mayorista');
  const [trackingSearchCode, setTrackingSearchCode] = useState('');
  
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
  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const created: Product = {
      ...newProduct,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [created, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Tracking Orders CRUD Actions (Admin)
  const handleAddTrackingOrder = (newOrder: Omit<TrackingOrder, 'id'>) => {
    const created: TrackingOrder = {
      ...newOrder,
      id: `ord-${Date.now()}`
    };
    setTrackingOrders(prev => [created, ...prev]);
  };

  const handleUpdateTrackingOrder = (updatedOrder: TrackingOrder) => {
    setTrackingOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  const handleDeleteTrackingOrder = (orderId: string) => {
    setTrackingOrders(prev => prev.filter(o => o.id !== orderId));
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
            onUpdateQuantity={handleUpdateCartQty}
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
            onUpdateQuantity={handleUpdateCartQty}
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
      />

      <UserDashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        currentUser={currentUser}
        orders={trackingOrders}
        cartItems={cartItems}
        onNavigateToTracking={(code) => handleViewTrackingOrder(code)}
        onNavigateToStore={() => handleNavigateToTab('tienda-mayorista', 'mayorista')}
      />
    </div>
  );
}
