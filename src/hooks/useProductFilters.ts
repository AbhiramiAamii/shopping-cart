import { useState, useMemo, useCallback } from "react";
import type { Product } from "../types/product";

export const ALL_CATEGORIES = "all";
export const PRODUCTS_PER_PAGE = 12;

export function useProductFilters(
  products: Product[],
  searchTerm: string,
  onClearSearch: () => void,
) {
  const [selectedCategory, setSelectedCategoryState] =
    useState<string>(ALL_CATEGORIES);
  const [maxPrice, setMaxPriceState] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const setSelectedCategory = useCallback((value: string) => {
    setSelectedCategoryState(value);
    setCurrentPage(1);
  }, []);

  const setMaxPrice = useCallback((value: number | null) => {
    setMaxPriceState(value);
    setCurrentPage(1);
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(products.map((product) => product.category));
    return Array.from(unique).sort();
  }, [products]);

  const highestPrice = useMemo(() => {
    if (products.length === 0) return 0;
    return Math.ceil(Math.max(...products.map((product) => product.price)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalisedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        normalisedSearch === "" ||
        product.title.toLowerCase().includes(normalisedSearch);

      const matchesCategory =
        selectedCategory === ALL_CATEGORIES ||
        product.category === selectedCategory;

      const matchesPrice = maxPrice === null || product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, maxPrice]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategory !== ALL_CATEGORIES ||
    maxPrice !== null;

  const clearFilters = useCallback(() => {
    onClearSearch();
    setSelectedCategoryState(ALL_CATEGORIES);
    setMaxPriceState(null);
    setCurrentPage(1);
  }, [onClearSearch]);

  return {
    selectedCategory,
    setSelectedCategory,
    maxPrice,
    setMaxPrice,
    categories,
    highestPrice,
    filteredProducts,
    paginatedProducts,
    currentPage: safePage,
    totalPages,
    goToPage,
    hasActiveFilters,
    clearFilters,
  };
}
