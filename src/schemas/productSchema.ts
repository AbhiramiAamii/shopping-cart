import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  category: z.string(),
  rating: z.number(),
  thumbnail: z.string(),
});

export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
});
