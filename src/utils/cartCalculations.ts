import type { CartItem } from "../types/carts";

const TAX_RATE = 0.05;
const DISCOUNT_RATE = 0.1;
const DISCOUNT_THRESHOLD = 100;
const MIN_CHECKOUT_VALUE = 10;

export function calculateItemTotal(item: CartItem): number {
  return item.price * item.quantity;
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
}

export function calculateTax(subtotal: number): number {
  return subtotal * TAX_RATE;
}

export function calculateDiscount(subtotal: number): number {
  return subtotal > DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;
}

export function calculateFinalTotal(subtotal: number): number {
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);
  return subtotal + tax - discount;
}

export function isCheckoutAllowed(subtotal: number): boolean {
  return subtotal >= MIN_CHECKOUT_VALUE;
}

export function getCheckoutDisabledMessage(subtotal: number): string | null {
  if (isCheckoutAllowed(subtotal)) return null;
  const remaining = (MIN_CHECKOUT_VALUE - subtotal).toFixed(2);
  return `Add $${remaining} more to reach the $${MIN_CHECKOUT_VALUE} minimum required to checkout.`;
}

// Convenience: one function that returns everything the Cart Summary needs
export function getCartSummary(items: CartItem[]) {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);
  const finalTotal = calculateFinalTotal(subtotal);
  const checkoutAllowed = isCheckoutAllowed(subtotal);
  const checkoutDisabledMessage = getCheckoutDisabledMessage(subtotal);

  return {
    subtotal,
    tax,
    discount,
    finalTotal,
    checkoutAllowed,
    checkoutDisabledMessage,
  };
}
