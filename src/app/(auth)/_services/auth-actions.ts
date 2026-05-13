import authSchema from "../../../services/auth/auth-schema";
import { z } from "zod";
import API from "@/services/api";
import { serverFetch } from "@/lib/server-fetch";
/* const signup = async (body: z.infer<typeof authSchema.signUpSchema>) => {
  const response = await API.post();

  const data = await response.json();
  if (!response.ok) {
    const error = data as unknown as { message: string };
    throw new Error(error.message);
  }

  return data;
}; */

/* const login = async (body: z.infer<typeof authSchema.loginSchema>) => {
  try {
    const response = await API.post("/auth/login", body, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    console.error("Error during login:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
}; */
const login = async (body: z.infer<typeof authSchema.loginSchema>) => {
  try {
    // Calls Next.js route handler — not Express directly
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return { data }; // keep same shape so hooks don't break
  } catch (error: any) {
    throw new Error(error.message ?? "Something went wrong");
  }
};

/* const logout = async () => {
  try {
    await API.post("/auth/logout");

    return true;
  } catch (error: any) {
    console.error("Error during logout:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
}; */
const logout = async () => {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
    return true;
  } catch {
    throw new Error("Logout failed");
  }
};

const signup = async (body: z.infer<typeof authSchema.signUpSchema>) => {
  try {
    const response = await serverFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return response.data;
  } catch (error: any) {
    console.error("Error during signup:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

const mergeCart = async (cartItems: any[], mergeMode: string) => {
  try {
    const response = await serverFetch("/cart/merge", {
      method: "PUT",
      body: JSON.stringify({ items: cartItems, mergeMode }),
    });
    return response.data;
  } catch (error: any) {
    console.error("Error merging cart:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    // fallback
    throw new Error("Something went wrong");
  }
};

export default {
  login,
  logout,
  signup,
  mergeCart,
};
