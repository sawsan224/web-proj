
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount }) => {
  const links: { id: View; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'cart', label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}` },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <nav className="bg-aura-cream px-6 py-8 border-b border-aura-nude sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <ul className="flex space-x-8 order-2 md:order-1">
          {links.map(link => (
            <li key={link.id}>
              <button
                onClick={() => setView(link.id)}
                className={`text-sm tracking-widest uppercase transition-colors hover:text-aura-rose ${
                  currentView === link.id ? 'text-aura-rose font-semibold' : 'text-aura-brown'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button 
          onClick={() => setView('home')}
          className="text-3xl font-serif tracking-tight text-aura-brown order-1 md:order-2"
        >
          Aura Scent
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
