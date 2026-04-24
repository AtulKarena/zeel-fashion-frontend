import { z } from "zod";
import API from "@/services/api";

const getDashboard = async () => {
  try {
    const response = await API.get(`/dashboard/stats`, {
      withCredentials: true,
    });
    return response.data.data;
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
    const response = await API.get(`/dashboard/latestOrders`, {
      withCredentials: true,
    });
    return response.data.data;
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
