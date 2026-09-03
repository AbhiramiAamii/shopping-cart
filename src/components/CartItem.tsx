import type { CartItem as CartItemType } from "../types/carts";
import { useCartStore, MAX_QUANTITY, MIN_QUANTITY } from "../store/cartStore";
import { calculateItemTotal } from "../utils/cartCalculations";
import { BUTTON_ICON } from "../styles/classNames";

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const itemTotal = calculateItemTotal(item);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 bg-white p-4 rounded-lg border border-sky">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded bg-white shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-navy truncate">{item.title}</h3>
        <p className="text-sm text-teal">${item.price.toFixed(2)} each</p>

        <button
          type="button"
          onClick={() => removeItem(item.id)}
          aria-label={`Remove ${item.title} from cart`}
          className="mt-1 text-sm text-red-600 hover:text-red-700 hover:underline"
        >
          Remove
        </button>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 ml-20 sm:ml-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            disabled={item.quantity <= MIN_QUANTITY}
            aria-label={`Decrease quantity of ${item.title}`}
            className={BUTTON_ICON}
          >
            −
          </button>

          <span className="w-8 text-center font-medium" aria-live="polite">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            disabled={item.quantity >= MAX_QUANTITY}
            aria-label={`Increase quantity of ${item.title}`}
            className={BUTTON_ICON}
          >
            +
          </button>
        </div>

        <p className="font-semibold text-navy tabular-nums sm:w-20 sm:text-right">
          ${itemTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default CartItem;
