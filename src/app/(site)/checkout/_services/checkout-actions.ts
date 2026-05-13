import API from "@/services/api";
import { z } from "zod";
import checkoutSchema from "./checkout-schema";
import { serverFetch } from "@/lib/server-fetch";
const createOrder = async (
  body: z.infer<typeof checkoutSchema.createOrderSchema>,
) => {
  try {
    const response = await serverFetch("/orders", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return response;
  } catch (error: any) {
    console.error("Error during login:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

export default {
  createOrder,
};
