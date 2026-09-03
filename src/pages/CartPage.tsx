import { useCartStore } from "../store/cartStore";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { BUTTON_SECONDARY, BUTTON_PRIMARY } from "../styles/classNames";

interface CartPageProps {
  onNavigateToCheckout: () => void;
  onContinueShopping: () => void;
}

function CartPage({ onNavigateToCheckout, onContinueShopping }: CartPageProps) {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const handleClearCart = () => {
    const confirmed = window.confirm("Remove all items from your cart?");
    if (confirmed) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-navy mb-6">Your Cart</h1>

        <div className="p-12 bg-white border border-sky rounded-lg text-center">
          <p className="text-teal mb-6">Your cart is empty.</p>
          <button
            type="button"
            onClick={onContinueShopping}
            className={BUTTON_PRIMARY}
          >
            Continue shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-navy mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onContinueShopping}
              className={BUTTON_SECONDARY}
            >
              Continue shopping
            </button>
            <button
              type="button"
              onClick={handleClearCart}
              className={`${BUTTON_SECONDARY} sm:ml-auto text-red-600 border-red-300 hover:bg-red-50`}
            >
              Clear cart
            </button>
          </div>
        </div>

        <CartSummary onCheckout={onNavigateToCheckout} />
      </div>
    </main>
  );
}

export default CartPage;
