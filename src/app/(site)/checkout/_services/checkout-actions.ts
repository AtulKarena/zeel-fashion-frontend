import API from "@/services/api";
import { z } from "zod";
import checkoutSchema from "./checkout-schema";
import { serverFetch } from "@/lib/server-fetch";
const createOrder = async (
  body: z.infer<typeof checkoutSchema.createOrderSchema>,
) => {
  console.log("Creating order with body:", body); // Debug log to inspect the request body
  try {
    const response = await serverFetch("/orders", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return response.data;
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
