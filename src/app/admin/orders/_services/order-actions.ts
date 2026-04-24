import API from "@/services/api";

const getOrders = async (page: number, limit: number, search: string) => {
  try {
    const response = await API.get(
      `/orders?page=${page}&limit=${limit}&search=${search}`,
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

const deleteProduct = async (id: string) => {
  const response = await API.delete(`/orders/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

const getOrderById = async (id: string) => {
  try {
    const response = await API.get(`/orders/${id}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching order:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const updateOrderById = async (id: string, isDelivered: boolean) => {
  try {
    const response = await API.put(
      `/orders`,
      { id, isDelivered },
      {
        withCredentials: true,
      },
    );
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

export default {
  getOrders,
  deleteProduct,
  getOrderById,
  updateOrderById,
};
