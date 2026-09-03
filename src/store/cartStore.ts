import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../types/carts";
import type { Product } from "../types/product";

export const MAX_QUANTITY = 5;
export const MIN_QUANTITY = 1;

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);

          if (existing) {
            // Already in cart — bump quantity, but never above MAX_QUANTITY
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: Math.min(item.quantity + 1, MAX_QUANTITY),
                    }
                  : item,
              ),
            };
          }

          // Not in cart yet — add it with quantity 1
          const newItem: CartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
          };
          return { items: [...state.items, newItem] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
              : item,
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(item.quantity - 1, MIN_QUANTITY) }
              : item,
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // localStorage key
    },
  ),
);
