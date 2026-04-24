import { z } from "zod";

const saveContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  message: z.string().min(1, "Message is required"),
});

export default {
  saveContactSchema,
};
