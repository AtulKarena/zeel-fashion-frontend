import { z } from "zod";
import API from "@/services/api";
import { serverFetch } from "@/lib/server-fetch";

const getPayments = async (page: number, limit: number, search: string) => {
  try {
    const response = await serverFetch(
      `/payment?page=${page}&limit=${limit}&search=${search}`,
      { method: "GET" },
    );
    return response;
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
    const response = await serverFetch(`/payment/${id}`, {
      method: "GET",
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
  const response = await serverFetch(`/payment/${id}`, {
    method: "DELETE",
  });

  return response;
};

export default {
  getPayments,
  deletePayment,
  getPaymentById,
};
