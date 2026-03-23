
import React, { useState, useMemo } from 'react';
import { Product, ScentType } from '../types';
import { SCENT_COLORS } from '../constants.tsx';
import PerfumeImage from '../components/PerfumeImage';

interface ProductsPageProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, onAddToCart }) => {
  const [sortOrder, setSortOrder] = useState<'low' | 'high'>('low');
  const [filterScent, setFilterScent] = useState<ScentType | 'All'>('All');

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    
    if (filterScent !== 'All') {
      result = result.filter(p => p.scent === filterScent);
    }

    result.sort((a, b) => {
      return sortOrder === 'low' ? a.price - b.price : b.price - a.price;
    });

    return result;
  }, [products, sortOrder, filterScent]);

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <div>
          <h1 className="text-5xl font-serif text-aura-brown mb-4">Our Collection</h1>
          <p className="text-aura-rose italic">Discover your unique signature aura.</p>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="flex flex-col gap-1 w-full md:w-48">
            <label className="text-[10px] uppercase tracking-widest text-aura-rose font-bold">Sort by Price</label>
            <select 
              className="bg-white border border-aura-nude rounded-lg p-2 text-sm text-aura-brown outline-none focus:border-aura-brown transition-colors cursor-pointer"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
            >
              <option value="low">Low Price → High Price</option>
              <option value="high">High Price → Low Price</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full md:w-56">
            <label className="text-[10px] uppercase tracking-widest text-aura-rose font-bold">Scent Category</label>
            <select 
              className="bg-white border border-aura-nude rounded-lg p-2 text-sm text-aura-brown outline-none focus:border-aura-brown transition-colors cursor-pointer"
              value={filterScent}
              onChange={(e) => setFilterScent(e.target.value as any)}
            >
              <option value="All">All Perfumes</option>
              <option value="Rose">Rose Fragrances</option>
              <option value="Lavender">Lavender Fragrances</option>
              <option value="Fruity">Fruity Fragrances</option>
              <option value="Musk">Musk Fragrances</option>
              <option value="Oud & Incense">Oud & Incense (Bakhoor) Fragrances</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredAndSortedProducts.map(product => (
          <div 
            key={product.id} 
            className={`flex flex-col rounded-[2.5rem] overflow-hidden border transition-all hover:-translate-y-2 duration-500 luxury-shadow ${SCENT_COLORS[product.scent]}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden p-6">
              <PerfumeImage 
                productId={product.id} 
                prompt={product.imagePrompt} 
                scent={product.scent}
                className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-8 right-8 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black tracking-[0.2em] text-aura-brown border border-white/50 uppercase">
                {product.scent}
              </div>
            </div>
            
            <div className="px-8 pb-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-serif text-aura-brown mb-2">{product.name}</h3>
              <p className="text-aura-rose text-sm mb-6 flex-grow leading-relaxed italic">{product.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-serif text-aura-brown">
                  {product.price} <span className="text-[10px] uppercase tracking-widest font-sans">SAR</span>
                </span>
                <button 
                  onClick={() => onAddToCart(product)}
                  disabled={product.stock <= 0}
                  className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all font-bold ${
                    product.stock > 0 
                    ? 'btn-luxury-brown' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
