import { z } from "zod";
import { passwordSchema } from "../../lib/schema";

const signUpSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: z.string().nonempty("Email is required").email("Email is not valid"),
  password: passwordSchema,
  avatar: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Email is not valid"),
  password: passwordSchema,
});

export default {
  loginSchema,
  signUpSchema,
};
