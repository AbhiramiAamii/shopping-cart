import { z } from "zod";

export const shippingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(60, "Full name must be 60 characters or less")
    .regex(
      /^[a-zA-Z\s.'-]+$/,
      "Full name can only contain letters, spaces, . ' and -",
    ),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^[0-9+\-\s()]+$/,
      "Phone number can only contain digits and + - ( )",
    )
    .min(7, "Phone number is too short")
    .max(100, "Email must be 100 characters or less"),

  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .min(5, "Please enter a complete address")
    .max(200, "Address must be 200 characters or less"),

  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(60, "City must be 60 characters or less"),

  postalCode: z
    .string()
    .trim()
    .min(1, "Postal code is required")
    .regex(/^[0-9]{4,10}$/, "Postal code must be 4 to 10 digits"),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;

export const emptyShippingForm: ShippingFormValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};
