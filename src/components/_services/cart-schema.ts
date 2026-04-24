import { z } from "zod";

const addToCartSchema = z.object({
  productId: z.string().nonempty("Product ID is required"),
  quantity: z.coerce
    .number()
    .int()
    .positive("Quantity must be a positive integer"),
  size: z.string().nonempty("Size is required"),
  color: z.string().nonempty("Color is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
});

const updateCartItemQuantitySchema = z.object({
  productId: z.string().nonempty("Product ID is required"),
  quantity: z.coerce
    .number()
    .int()
    .positive("Quantity must be a positive integer"),
});
export default {
  addToCartSchema,
  updateCartItemQuantitySchema,
};
