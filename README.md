# Everyday

A responsive shopping cart application built as an intern assignment. Browse and
filter products from a public API, manage a cart with quantity limits and
persistence, and complete a three-step checkout flow.

**Live demo:** https://shopping-cart-gamma-self.vercel.app/
**Repository:** https://github.com/AbhiramiAamii/shopping-cart.git

---

## Technologies used

| Tool | Purpose |
|---|---|
| React 19 + TypeScript | UI and type safety |
| Vite | Build tool and dev server |
| pnpm | Package manager |
| Tailwind CSS v4 | Styling |
| Zustand | Global cart state, with `persist` for localStorage |
| TanStack Query | Product fetching, caching, loading and error states |
| Zod | API response validation and shipping form validation |

## API used

[https://dummyjson.com/products](https://dummyjson.com/products)

All products are fetched once (`?limit=0`) and filtered, sorted, and paginated
in the browser. Filtering has to happen across the whole catalogue, so paging
server-side would only filter the current page.

The response is validated with Zod before use. If the shape doesn't match the
schema, `parse` throws, TanStack Query catches it, and the UI shows its error
state — so schema validation and error handling are the same code path.

## Setup

```bash
pnpm install
pnpm dev
```

The app runs at `http://localhost:5173`. No environment variables or backend
are needed.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Serve the production build locally |
| `pnpm lint` | Run ESLint |

## Features completed

**Product listing**
- Responsive grid, 10 products per page
- Image, title, category, rating, price, Add to Cart
- Loading (skeleton cards), API error (with retry), empty, and success states

**Search and filtering**
- Search by title, filter by category, filter by maximum price
- Clear all filters
- Categories derived from the fetched data, so the dropdown can't offer a
  category that has no products
- Logic lives in a custom hook, `useProductFilters`

**Cart management**
- Add, remove, increase, decrease, clear
- Quantity clamped to 1–5 per item in the Zustand store, with buttons disabled
  at the limits in the UI
- The cap is per item, not per cart

**Cart summary**
- Subtotal, tax (5%), discount (10% when subtotal is over $100), final total
- Checkout disabled below a $10 minimum, with a message naming the shortfall

**Persistence**
- Cart saved to localStorage via Zustand's `persist` middleware
- Survives a page refresh

**Checkout**
- Three steps: Cart Review → Shipping → Payment Summary
- Shipping form uses plain React state (no form library) with Zod validation
- Errors appear beneath their field, with the input border and `aria-invalid`
  reflecting the same state
- Errors show on submit, then clear live as each field becomes valid
- Payment Summary is read-only; Place Order shows a success message and clears
  the cart

**Bonus features**
- Pagination
- Skeleton loading
- Custom colour palette
