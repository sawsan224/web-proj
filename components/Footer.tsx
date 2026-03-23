
import React from 'react';

interface FooterProps {
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-aura-beige border-t border-aura-nude pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-md">
          <h2 className="font-serif text-2xl text-aura-brown mb-4">Aura Scent</h2>
          <p className="text-aura-rose text-sm leading-relaxed italic">
            Crafting liquid emotions since our inception. We believe a scent is more than just a fragrance; it's a silent introduction to your soul.
          </p>
        </div>
        
        <div className="flex flex-col items-end">
          <button 
            onClick={onAdminClick}
            className="text-xs uppercase tracking-widest text-aura-brown opacity-50 hover:opacity-100 transition-opacity mb-2"
          >
            Staff Portal
          </button>
          <div className="text-xs text-aura-rose opacity-60">
            &copy; 2026 Aura Scent. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
