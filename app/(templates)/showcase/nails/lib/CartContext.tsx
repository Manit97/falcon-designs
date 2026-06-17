"use client";
import { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "./data";

export type CartItem = { product: Product; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((p: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === p.id);
      if (existing) return prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product: p, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.product.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    if (qty < 1) { remove(id); return; }
    setItems(prev => prev.map(i => i.product.id === id ? { ...i, qty } : i));
  }, [remove]);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <Ctx.Provider value={{ items, count, total, add, remove, setQty, clear, open, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
