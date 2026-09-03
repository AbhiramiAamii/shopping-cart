import { ProductsResponseSchema } from "../schemas/productSchema";

export async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products?limit=0");

  const data = await response.json();

  return ProductsResponseSchema.parse(data);
}
