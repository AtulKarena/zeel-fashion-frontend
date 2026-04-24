import { z } from "zod";

const productAddSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string().nonempty("Category is required"),
  stock: z.coerce
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),
  reservedStock: z.coerce
    .number()
    .int("Reserved Stock must be an integer")
    .nonnegative("Reserved Stock cannot be negative"),

  ratings: z.coerce
    .number()
    .min(0, "Ratings cannot be negative")
    .max(5, "Ratings cannot be more than 5")
    .optional(),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  images: z.array(z.instanceof(File)).optional(),
  offer: z
    .object({
      label: z.string(),
      percentOff: z.coerce.number().min(0).max(100),
    })
    .optional(),
});

export default {
  productAddSchema,
};
