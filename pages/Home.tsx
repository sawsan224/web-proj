
import React from 'react';
import { Icons } from '../constants.tsx';
import { Product } from '../types';
import PerfumeImage from '../components/PerfumeImage';

interface HomeProps {
  onShopNow: () => void;
  pastPurchases: Product[];
}

const Home: React.FC<HomeProps> = ({ onShopNow, pastPurchases }) => {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-aura-beige py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute inset-0 bg-aura-nude transform translate-x-4 translate-y-4 rounded-[2rem] -z-10 opacity-20"></div>
            <PerfumeImage 
              productId={999} 
              prompt="Masterpiece perfume bottle, 'Aura Scent' brand, centerpiece of a luxury photoshoot, rose and oud notes visual cues, premium cream and brown aesthetic."
              className="w-full h-auto rounded-[2rem] luxury-shadow object-cover aspect-[4/5]"
            />
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <span className="text-[10px] uppercase tracking-[0.4em] text-aura-rose mb-6 font-bold bg-aura-blush px-3 py-1 rounded-full">The Olfactory Atelier</span>
            <h1 className="text-5xl md:text-7xl font-serif text-aura-brown mb-8 leading-tight">
              About the <br/> Aura Scent
            </h1>
            <p className="text-aura-rose text-lg leading-relaxed mb-10 max-w-lg italic">
              Aura Scent is born from a passion for olfactory artistry. Our perfumes are curated for the sophisticated individual, blending traditional Middle Eastern notes with contemporary global elegance. Every bottle is a testament to the pursuit of the perfect aura.
            </p>
            <button 
              onClick={onShopNow}
              className="btn-luxury-brown px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold rounded-full"
            >
              Explore Products
            </button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 px-6 bg-aura-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <HighlightCard 
            icon={<Icons.Shipping />}
            title="Free Shipping"
            desc="Complimentary express delivery across all regions of Saudi Arabia."
          />
          <HighlightCard 
            icon={<Icons.Packaging />}
            title="Premium Packaging"
            desc="Exquisite unboxing experience with our signature velvet-lined boxes."
          />
          <HighlightCard 
            icon={<Icons.Quality />}
            title="Highest Quality"
            desc="Sourced from the finest global distilleries for unparalleled longevity."
          />
        </div>
      </section>

      {/* Past Purchases Section */}
      <section className="py-20 px-6 border-t border-aura-nude bg-aura-beige bg-opacity-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-aura-brown mb-2">Past Purchases</h2>
            <div className="w-16 h-px bg-aura-rose mx-auto opacity-30"></div>
          </div>
          
          {pastPurchases.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {pastPurchases.map(p => (
                <div key={p.id} className="text-center group">
                  <div className="relative aspect-square mb-3 overflow-hidden rounded-2xl bg-white p-2 border border-aura-nude transition-all duration-500 group-hover:border-aura-rose">
                    <PerfumeImage 
                      productId={p.id} 
                      prompt={p.imagePrompt} 
                      className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <h3 className="text-xs font-semibold text-aura-brown truncate uppercase tracking-widest">{p.name}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-aura-rose italic text-sm opacity-60">No past purchases found yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

const HighlightCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="text-center p-10 rounded-[2.5rem] bg-white border border-aura-nude hover:border-aura-rose hover:bg-aura-cream transition-all duration-300 group">
    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-aura-beige text-aura-brown mb-8 group-hover:scale-110 group-hover:bg-aura-blush transition-all duration-500">
      {icon}
    </div>
    <h3 className="text-xl font-serif text-aura-brown mb-4">{title}</h3>
    <p className="text-xs text-aura-rose leading-relaxed font-medium">{desc}</p>
  </div>
);

export default Home;
