
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h1 className="text-5xl font-serif text-aura-brown mb-6">Connect With Us</h1>
        <p className="text-aura-rose leading-relaxed">
          Whether you need assistance choosing the perfect scent or tracking your order, our curators are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-12">
          <ContactItem 
            label="Voice"
            value="+966 50 123 4567"
            sub="Available 10AM - 10PM"
          />
          <ContactItem 
            label="Inquiries"
            value="curation@aurascent.sa"
            sub="Expect a reply within 24 hours"
          />
          <ContactItem 
            label="Atelier"
            value="Prince Turki Al Awal Road, Al Mohammadiyah, Riyadh 12361"
            sub="Visit us for a private consultation"
          />
        </div>
        
        <div className="relative group rounded-3xl overflow-hidden aspect-video md:aspect-auto h-full luxury-shadow border border-aura-nude bg-aura-beige flex items-center justify-center p-12">
          <div className="text-center">
            <div className="font-serif text-6xl md:text-8xl text-aura-brown opacity-20 select-none pointer-events-none">Aura Scent</div>
            <div className="mt-4 text-[10px] uppercase tracking-[1em] text-aura-rose opacity-40 font-bold">The Signature of Elegance</div>
          </div>
          <div className="absolute inset-0 border-[20px] border-aura-cream opacity-50 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

const ContactItem: React.FC<{ label: string; value: string; sub: string }> = ({ label, value, sub }) => (
  <div className="border-l-2 border-aura-nude pl-8 py-2">
    <span className="text-[10px] uppercase tracking-[0.3em] text-aura-rose block mb-2 font-bold">{label}</span>
    <p className="text-2xl font-serif text-aura-brown mb-1">{value}</p>
    <p className="text-xs text-aura-rose italic">{sub}</p>
  </div>
);

export default ContactPage;
