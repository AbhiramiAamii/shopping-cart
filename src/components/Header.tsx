import { useCartStore } from "../store/cartStore";

interface HeaderProps {
  currentView: "home" | "cart" | "checkout";
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  showSearch: boolean;
  onNavigateHome: () => void;
  onNavigateCart: () => void;
}

function Header({
  currentView,
  searchTerm,
  setSearchTerm,
  showSearch,
  onNavigateHome,
  onNavigateCart,
}: HeaderProps) {
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <header className="sticky top-0 z-10 bg-navy shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
        <button
          type="button"
          onClick={onNavigateHome}
          aria-current={currentView === "home" ? "page" : undefined}
          className="text-xl font-bold text-white shrink-0 hover:text-sky 
                     transition-colors"
        >
          Everyday
        </button>

        {showSearch && (
          <div className="flex-1 max-w-md">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <input
              id="product-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products"
              className="w-full px-3 py-2 rounded-md bg-teal/40 text-white placeholder-sky
                         border border-transparent focus:outline-none focus:ring-0
                         focus:bg-teal/60 transition-colors"
            />
          </div>
        )}

        <nav className="ml-auto shrink-0">
          <button
            type="button"
            onClick={onNavigateCart}
            aria-current={currentView === "cart" ? "page" : undefined}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
              currentView === "cart"
                ? "bg-white text-navy"
                : "text-white hover:bg-sky hover:text-navy"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>

            <span className="hidden sm:inline">Cart</span>

            {itemCount > 0 && (
              <span
                className="text-sm"
                aria-label={`${itemCount} items in cart`}
              >
                ({itemCount})
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
