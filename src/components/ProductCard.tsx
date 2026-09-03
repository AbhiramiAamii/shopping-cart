import type { Product } from "../types/product";
import { useCartStore, MAX_QUANTITY } from "../store/cartStore";
import { BUTTON_PRIMARY } from "../styles/classNames";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const quantityInCart =
    items.find((item) => item.id === product.id)?.quantity ?? 0;
  const atMaxQuantity = quantityInCart >= MAX_QUANTITY;

  return (
    <div className="flex flex-col h-full bg-white p-4 rounded-lg border border-sky">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-contain rounded-md mb-3 bg-white p-2"
      />
      <h3 className="font-semibold text-sm line-clamp-2">{product.title}</h3>
      <p className="text-xs text-teal capitalize">{product.category}</p>
      <p className="text-sm">⭐ {product.rating.toFixed(1)}</p>
      <p className="font-bold">${product.price.toFixed(2)}</p>
      <button
        type="button"
        onClick={() => addItem(product)}
        disabled={atMaxQuantity}
        className={`${BUTTON_PRIMARY} mt-auto w-full`}
      >
        {atMaxQuantity ? "Max quantity (5) reached" : "Add to Cart"}
      </button>
    </div>
  );
}
