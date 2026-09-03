import { useCartStore } from "../store/cartStore";
import { BUTTON_PRIMARY } from "../styles/classNames";
import { getCartSummary } from "../utils/cartCalculations";

interface CartSummaryProps {
  onCheckout?: () => void;
  showCheckoutButton?: boolean;
}

const SUMMARY_ROW =
  "flex justify-between items-baseline py-2 text-sm text-gray-700";

function CartSummary({
  onCheckout,
  showCheckoutButton = true,
}: CartSummaryProps) {
  const items = useCartStore((state) => state.items);

  const {
    subtotal,
    tax,
    discount,
    finalTotal,
    checkoutAllowed,
    checkoutDisabledMessage,
  } = getCartSummary(items);

  return (
    <div className="bg-white p-6 rounded-lg border border-sky">
      <h2 className="text-lg font-semibold text-navy mb-2">Order Summary</h2>

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

      {showCheckoutButton && (
        <>
          <button
            type="button"
            onClick={onCheckout}
            disabled={!checkoutAllowed}
            className={`${BUTTON_PRIMARY} w-full mt-4`}
          >
            Proceed to Checkout
          </button>

          {checkoutDisabledMessage && (
            <p
              className="mt-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-2"
              role="status"
            >
              {checkoutDisabledMessage}
            </p>
          )}
          <p className="mt-2 text-xs text-teal text-center">
            Secure checkout, Free returns within 30 days
          </p>
        </>
      )}
    </div>
  );
}

export default CartSummary;
