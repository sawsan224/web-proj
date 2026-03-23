
export type ScentType = 'Rose' | 'Lavender' | 'Fruity' | 'Musk' | 'Oud & Incense';

export interface Product {
  id: number;
  name: string;
  price: number;
  scent: ScentType;
  description: string;
  imagePrompt: string; // Used for AI generation
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
}

export type View = 'home' | 'products' | 'cart' | 'checkout' | 'contact' | 'admin' | 'login';
