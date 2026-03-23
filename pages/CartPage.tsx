
import React from 'react';
import { CartItem } from '../types';
import PerfumeImage from '../components/PerfumeImage';

interface CartPageProps {
  items: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onShopMore: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ items, onUpdateQty, onRemove, onCheckout, onShopMore }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="py-32 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-serif text-aura-brown mb-6">Your Cart is Empty</h1>
        <p className="text-aura-rose mb-10">It seems you haven't discovered your signature aura yet.</p>
        <button 
          onClick={onShopMore}
          className="btn-luxury-brown px-10 py-4 rounded-full uppercase tracking-widest text-sm font-bold"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-serif text-aura-brown mb-12">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-grow space-y-8">
          {items.map(item => (
            <div key={item.id} className="flex gap-6 pb-8 border-b border-aura-nude group">
              <div className="w-24 h-32 rounded-xl overflow-hidden bg-white border border-aura-nude flex-shrink-0">
                <PerfumeImage 
                  productId={item.id} 
                  prompt={item.imagePrompt} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-serif text-aura-brown">{item.name}</h3>
                    <p className="text-xs text-aura-rose uppercase tracking-widest mt-1 font-bold">{item.scent}</p>
                  </div>
                  <p className="text-lg font-medium text-aura-brown">{item.price * item.quantity} SAR</p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center border border-aura-nude rounded-full px-2 py-1 bg-white">
                    <button 
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center text-aura-brown hover:text-aura-rose font-bold"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center text-aura-brown hover:text-aura-rose font-bold"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-xs uppercase tracking-tighter text-red-400 hover:text-red-600 transition-colors font-bold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="w-full lg:w-96">
          <div className="bg-aura-beige p-8 rounded-3xl sticky top-32 border border-aura-nude/50 luxury-shadow">
            <h2 className="text-xl font-serif text-aura-brown mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-aura-rose font-medium">Subtotal</span>
                <span className="text-aura-brown font-bold">{subtotal} SAR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-aura-rose font-medium">Shipping</span>
                <span className="text-aura-brown font-bold">Free</span>
              </div>
              <div className="pt-4 border-t border-aura-nude flex justify-between">
                <span className="text-lg font-serif text-aura-brown">Total</span>
                <span className="text-lg font-bold text-aura-brown">{subtotal} SAR</span>
              </div>
            </div>
            
            <button 
              onClick={onCheckout}
              className="btn-luxury-brown w-full py-4 rounded-full uppercase tracking-widest text-sm font-bold mb-4"
            >
              Secure Checkout
            </button>
            <button 
              onClick={onShopMore}
              className="w-full text-center text-xs uppercase tracking-widest text-aura-rose hover:text-aura-brown transition-colors font-bold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
