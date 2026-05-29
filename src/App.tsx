import React, { useState, useEffect } from 'react';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { RepairsView } from './components/RepairsView';
import { ContactView } from './components/ContactView';
import { TradeInView } from './components/TradeInView';
import { CartOverlay } from './components/CartOverlay';
import { CartItem } from './types';
import { Phone, MessageCircle, ShoppingBag, Sun, Moon, Menu, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'repairs' | 'contact' | 'trade-in'>('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [preselectedCategory, setPreselectedCategory] = useState<string>('All');

  // Initialize from local storage if available for durable data persistence
  useEffect(() => {
    const storedCart = localStorage.getItem('ab_prime_cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error(e);
      }
    }
    
    const storedTheme = localStorage.getItem('ab_prime_theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Sync state changes back to localStorage
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('ab_prime_cart', JSON.stringify(items));
  };

  const handleToggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ab_prime_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ab_prime_theme', 'light');
    }
  };

  const handleAddToCart = (newItem: CartItem) => {
    const existingIndex = cartItems.findIndex(
      item => item.id === newItem.id && item.condition === newItem.condition && item.storage === newItem.storage
    );

    let updatedCart = [...cartItems];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push(newItem);
    }
    
    saveCart(updatedCart);
    setCartOpen(true); // Auto view cart when they add for dynamic user feedback
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, nextQty) };
      }
      return item;
    });
    saveCart(updated);
  };

  const handleRemoveItem = (id: string) => {
    const filtered = cartItems.filter(item => item.id !== id);
    saveCart(filtered);
  };

  const cartTotalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen bg-[#fafafc] dark:bg-slate-950 flex flex-col transition-colors duration-300`}>
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-805 h-16 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button id="menu-btn" className="p-2 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-xl transition-all block lg:hidden" title="Menu text placeholder">
            <Menu className="w-5 h-5 text-slate-700 dark:text-slate-350" />
          </button>
          <div className="flex flex-col select-none">
            <span className="font-display font-[900] text-sm md:text-base text-slate-900 dark:text-white leading-none tracking-tight">
              AB PRIME MOBILE
            </span>
            <span className="font-sans font-bold text-[8.5px] text-slate-400 uppercase tracking-widest leading-none mt-1">
              Communication Ltd
            </span>
          </div>
        </div>

        {/* Global toggles header actions */}
        <div className="flex items-center gap-2">
          {/* Light/Dark Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={handleToggleTheme}
            className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-all cursor-pointer border border-transparent hover:border-slate-102"
            title="Toggle theme contrast"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Cart trigger button */}
          <button
            id="global-cart-btn"
            onClick={() => setCartOpen(true)}
            className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 flex items-center justify-center relative transition-all cursor-pointer border border-transparent hover:border-slate-102"
            title="View Basket"
          >
            <ShoppingBag className="w-4 h-4 text-slate-705 dark:text-slate-350" />
            {cartTotalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 font-sans text-[9px] font-black font-semibold text-white w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
                {cartTotalQuantity}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace Frame container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 pb-24">
        {activeTab === 'home' && (
          <HomeView 
            onAddToCart={handleAddToCart} 
            onNavigateToTab={(tab, cat) => {
              if (cat) {
                setPreselectedCategory(cat);
              } else {
                setPreselectedCategory('All');
              }
              setActiveTab(tab);
            }} 
          />
        )}
        
        {activeTab === 'shop' && (
          <ShopView 
            onAddToCart={handleAddToCart} 
            initialCategory={preselectedCategory}
          />
        )}
        
        {activeTab === 'repairs' && (
          <RepairsView />
        )}
        
        {activeTab === 'contact' && (
          <ContactView />
        )}

        {activeTab === 'trade-in' && (
          <TradeInView />
        )}
      </main>

      {/* Bottom Floating Navigation bar matches design perfectly */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-805 h-20 shadow-xl flex items-center justify-around px-2 max-w-md mx-auto rounded-t-3xl md:border-x">
        <button
          id="nav-tab-home"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 gap-1 border-b-2 transition-all cursor-pointer ${
            activeTab === 'home' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">home</span>
          <span className="font-display font-[800] text-[10px] uppercase tracking-wider leading-none">Home</span>
        </button>

        <button
          id="nav-tab-shop"
          onClick={() => {
            setPreselectedCategory('All');
            setActiveTab('shop');
          }}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 gap-1 border-b-2 transition-all cursor-pointer ${
            activeTab === 'shop' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">storefront</span>
          <span className="font-display font-[800] text-[10px] uppercase tracking-wider leading-none">Shop</span>
        </button>

        {/* Dynamic center Trade-In Swap tab */}
        <button
          id="nav-tab-trade-in"
          onClick={() => setActiveTab('trade-in')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 gap-1 border-b-2 transition-all cursor-pointer ${
            activeTab === 'trade-in' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">sync_alt</span>
          <span className="font-display font-[800] text-[10px] uppercase tracking-wider leading-none">Swap</span>
        </button>

        <button
          id="nav-tab-repairs"
          onClick={() => setActiveTab('repairs')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 gap-1 border-b-2 transition-all cursor-pointer ${
            activeTab === 'repairs' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">build</span>
          <span className="font-display font-[800] text-[10px] uppercase tracking-wider leading-none">Repairs</span>
        </button>

        <button
          id="nav-tab-contact"
          onClick={() => setActiveTab('contact')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 gap-1 border-b-2 transition-all cursor-pointer ${
            activeTab === 'contact' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">pin_drop</span>
          <span className="font-display font-[800] text-[10px] uppercase tracking-wider leading-none">Contact</span>
        </button>
      </nav>

      {/* Corporate Standard Footer info */}
      <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-805 py-8 px-4 text-center text-slate-400 space-y-2 mt-auto pb-28 md:pb-32">
        <p className="text-[10px] text-amber-600 dark:text-amber-400 font-extrabold tracking-wider uppercase max-w-lg mx-auto pb-2 border-b border-slate-100 dark:border-slate-850">
          ⚠️ NOTE: All prices are susceptible to changes according to price inflation or market price
        </p>
        <p className="text-xs font-semibold leading-relaxed pt-1 text-slate-500 dark:text-slate-400">
          © 2026 AB Prime Mobile Communication Limited. Benin City, Edo State, Nigeria.
        </p>
        <p className="text-[10px] text-slate-350 dark:text-slate-500 leading-none">
          Meticulous grading. Fully certified technical workflows. Outstanding warranties.
        </p>
      </footer>

      {/* Interactive Cart slide-over Overlay */}
      <CartOverlay 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cartItems={cartItems} 
        onUpdateQuantity={handleUpdateQuantity} 
        onRemoveItem={handleRemoveItem} 
      />

    </div>
  );
}
