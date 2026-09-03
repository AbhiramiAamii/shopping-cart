import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { getCartSummary, calculateItemTotal } from "../utils/cartCalculations";
import type { ShippingFormValues } from "../schemas/shippingSchema";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import ShippingForm from "../components/ShippingForm";
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from "../styles/classNames";

type CheckoutStep = "review" | "shipping" | "payment";

interface CheckoutPageProps {
  shipping: ShippingFormValues | null;
  setShipping: (values: ShippingFormValues | null) => void;
  onBackToCart: () => void;
  onContinueShopping: () => void;
}

const PAGE = "max-w-4xl mx-auto px-4 py-6";
const HEADING = "text-2xl font-bold text-navy mb-6";
const CARD = "bg-white p-6 rounded-lg border border-sky";
const SUMMARY_ROW =
  "flex justify-between items-baseline py-2 text-sm text-gray-700";

function CheckoutPage({
  shipping,
  setShipping,
  onBackToCart,
  onContinueShopping,
}: CheckoutPageProps) {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [step, setStep] = useState<CheckoutStep>("review");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    subtotal,
    tax,
    discount,
    finalTotal,
    checkoutAllowed,
    checkoutDisabledMessage,
  } = getCartSummary(items);

  const handleShippingSubmit = (values: ShippingFormValues) => {
    setShipping(values);
    setStep("payment");
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  const stepClasses = (target: CheckoutStep) =>
    step === target ? "font-semibold text-teal" : "text-gray-400";

  if (orderPlaced) {
    return (
      <main className={PAGE}>
        <div className="p-12 bg-white border border-sky rounded-lg text-center">
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-navy mb-2">Order placed</h1>
          <p role="status" className="text-gray-700 mb-1">
            Thank you{shipping ? `, ${shipping.fullName}` : ""}. Your order has
            been placed successfully.
          </p>
          <p className="text-sm text-teal mb-6">
            A confirmation will be sent to {shipping?.email}.
          </p>
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

  if (items.length === 0) {
    return (
      <main className={PAGE}>
        <h1 className={HEADING}>Checkout</h1>
        <div className="p-12 bg-white border border-sky rounded-lg text-center">
          <p className="text-teal mb-6">
            Your cart is empty. Add some products before checking out.
          </p>
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
    <main className={PAGE}>
      <h1 className={HEADING}>Checkout</h1>

      <ol className="flex items-center gap-2 sm:gap-4 mb-6 text-sm">
        <li className={stepClasses("review")}>1. Cart Review</li>
        <span className="text-gray-300" aria-hidden="true">
          {">"}
        </span>
        <li className={stepClasses("shipping")}>2. Shipping</li>
        <span className="text-gray-300" aria-hidden="true">
          {">"}
        </span>
        <li className={stepClasses("payment")}>3. Payment Summary</li>
      </ol>

      {step === "review" && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-navy">Cart Review</h2>

          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <CartSummary showCheckoutButton={false} />

          {checkoutDisabledMessage && (
            <p
              className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3"
              role="status"
            >
              {checkoutDisabledMessage}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onBackToCart}
              className={BUTTON_SECONDARY}
            >
              Back to cart
            </button>
            <button
              type="button"
              onClick={() => setStep("shipping")}
              className={`${BUTTON_PRIMARY} sm:ml-auto`}
              disabled={!checkoutAllowed}
            >
              Continue to shipping
            </button>
          </div>
        </section>
      )}

      {step === "shipping" && (
        <ShippingForm
          initialValues={shipping ?? undefined}
          onSubmit={handleShippingSubmit}
          onBack={() => setStep("review")}
        />
      )}

      {step === "payment" && shipping && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-navy">Payment Summary</h2>

          <div className={CARD}>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">
              Shipping to
            </h3>
            <div className="text-sm text-gray-700 space-y-0.5 wrap-break-word">
              <p className="font-medium text-navy">{shipping.fullName}</p>
              <p>{shipping.address}</p>
              <p>
                {shipping.city} {shipping.postalCode}
              </p>
              <p>{shipping.email}</p>
              <p>{shipping.phone}</p>
            </div>
          </div>

          <div className={CARD}>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">
              Items
            </h3>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-baseline gap-4 py-2 text-sm text-gray-700 border-b border-gray-100 last:border-0"
              >
                <span className="truncate">
                  {item.title} × {item.quantity}
                </span>
                <span className="tabular-nums shrink-0">
                  ${calculateItemTotal(item).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className={CARD}>
            <div className={SUMMARY_ROW}>
              <span>Subtotal</span>
              <span className="tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <div className={SUMMARY_ROW}>
              <span>Tax (5%)</span>
              <span className="tabular-nums">${tax.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className={`${SUMMARY_ROW} text-green-700`}>
                <span>Discount (10%)</span>
                <span className="tabular-nums">−${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-3 mt-2 border-t border-sky text-base font-semibold text-navy">
              <span>Total</span>
              <span className="tabular-nums">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setStep("shipping")}
              className={BUTTON_SECONDARY}
            >
              Back to shipping
            </button>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className={`${BUTTON_PRIMARY} sm:ml-auto`}
            >
              Place Order
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default CheckoutPage;
