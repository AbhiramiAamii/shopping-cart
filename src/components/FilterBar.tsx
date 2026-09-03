import { ALL_CATEGORIES } from "../hooks/useProductFilters";
import { BUTTON_SECONDARY, INPUT_BASE, LABEL_BASE } from "../styles/classNames";

interface FilterBarProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  maxPrice: number | null;
  setMaxPrice: (value: number | null) => void;
  categories: string[];
  highestPrice: number;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

function FilterBar({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  categories,
  highestPrice,
  hasActiveFilters,
  clearFilters,
}: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-sky mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
      <div>
        <label htmlFor="category-filter" className={LABEL_BASE}>
          Category
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className={`${INPUT_BASE} capitalize`}
        >
          <option value={ALL_CATEGORIES}>All categories</option>
          {categories.map((category) => (
            <option key={category} value={category} className="capitalize">
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="price-filter" className={LABEL_BASE}>
          Max price: {maxPrice === null ? "Any" : `$${maxPrice}`}
        </label>
        <input
          id="price-filter"
          type="range"
          min={0}
          max={highestPrice}
          value={maxPrice ?? highestPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          disabled={highestPrice === 0}
          className="w-full h-2 mt-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-navy disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className={`${BUTTON_SECONDARY} w-full`}
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
