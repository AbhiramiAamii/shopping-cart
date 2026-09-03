import { BUTTON_SECONDARY } from "../styles/classNames";
import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
  emptyMessage?: string;
}

const GRID_CLASSES =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

function ProductList({
  products,
  isLoading,
  isError,
  onRetry,
  emptyMessage = "No products found.",
}: ProductListProps) {
  if (isLoading) {
    return (
      <div className={GRID_CLASSES} role="status" aria-label="Loading products">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-sky p-4"
          >
            <div className="w-full h-48 bg-gray-200 rounded-md animate-pulse mb-3" />
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-9 bg-gray-200 rounded-md animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="p-8 bg-red-50 border border-red-200 rounded-lg text-center"
      >
        <p className="text-red-800 mb-4">
          Loading failed. Please check your connection and try again.
        </p>
        {onRetry && (
          <button type="button" onClick={onRetry} className={BUTTON_SECONDARY}>
            Try again
          </button>
        )}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-12 bg-white border border-sky rounded-lg text-center">
        <p className="text-teal">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={GRID_CLASSES}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
