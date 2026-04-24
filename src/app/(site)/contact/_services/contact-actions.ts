import { z } from "zod";
import API from "@/services/api";
import contactSchema from "./contact-schema";

const saveContact = async (
  body: z.infer<typeof contactSchema.saveContactSchema>,
) => {
  try {
    const response = await API.post("/contacts", body, {
      withCredentials: true,
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

export default {
  saveContact,
};
