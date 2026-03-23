
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface PerfumeImageProps {
  productId: number;
  prompt: string;
  className?: string;
  scent?: string;
}

/**
 * PERSISTENT STORAGE (IndexedDB)
 * Ensures images are never regenerated once successfully stored.
 */
const DB_NAME = 'AuraScent_FinalAssets_v5';
const STORE_NAME = 'permanent_images';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const getCachedImage = async (id: string): Promise<string | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  } catch { return null; }
};

const setCachedImage = async (id: string, data: string): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(data, id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) { console.error("Storage error:", err); }
};

/**
 * RATE LIMITING & QUEUE MANAGEMENT
 * Serializes all image generation requests across all components.
 */
interface QueueTask {
  id: string;
  prompt: string;
  onSuccess: (url: string) => void;
  onError: (msg: string) => void;
  onCooldown: (seconds: number) => void;
  onLoading: () => void;
}

const GLOBAL_QUEUE: QueueTask[] = [];
let IS_PROCESSING = false;
let NEXT_ALLOWED_TIME = 0;

const processQueue = async () => {
  if (IS_PROCESSING || GLOBAL_QUEUE.length === 0) return;
  IS_PROCESSING = true;

  while (GLOBAL_QUEUE.length > 0) {
    const now = Date.now();
    if (now < NEXT_ALLOWED_TIME) {
      const waitTime = Math.ceil((NEXT_ALLOWED_TIME - now) / 1000);
      GLOBAL_QUEUE.forEach(task => task.onCooldown(waitTime));
      await new Promise(r => setTimeout(r, 1000));
      continue;
    }

    const task = GLOBAL_QUEUE.shift();
    if (!task) continue;

    task.onLoading();

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: task.prompt }] }
      });

      let base64 = '';
      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          base64 = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (base64) {
        await setCachedImage(task.id, base64);
        task.onSuccess(base64);
        // Successful generation cooldown (10-15s to respect free tier)
        NEXT_ALLOWED_TIME = Date.now() + 12000;
      } else {
        throw new Error("Empty response");
      }
    } catch (err: any) {
      const msg = JSON.stringify(err);
      if (msg.includes('429') || msg.toLowerCase().includes('quota')) {
        // Strict backoff for 429
        NEXT_ALLOWED_TIME = Date.now() + 65000;
        GLOBAL_QUEUE.unshift(task); // Retry this one first
      } else {
        task.onError("Paused");
      }
    }
  }

  IS_PROCESSING = false;
};

const PerfumeImage: React.FC<PerfumeImageProps> = ({ productId, prompt, className, scent }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<'init' | 'queued' | 'loading' | 'cooling' | 'error' | 'success'>('init');
  const [wait, setWait] = useState(0);
  const cacheKey = `aura_final_v5_${productId}`;

  useEffect(() => {
    let active = true;

    const start = async () => {
      const cached = await getCachedImage(cacheKey);
      if (cached && active) {
        setImageUrl(cached);
        setStatus('success');
      } else if (active) {
        setStatus('queued');
        GLOBAL_QUEUE.push({
          id: cacheKey,
          prompt,
          onSuccess: (url) => { if (active) { setImageUrl(url); setStatus('success'); } },
          onError: () => { if (active) setStatus('error'); },
          onCooldown: (s) => { if (active) { setWait(s); setStatus('cooling'); } },
          onLoading: () => { if (active) setStatus('loading'); }
        });
        processQueue();
      }
    };

    start();
    return () => { active = false; };
  }, [productId, prompt]);

  if (status === 'success' && imageUrl) {
    return (
      <img 
        src={imageUrl} 
        alt={`Aura Scent - ${scent || 'Fragrance'}`} 
        className={`${className} transition-opacity duration-1000 opacity-100`}
        loading="lazy"
      />
    );
  }

  return (
    <div className={`${className} bg-aura-beige flex flex-col items-center justify-center p-6 text-center border border-aura-nude`}>
      <div className="space-y-3">
        {status === 'loading' ? (
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 border-2 border-aura-rose border-t-transparent rounded-full animate-spin mb-3"></div>
            <span className="text-[7px] uppercase tracking-[0.4em] text-aura-rose font-bold">Creating Aura...</span>
          </div>
        ) : status === 'cooling' ? (
          <div className="flex flex-col items-center">
            <div className="text-aura-rose opacity-20 text-xs italic mb-2">Refining Atelier</div>
            <span className="text-[9px] font-serif text-aura-brown">{wait}s</span>
          </div>
        ) : status === 'queued' ? (
          <div className="flex flex-col items-center opacity-30">
            <div className="flex gap-1 mb-2">
              <div className="w-1 h-1 bg-aura-rose rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-aura-rose rounded-full animate-pulse [animation-delay:200ms]"></div>
              <div className="w-1 h-1 bg-aura-rose rounded-full animate-pulse [animation-delay:400ms]"></div>
            </div>
            <span className="text-[6px] uppercase tracking-widest text-aura-rose">In Queue</span>
          </div>
        ) : status === 'error' ? (
          <div className="flex flex-col items-center">
            <span className="text-[7px] text-aura-rose uppercase tracking-widest opacity-40 mb-2">Retry Requested</span>
            <div className="w-1 h-1 bg-aura-rose rounded-full opacity-20"></div>
          </div>
        ) : (
          <div className="opacity-10 scale-90">
            <div className="font-serif text-aura-brown text-xl">Aura</div>
            <div className="text-[8px] uppercase tracking-[0.3em]">Scent</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfumeImage;
