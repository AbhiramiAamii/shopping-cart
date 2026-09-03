import type { Product } from "./product";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

// converts a fetched Product into a CartItem when added to cart
export function toCartItem(product: Product, quantity: number = 1): CartItem {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    quantity,
  };
}
