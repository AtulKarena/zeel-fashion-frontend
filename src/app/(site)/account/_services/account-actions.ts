import { z } from "zod";
import API from "@/services/api";
import profileSchema from "./profile-schema";

const getProfile = async () => {
  try {
    const response = await API.get(
      `/profile`,
      { withCredentials: true },
    );
    return response.data.data;
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
    const response = await API.put(`/profile/update-profile`, body, {
      withCredentials: true,
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
