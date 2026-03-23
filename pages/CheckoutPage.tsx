
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  onPlaceOrder: (customer: { name: string; phone: string; address: string }) => void;
  onBackToCart: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, onPlaceOrder, onBackToCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Shipping address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onPlaceOrder({
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      });
    }
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="py-20 px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <h2 className="text-3xl font-serif text-aura-brown mb-8">Delivery Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-aura-rose mb-2 font-bold">Full Name</label>
              <input 
                type="text"
                className={`w-full bg-white border ${errors.name ? 'border-red-300' : 'border-aura-nude'} rounded-xl p-4 outline-none focus:border-aura-brown transition-colors`}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-tighter">{errors.name}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-aura-rose mb-2 font-bold">Phone Number</label>
                <input 
                  type="tel"
                  className={`w-full bg-white border ${errors.phone ? 'border-red-300' : 'border-aura-nude'} rounded-xl p-4 outline-none focus:border-aura-brown transition-colors`}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+966 5X XXX XXXX"
                />
                {errors.phone && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-tighter">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-aura-rose mb-2 font-bold">Email (Optional)</label>
                <input 
                  type="email"
                  className="w-full bg-white border border-aura-nude rounded-xl p-4 outline-none focus:border-aura-brown transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-aura-rose mb-2 font-bold">Shipping Address</label>
              <textarea 
                rows={3}
                className={`w-full bg-white border ${errors.address ? 'border-red-300' : 'border-aura-nude'} rounded-xl p-4 outline-none focus:border-aura-brown transition-colors`}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Street, District, City, Post Code"
              ></textarea>
              {errors.address && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-tighter">{errors.address}</p>}
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                className="btn-luxury-brown w-full py-5 rounded-full uppercase tracking-[0.2em] text-sm font-bold"
              >
                Place Order • {total} SAR
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-aura-beige p-8 rounded-3xl h-fit border border-aura-nude/50 luxury-shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif text-aura-brown">Order Summary</h2>
            <button onClick={onBackToCart} className="text-xs uppercase text-aura-rose hover:text-aura-brown underline decoration-aura-nude font-bold">Edit Cart</button>
          </div>
          
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-aura-rose font-medium">{item.name} <span className="text-[10px] font-bold">x{item.quantity}</span></span>
                <span className="text-aura-brown font-bold">{item.price * item.quantity} SAR</span>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-aura-nude flex justify-between font-bold">
            <span className="text-aura-brown">Total</span>
            <span className="text-aura-brown">{total} SAR</span>
          </div>
          
          <div className="mt-8 p-4 rounded-xl bg-white border border-aura-nude">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-xs uppercase tracking-widest text-aura-brown font-bold">Payment on Delivery Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
