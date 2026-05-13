import { z } from "zod";
import API from "@/services/api";
import { serverFetch } from "@/lib/server-fetch";

const getDashboard = async () => {
  try {
    const response = await serverFetch(`/dashboard/stats`, {
      method: "GET",
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching dashboard state:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const getLatestOrders = async () => {
  try {
    const response = await serverFetch(`/dashboard/latestOrders`, {
      method: "GET",
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching dashboard state:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

export default {
  getDashboard,
  getLatestOrders,
};
