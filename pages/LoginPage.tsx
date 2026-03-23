
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (success: boolean) => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple secure PIN for demonstration
    if (pin === '1234' || pin === 'aura2026') {
      onLogin(true);
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 animate-fadeIn">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 luxury-shadow border border-aura-nude text-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-aura-rose mb-4 block font-bold">Staff Portal</span>
        <h1 className="text-4xl font-serif text-aura-brown mb-8">Secure Access</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input 
              type="password"
              placeholder="Enter Staff Pin"
              className={`w-full bg-aura-cream border ${error ? 'border-red-300' : 'border-aura-nude'} rounded-xl p-4 text-center text-lg tracking-[0.5em] outline-none focus:border-aura-brown transition-all`}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              autoFocus
            />
            {error && <p className="text-[10px] text-red-500 mt-2 uppercase tracking-widest font-bold">Invalid Access Pin</p>}
          </div>

          <button 
            type="submit"
            className="btn-luxury-brown w-full py-4 rounded-full uppercase tracking-[0.2em] text-xs font-bold"
          >
            Verify Identity
          </button>
        </form>

        <button 
          onClick={onBack}
          className="mt-8 text-[10px] uppercase tracking-widest text-aura-rose hover:text-aura-brown transition-colors font-bold"
        >
          Return to Boutique
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
