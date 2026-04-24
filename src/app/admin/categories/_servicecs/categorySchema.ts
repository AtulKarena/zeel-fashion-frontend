import { z } from "zod";

const categorySchema = z.object({
  name: z.string().nonempty("Name is required"),
  active: z.boolean().default(true),
});

export default {
  categorySchema,
};
