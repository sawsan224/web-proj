
import React, { useState, useEffect } from 'react';
import { View, Product, CartItem, Order } from './types';
import { PRODUCTS } from './constants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [pastPurchases, setPastPurchases] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Initialization
  useEffect(() => {
    // Load Inventory
    const savedInv = localStorage.getItem('aura_inventory');
    if (savedInv) {
      setInventory(JSON.parse(savedInv));
    } else {
      setInventory(PRODUCTS);
      localStorage.setItem('aura_inventory', JSON.stringify(PRODUCTS));
    }

    // Load Past Purchases
    const savedPast = localStorage.getItem('aura_past_purchases');
    if (savedPast) {
      setPastPurchases(JSON.parse(savedPast));
    }

    // Load Orders
    const savedOrders = localStorage.getItem('aura_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added to cart!`);
  };

  const updateCartQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const finalizeOrder = (customer: { name: string; phone: string; address: string }) => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total,
      customer
    };

    // Update Inventory
    const updatedInventory = inventory.map(p => {
      const cartItem = cart.find(ci => ci.id === p.id);
      if (cartItem) {
        return { ...p, stock: p.stock - cartItem.quantity };
      }
      return p;
    });
    setInventory(updatedInventory);
    localStorage.setItem('aura_inventory', JSON.stringify(updatedInventory));

    // Update Past Purchases
    const uniqueNewPurchases = cart.map(item => {
      const { quantity, ...product } = item;
      return product;
    });
    
    const updatedPast = Array.from(new Set([...pastPurchases, ...uniqueNewPurchases].map(p => p.id)))
      .map(id => [...pastPurchases, ...uniqueNewPurchases].find(p => p.id === id)!);

    setPastPurchases(updatedPast);
    localStorage.setItem('aura_past_purchases', JSON.stringify(updatedPast));

    // Clear Cart & Store Order
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('aura_orders', JSON.stringify(updatedOrders));
    
    setCart([]);
    setCurrentView('home');
    alert("Purchase confirmed! Your order is being prepared.");
  };

  const handleUpdateProduct = (updated: Product) => {
    const next = inventory.map(p => p.id === updated.id ? updated : p);
    setInventory(next);
    localStorage.setItem('aura_inventory', JSON.stringify(next));
  };

  const handleAddProduct = (newProduct: Product) => {
    const next = [...inventory, newProduct];
    setInventory(next);
    localStorage.setItem('aura_inventory', JSON.stringify(next));
  };

  const renderView = () => {
    if (currentView === 'login') {
      return <LoginPage onLogin={(success) => { setIsLoggedIn(success); setCurrentView('admin'); }} onBack={() => setCurrentView('home')} />;
    }

    switch (currentView) {
      case 'home':
        return <Home onShopNow={() => setCurrentView('products')} pastPurchases={pastPurchases} />;
      case 'products':
        return <ProductsPage products={inventory} onAddToCart={addToCart} />;
      case 'cart':
        return <CartPage items={cart} onUpdateQty={updateCartQuantity} onRemove={removeFromCart} onCheckout={() => setCurrentView('checkout')} onShopMore={() => setCurrentView('products')} />;
      case 'checkout':
        return <CheckoutPage cart={cart} onPlaceOrder={finalizeOrder} onBackToCart={() => setCurrentView('cart')} />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        if (!isLoggedIn) return <LoginPage onLogin={(s) => { setIsLoggedIn(s); setCurrentView('admin'); }} onBack={() => setCurrentView('home')} />;
        return <AdminDashboard inventory={inventory} orders={orders} onUpdateProduct={handleUpdateProduct} onAddProduct={handleAddProduct} onLogout={() => { setIsLoggedIn(false); setCurrentView('home'); }} />;
      default:
        return <Home onShopNow={() => setCurrentView('products')} pastPurchases={pastPurchases} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} setView={setCurrentView} cartCount={cart.length} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer onAdminClick={() => setCurrentView('login')} />
    </div>
  );
};

export default App;
