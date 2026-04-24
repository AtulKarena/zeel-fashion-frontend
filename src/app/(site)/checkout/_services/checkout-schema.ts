import { z } from "zod";

const createOrderSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required"),

  email: z.string().trim().email("Invalid email address"),

  phone: z
    .string()
    .trim()
    // E.164 format: +1234567890 (max 15 digits)
    .regex(/^\+?[1-9]\d{7,14}$/, "Invalid international phone number"),

  address: z.string().trim().min(1, "Address is required"),

  city: z.string().trim().min(1, "City is required"),

  zip: z
    .string()
    .trim()
    // Flexible: allows letters, numbers, spaces, hyphens
    .regex(/^\d{6}$/, "PIN code must be 6 digits"),

  country: z.string().trim().min(1, "Country is required"),
  checkoutToken: z.string(),
});

export default {
  createOrderSchema,
};
