import API from "@/services/api";
import { serverFetch } from "@/lib/server-fetch";
const getInventory = async (page: number, limit: number, search: string) => {
  try {
    const response = await serverFetch(
      `/products/inventory?page=${page}&limit=${limit}&search=${search}`,
      { method: "GET" },
    );
    return response;
  } catch (error: any) {
    console.error("Error fetching inventory:", error);

    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const updateStock = async (
  productId: string,
  quantity: number,
  type: "add" | "reduce",
) => {
  try {
    const response = await serverFetch(`/products/inventory/update-stock`, {
      method: "PUT",
      body: JSON.stringify({ productId, quantity, type }),
    });

    return response.data;
  } catch (error: any) {
    console.error("Error updating stock:", error);

    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }

    throw new Error("Something went wrong");
  }
};

export default {
  getInventory,
  updateStock,
};
