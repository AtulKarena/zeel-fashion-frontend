import { z } from "zod";
import API from "@/services/api";



const getPayments = async (page: number, limit: number, search: string) => {
  try {
    const response = await API.get(
      `/payment?page=${page}&limit=${limit}&search=${search}`,
      { withCredentials: true },
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching payments:", error);

    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const getPaymentById = async (id: string) => {
  try {
    const response = await API.get(`/payment/${id}`, {
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



const deletePayment = async (id: string) => {
  const response = await API.delete(`/payment/${id}`, {
    withCredentials: true,
  });

  return response.data;
};



export default {
  getPayments,
  deletePayment,
  getPaymentById,
};
