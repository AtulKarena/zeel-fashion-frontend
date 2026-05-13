import { z } from "zod";
import API from "@/services/api";
import categorySchema from "./categorySchema";
import { serverFetch } from "@/lib/server-fetch";
const createCategory = async (
  body: z.infer<typeof categorySchema.categorySchema>,
) => {
  try {
    const response = await serverFetch("/categories", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return response.data;
  } catch (error: any) {
    console.error("Error creating category:", error);

    // ✅ Handle server response message properly
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const getCategories = async (page: number, limit: number, search: string) => {
  try {
    const response = await serverFetch(
      `/categories?page=${page}&limit=${limit}&search=${search}`,
      { method: "GET" },
    );
    console.log("Fetched categories response:", response); // Debug log to inspect the response structure
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch categories");
    }
    return response; // Assuming the categories are in the 'data' field of the response
  } catch (error: any) {
    console.error("Error fetching products:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const getAllCategories = async () => {
  try {
    const response = await serverFetch(`/categories/all`, {
      method: "GET",
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch categories");
    }
    return response.data.data; // Assuming the categories are in the 'data' field of the response
  } catch (error: any) {
    console.error("Error fetching products:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const updateCategory = async (
  id: string,
  body: z.infer<typeof categorySchema.categorySchema>,
) => {
  try {
    const response = await serverFetch(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

const deleteCategory = async (id: string) => {
  try {
    const response = await serverFetch(`/categories/${id}`, {
      method: "DELETE",
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export default {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
