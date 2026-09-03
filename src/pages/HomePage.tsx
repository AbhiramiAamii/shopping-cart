import { useProducts } from "../hooks/useProducts";
import {
  PRODUCTS_PER_PAGE,
  useProductFilters,
} from "../hooks/useProductFilters";
import FilterBar from "../components/FilterBar";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";

interface HomePageProps {
  searchTerm: string;
  onClearSearch: () => void;
}

function HomePage({ searchTerm, onClearSearch }: HomePageProps) {
  const { data, isLoading, isError, refetch } = useProducts();

  const {
    selectedCategory,
    setSelectedCategory,
    maxPrice,
    setMaxPrice,
    categories,
    highestPrice,
    paginatedProducts,
    currentPage,
    totalPages,
    goToPage,
    filteredProducts,
    hasActiveFilters,
    clearFilters,
  } = useProductFilters(data?.products ?? [], searchTerm, onClearSearch);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-navy mb-6">Products</h1>

      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        categories={categories}
        highestPrice={highestPrice}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
      />

      {!isLoading && !isError && (
        <p className="text-sm text-teal mb-4">
          Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
          {Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)}{" "}
          of {filteredProducts.length}
          products
        </p>
      )}

      <ProductList
        products={paginatedProducts}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        emptyMessage={
          hasActiveFilters
            ? "No products match your search or filters."
            : "No products found."
        }
      />

      {!isLoading && !isError && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </main>
  );
}

export default HomePage;
