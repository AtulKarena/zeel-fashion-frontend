import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string(),
  email: z.string().trim().email("Invalid email address"),
  phone: z
    .string()
    .trim()
    // E.164 format: +1234567890 (max 15 digits)
    .regex(/^\+?[1-9]\d{7,14}$/, "Invalid international phone number"),
});

export default {
  updateUserSchema,
};
