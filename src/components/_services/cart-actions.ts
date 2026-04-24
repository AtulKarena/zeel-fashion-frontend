import API from "@/services/api";
import { z } from "zod";
import cartSchema from "./cart-schema";
import axios from "axios";

const addToCart = async (body: z.infer<typeof cartSchema.addToCartSchema>) => {
  try {
    const response = await API.post("/cart", body, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const getCart = async () => {
  try {
    const response = await API.get("/cart", { withCredentials: true });
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching cart:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const removeFromCart = async (productId: string) => {
  try {
    const response = await API.delete(`/cart/${productId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error removing from cart:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const updateCartItemQuantity = async (
  body: z.infer<typeof cartSchema.updateCartItemQuantitySchema>,
) => {
  try {
    const response = await API.post(`/cart/quantity`, body, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error updating cart item quantity:", error);
    if (axios.isAxiosError(error)) {
      console.log("Axios error response:", error.response?.data);
      const message = error.response?.data?.message || "Request failed";
      throw new Error(message);
    }

    // fallback
    throw new Error("Something went wrong");
  }
};

const clearCart = async () => {
  try {
    const response = await API.delete("/cart", {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error clearing cart:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

export default {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
};
