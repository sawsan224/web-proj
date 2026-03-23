
import React, { useState } from 'react';
import { Product, Order, ScentType } from '../types';
import PerfumeImage from '../components/PerfumeImage';

interface AdminDashboardProps {
  inventory: Product[];
  orders: Order[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ inventory, orders, onUpdateProduct, onAddProduct, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    scent: 'Rose',
    description: '',
    stock: 0,
    imagePrompt: ''
  });

  const handleOpenAdd = () => {
    setFormData({ name: '', price: 300, scent: 'Rose', description: '', stock: 10, imagePrompt: '' });
    setEditingProduct(null);
    setShowAddModal(true);
  };

  const handleOpenEdit = (p: Product) => {
    setFormData(p);
    setEditingProduct(p);
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      id: editingProduct ? editingProduct.id : Date.now(),
      imagePrompt: formData.imagePrompt || `Luxury perfume bottle, 'Aura Scent' brand, ${formData.scent} theme aesthetic, premium studio lighting.`
    } as Product;

    if (editingProduct) {
      onUpdateProduct(productData);
    } else {
      onAddProduct(productData);
    }
    setShowAddModal(false);
  };

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-aura-nude pb-6 gap-6">
        <div>
          <h1 className="text-3xl font-serif text-aura-brown">Staff Dashboard</h1>
          <button onClick={onLogout} className="text-[10px] uppercase tracking-widest text-aura-rose hover:text-aura-brown font-bold mt-1">Logout</button>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'inventory' ? 'bg-aura-brown text-white' : 'bg-aura-beige text-aura-brown hover:bg-aura-nude'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'orders' ? 'bg-aura-brown text-white' : 'bg-aura-beige text-aura-brown hover:bg-aura-nude'}`}
          >
            Orders ({orders.length})
          </button>
          {activeTab === 'inventory' && (
            <button 
              onClick={handleOpenAdd}
              className="px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold bg-aura-rose text-white hover:opacity-90 transition-all"
            >
              + New Perfume
            </button>
          )}
        </div>
      </div>

      {activeTab === 'inventory' ? (
        <div className="bg-white rounded-[2rem] luxury-shadow overflow-hidden border border-aura-nude">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-aura-beige/50">
                <tr>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-aura-rose font-bold">Item</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-aura-rose font-bold">Category</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-aura-rose font-bold">Price</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-aura-rose font-bold">Stock</th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-aura-rose font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aura-beige">
                {inventory.map(p => (
                  <tr key={p.id} className="hover:bg-aura-cream transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-aura-beige rounded-lg overflow-hidden border border-aura-nude flex-shrink-0">
                           <PerfumeImage productId={p.id} prompt={p.imagePrompt} scent={p.scent} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-serif text-aura-brown text-lg">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[10px] uppercase tracking-widest text-aura-rose">{p.scent}</td>
                    <td className="px-8 py-6 text-sm font-bold text-aura-brown">{p.price} SAR</td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] px-3 py-1 rounded-full uppercase tracking-widest font-black ${p.stock > 10 ? 'bg-green-50 text-green-600' : p.stock > 0 ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <button 
                        onClick={() => handleOpenEdit(p)}
                        className="text-[10px] uppercase tracking-widest font-bold text-aura-brown hover:text-aura-rose underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[2rem] border border-aura-nude text-aura-rose italic luxury-shadow">
              The archive is currently empty.
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-white rounded-[2rem] border border-aura-nude p-10 luxury-shadow group hover:border-aura-rose transition-colors">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-aura-rose block mb-2 font-bold">Transaction {order.id}</span>
                    <h3 className="text-2xl font-serif text-aura-brown">{order.customer.name}</h3>
                    <p className="text-sm text-aura-rose mt-2 italic">{order.customer.address} • {order.customer.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-aura-rose mb-2 font-bold">{order.date}</p>
                    <p className="text-2xl font-serif text-aura-brown font-bold">{order.total} SAR</p>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap border-t border-aura-beige pt-6">
                  {order.items.map(item => (
                    <div key={item.id} className="text-[10px] uppercase tracking-widest bg-aura-beige px-4 py-2 rounded-full text-aura-brown font-bold border border-aura-nude">
                      {item.name} <span className="text-aura-rose ml-1 opacity-60">x {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal for Add/Edit */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-aura-brown/20 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-12 luxury-shadow border border-aura-nude relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowAddModal(false)} className="absolute top-8 right-8 text-aura-rose hover:text-aura-brown text-xl">&times;</button>
            <h2 className="text-3xl font-serif text-aura-brown mb-8">{editingProduct ? 'Edit Perfume' : 'New Collection Item'}</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-aura-rose mb-2 font-bold">Perfume Name</label>
                <input 
                  type="text" required
                  className="w-full bg-aura-cream border border-aura-nude rounded-xl p-4 outline-none focus:border-aura-brown"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-aura-rose mb-2 font-bold">Price (SAR)</label>
                <input 
                  type="number" required
                  className="w-full bg-aura-cream border border-aura-nude rounded-xl p-4 outline-none focus:border-aura-brown"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: parseInt(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-aura-rose mb-2 font-bold">Scent Category</label>
                <select 
                  className="w-full bg-aura-cream border border-aura-nude rounded-xl p-4 outline-none focus:border-aura-brown"
                  value={formData.scent}
                  onChange={e => setFormData({...formData, scent: e.target.value as ScentType})}
                >
                  <option value="Rose">Rose</option>
                  <option value="Lavender">Lavender</option>
                  <option value="Fruity">Fruity</option>
                  <option value="Musk">Musk</option>
                  <option value="Oud & Incense">Oud & Incense</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-aura-rose mb-2 font-bold">Stock Units</label>
                <input 
                  type="number" required
                  className="w-full bg-aura-cream border border-aura-nude rounded-xl p-4 outline-none focus:border-aura-brown"
                  value={formData.stock}
                  onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-aura-rose mb-2 font-bold">Description</label>
                <textarea 
                  rows={3} required
                  className="w-full bg-aura-cream border border-aura-nude rounded-xl p-4 outline-none focus:border-aura-brown"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit"
                  className="btn-luxury-brown w-full py-4 rounded-full uppercase tracking-[0.2em] text-xs font-bold"
                >
                  {editingProduct ? 'Save Changes' : 'Create Aura'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
