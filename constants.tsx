
import React from 'react';
import { Product } from './types';

export const PRODUCTS: Product[] = [
  // Rose Fragrances
  {
    id: 1,
    name: "Petals of Aura",
    price: 380,
    scent: 'Rose',
    description: "A fresh morning bloom of Damascus roses.",
    imagePrompt: "A realistic luxury perfume bottle. The bottle is clear glass. On the front, there is a minimalist white label with the text 'Aura Scent' clearly written. The liquid inside is soft pink. The background is an elegant studio setting with soft pink floral tones and rose petals. High-end product photography style.",
    stock: 20
  },
  {
    id: 2,
    name: "Rose Velvet",
    price: 450,
    scent: 'Rose',
    description: "Deep, sultry rose notes with a hint of white musk.",
    imagePrompt: "A premium perfume bottle designed by you. The bottle has a frosted pink glass texture and a rose-gold cap. The brand name 'Aura Scent' is prominently visible on the front label. The lighting is cinematic with deep pink and velvet tones in the background. Professional luxury fragrance shot.",
    stock: 15
  },
  // Lavender Fragrances
  {
    id: 3,
    name: "Serene Lavender",
    price: 290,
    scent: 'Lavender',
    description: "Calming French lavender for a peaceful aura.",
    imagePrompt: "A realistic elegant perfume bottle. The glass is light purple and calming. The brand name 'Aura Scent' is clearly printed in silver on the front. The background is a minimalist studio with purple and lavender tones. Calm, luxury aesthetic.",
    stock: 25
  },
  {
    id: 4,
    name: "Midnight Mist",
    price: 320,
    scent: 'Lavender',
    description: "Lavender blended with cool night air and vanilla.",
    imagePrompt: "A modern cylindrical perfume bottle with deep purple glass. The brand name 'Aura Scent' is visible on the bottle. The aesthetic is calming purple tones with a midnight feel. Studio lighting with a soft mystical glow.",
    stock: 18
  },
  // Fruity Fragrances
  {
    id: 5,
    name: "Citrus Sparkle",
    price: 260,
    scent: 'Fruity',
    description: "Zesty orange and bright bergamot.",
    imagePrompt: "A vibrant luxury perfume bottle. The liquid is bright and fresh yellow-orange. The bottle has the brand name 'Aura Scent' clearly displayed. The background is a fresh, light, and vibrant studio setting with bright airy tones. High-resolution product shot.",
    stock: 30
  },
  {
    id: 6,
    name: "Berry Essence",
    price: 275,
    scent: 'Fruity',
    description: "Sweet wild berries with a touch of green apple.",
    imagePrompt: "A luxury perfume bottle with fresh, vibrant berry red gradient glass. The brand name 'Aura Scent' is written on the label. The scene is fresh and fruity with light, vibrant aesthetic tones. Professional commercial photography.",
    stock: 22
  },
  // Musk Fragrances
  {
    id: 7,
    name: "Silk Musk",
    price: 410,
    scent: 'Musk',
    description: "Clean, powdery white musk for ultimate elegance.",
    imagePrompt: "A realistic perfume bottle with opaque milky white glass. The brand name 'Aura Scent' is elegantly displayed on the front. The overall aesthetic uses soft nude and neutral tones. High-end minimalist luxury studio setting.",
    stock: 12
  },
  {
    id: 8,
    name: "Golden Musk",
    price: 435,
    scent: 'Musk',
    description: "Warm skin musk with hints of amber.",
    imagePrompt: "A heavy square perfume bottle with soft beige and nude tones. The brand name 'Aura Scent' is prominent. The aesthetic is soft neutral tones with cream studio lighting. Warm and elegant musk-themed shot.",
    stock: 10
  },
  // Oud & Incense Fragrances
  {
    id: 9,
    name: "Majestic Oud",
    price: 650,
    scent: 'Oud & Incense',
    description: "Rich Agarwood sourced from the deep forests.",
    imagePrompt: "A luxury perfume bottle with heavy dark brown glass and a wood cap. The brand name 'Aura Scent' is engraved in gold on the bottle. The aesthetic is deep brown, warm, and smoky. Premium studio lighting with dark wood textures.",
    stock: 8
  },
  {
    id: 10,
    name: "Royal Bakhoor",
    price: 580,
    scent: 'Oud & Incense',
    description: "Traditional incense notes with a modern twist.",
    imagePrompt: "A premium perfume bottle with deep amber and dark brown glass. The brand name 'Aura Scent' is visible on a luxury gold label. The background is warm and smoky with brown tones. Royal incense-themed product shot.",
    stock: 14
  },
  {
    id: 11,
    name: "Desert Smoke",
    price: 520,
    scent: 'Oud & Incense',
    description: "The essence of burning oud in a desert breeze.",
    imagePrompt: "A smoky brown glass perfume bottle. The brand name 'Aura Scent' is clearly written on the front. The background is deep brown, warm, and smoky. Luxury fragrance photography with artistic smoke elements.",
    stock: 11
  },
  {
    id: 12,
    name: "Oud Noir",
    price: 690,
    scent: 'Oud & Incense',
    description: "Our most intense and precious oud blend.",
    imagePrompt: "A prestige perfume bottle with matte black and deep brown glass. The brand name 'Aura Scent' is printed in gold. The lighting is warm and smoky, focused on the bottle. Deep brown and dark luxury aesthetic.",
    stock: 5
  }
];

export const SCENT_COLORS: Record<string, string> = {
  Rose: 'bg-[#FFF5F7] border-[#FCE7EB]',
  Lavender: 'bg-[#F9F7FF] border-[#F1EBFF]',
  Fruity: 'bg-[#FFF9F2] border-[#FFF1E0]',
  Musk: 'bg-[#FAF9F6] border-[#F5F1ED]',
  'Oud & Incense': 'bg-[#F7F4F1] border-[#EFE9E4]'
};

export const Icons = {
  Shipping: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 012 2v1m-2-3H4m16 0l-2 2m-2-2l2-2M4 13a2 2 0 00-2 2v1m2-3l2 2m-2-2l-2-2" />
    </svg>
  ),
  Packaging: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Quality: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a.747.747 0 00-1.012-.624l-1.615.656a.747.747 0 01-.722-.11L3.064 3.425a.747.747 0 00-1.127.422l-.466 1.678a.747.747 0 01-.482.522l-1.688.428a.747.747 0 00-.422 1.127l1.196 1.422a.747.747 0 01.11.722l-.656 1.615a.747.747 0 00.624 1.012l1.678.466a.747.747 0 01.522.482l.428 1.688a.747.747 0 001.127.422l1.422-1.196a.747.747 0 01.722-.11l1.615.656z" />
    </svg>
  )
};
