import { z } from "zod";
import API from "@/services/api";
import profileSchema from "./profile-schema";
import { serverFetch } from "@/lib/server-fetch";

const getProfile = async () => {
  try {
    const response = await serverFetch(`/profile`, { method: "GET" });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching profile:", error);

    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const updateProfile = async (
  body: z.infer<typeof profileSchema.updateUserSchema>,
) => {
  try {
    const response = await serverFetch(`/profile/update-profile`, {
      method: "PUT",
      body: JSON.stringify(body),
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
  getProfile,
  updateProfile,
};
