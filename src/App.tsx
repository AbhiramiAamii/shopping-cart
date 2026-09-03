import { useState, useCallback } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import type { ShippingFormValues } from "./schemas/shippingSchema";

type View = "home" | "cart" | "checkout";

function App() {
  const [view, setView] = useState<View>("home");
  const [searchTerm, setSearchTerm] = useState("");

  const clearSearch = useCallback(() => setSearchTerm(""), []);
  const [shipping, setShipping] = useState<ShippingFormValues | null>(null);

  return (
    <div className="min-h-screen bg-beige">
      <Header
        currentView={view}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showSearch={view === "home"}
        onNavigateHome={() => setView("home")}
        onNavigateCart={() => setView("cart")}
      />

      {view === "home" && (
        <HomePage searchTerm={searchTerm} onClearSearch={clearSearch} />
      )}

      {view === "cart" && (
        <CartPage
          onNavigateToCheckout={() => setView("checkout")}
          onContinueShopping={() => setView("home")}
        />
      )}

      {view === "checkout" && (
        <CheckoutPage
          shipping={shipping}
          setShipping={setShipping}
          onBackToCart={() => setView("cart")}
          onContinueShopping={() => {
            setShipping(null);
            setView("home");
          }}
        />
      )}
    </div>
  );
}

export default App;
