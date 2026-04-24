import { z } from "zod";
import API from "@/services/api";
import categorySchema from "./categorySchema";

const createCategory = async (
  body: z.infer<typeof categorySchema.categorySchema>,
) => {
  try {
    const response = await API.post("/categories", body, {
      withCredentials: true,
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
    const response = await API.get(
      `/categories?page=${page}&limit=${limit}&search=${search}`,
      { withCredentials: true },
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch categories");
    }
    return response.data; // Assuming the categories are in the 'data' field of the response
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
    const response = await API.get(`/categories/all`, {
      withCredentials: true,
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
    const response = await API.put(`/categories/${id}`, body, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

const deleteCategory = async (id: string) => {
  try {
    const response = await API.delete(`/categories/${id}`, {
      withCredentials: true,
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
