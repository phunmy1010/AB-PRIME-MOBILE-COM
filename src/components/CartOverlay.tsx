import React from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, Send, ShoppingBag } from 'lucide-react';
import { formatPriceFull } from '../data';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartOverlay: React.FC<CartOverlayProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}) => {
  if (!isOpen) return null;

  const totalCost = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleWhatsappCheckout = () => {
    if (cartItems.length === 0) return;
    window.open('https://wa.link/eo0ixx', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in" 
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col animate-slide-left border-l border-slate-100 dark:border-slate-805">
          
          {/* Header */}
          <div className="h-20 px-6 border-b border-slate-50 dark:border-slate-850 flex items-center justify-between">
            <h3 className="font-display font-[900] text-base text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              Your Basket ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h3>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List Scroll workspace */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-950 rounded-full flex items-center justify-center text-slate-350 shadow-inner">
                  <ShoppingBag className="w-8 h-8 opacity-40 select-none" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-sm text-slate-800 dark:text-slate-200">Basket is Empty</h4>
                  <p className="text-[11px] text-slate-400 max-w-xs">Explore our premium store inventory and add devices to prepare your order listing.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-slate-50 dark:divide-slate-850">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`flex gap-4 items-start ${index > 0 ? 'pt-4' : ''}`}
                  >
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl shrink-0 flex items-center justify-center border border-slate-100/50 dark:border-slate-800">
                      <img src={item.image} alt={item.name} className="w-[85%] h-[85%] object-contain" referrerPolicy="no-referrer" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-display font-extrabold text-[13px] text-slate-900 dark:text-white truncate leading-tight">
                          {item.name}
                        </h4>
                        <span className="font-display font-black text-xs text-slate-900 dark:text-white block">
                          {formatPriceFull(item.price)}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                          {item.condition}
                        </span>
                        <span className="bg-slate-50 dark:bg-slate-800 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded-full">
                          {item.storage}
                        </span>
                      </div>

                      {/* Quantity & Actions row */}
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 p-1 px-1.5 rounded-lg border border-slate-100 dark:border-slate-850">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded-full hover:bg-white text-slate-500 flex items-center justify-center transition-all cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-black text-slate-800 dark:text-slate-200">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded-full hover:bg-white text-slate-500 flex items-center justify-center transition-all cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-all cursor-pointer p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout pricing sum list footer */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Subtotal</span>
                  <span>{formatPriceFull(totalCost)}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Delivery Charges</span>
                  <span className="text-emerald-500 font-bold uppercase tracking-wider text-[10px]">Free Walk-In Pickup</span>
                </div>
                <div className="flex justify-between font-display border-t border-slate-200 dark:border-slate-800 pt-3">
                  <span className="font-extrabold text-sm text-slate-850 dark:text-slate-200">Grand Total</span>
                  <span className="font-black text-base text-slate-900 dark:text-white">{formatPriceFull(totalCost)}</span>
                </div>
              </div>

              <button
                id="cart-checkout-btn"
                onClick={handleWhatsappCheckout}
                className="w-full h-13 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all mt-2"
              >
                <Send className="w-4 h-4 fill-white" />
                Secure Checkout via WhatsApp
              </button>
              <div className="space-y-1.5 text-center bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl">
                <p className="text-[10px] text-slate-500 dark:text-slate-350 font-medium">Clicking opens WhatsApp with your full formatted order specs.</p>
                <p className="text-[10px] text-amber-700 dark:text-amber-300 uppercase tracking-widest font-black leading-tight">
                  ⚠️ IMPORTANT: All prices are susceptible to changes according to price inflation or market price
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
