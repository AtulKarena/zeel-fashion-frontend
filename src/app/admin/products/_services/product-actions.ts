import { z } from "zod";
import API from "@/services/api";
import productSchema from "./product-schema";

const addProduct = async (
  body: z.infer<typeof productSchema.productAddSchema>,
) => {
  try {
    const formData = new FormData();

    // append normal fields
    formData.append("name", body.name);
    formData.append("description", body.description || "");
    formData.append("price", String(body.price));
    formData.append("category", body.category);
    formData.append("stock", String(body.stock));
    formData.append("reservedStock", String(body.reservedStock));
    formData.append("ratings", String(body.ratings));

    // arrays
    body.sizes?.forEach((size) => formData.append("sizes", size));
    body.colors?.forEach((color) => formData.append("colors", color));

    // 🔥 important: append files
    body.images?.forEach((file) => {
      formData.append("images", file);
    });

    const response = await API.post("/products", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating category:", error);

    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const getProducts = async (page: number, limit: number, search: string) => {
  try {
    const response = await API.get(
      `/products?page=${page}&limit=${limit}&search=${search}`,
      { withCredentials: true },
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching products:", error);

    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const getProductById = async (id: string) => {
  try {
    const response = await API.get(`/products/${id}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching product:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const getProductsByCategory = async () => {
  try {
    const response = await API.get("/products/home", { withCredentials: true });
    console.log("response:-", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching products by category:", error.response);

    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const deleteProduct = async (id: string) => {
  const response = await API.delete(`/products/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

const updateProduct = async (
  id: string,
  body: z.infer<typeof productSchema.productAddSchema>,
) => {
  try {
    const formData = new FormData();
    // append normal fields
    formData.append("name", body.name);
    formData.append("description", body.description || "");
    formData.append("price", String(body.price));
    formData.append("category", body.category);
    formData.append("stock", String(body.stock));
    formData.append("reservedStock", String(body.reservedStock));
    formData.append("ratings", String(body.ratings));
    formData.append("offer", String(JSON.stringify(body.offer)));
    // arrays
    body.sizes?.forEach((size) => formData.append("sizes", size));
    body.colors?.forEach((color) => formData.append("colors", color));
    // 🔥 important: append files

    body.images?.forEach((file) => {
      formData.append("images", file);
    });

    const response = await API.put(`/products/${id}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error updating product:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

export default {
  addProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct,
  getProductsByCategory,
};
