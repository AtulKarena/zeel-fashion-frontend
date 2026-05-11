import authSchema from "../../../services/auth/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import authActions from "./auth-actions";
import { getUserAction, checkUserLoggedInAction } from "@/lib/getUser";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
const signUpSchema = authSchema.signUpSchema.and(
  z.object({
    agree: z.boolean().refine((value) => value, {
      message: "You must agree to the terms and conditions",
    }),
  }),
);

export const useLogin = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const { setItems } = useCart();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof authSchema.loginSchema>>({
    resolver: zodResolver(authSchema.loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authActions.login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      console.log("Login successful, user data:", data.data.role);
      if (data.data.role === "admin") {
        router.push("/admin");
        return;
      } else if (data.data.role === "customer") {
        setIsLoggedIn(true);
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        queryClient.invalidateQueries({ queryKey: ["user"] });
        const rawCart = localStorage.getItem("zeel-fashion-cart");
        if (!rawCart) return;

        let parsedCart: any;

        try {
          parsedCart = JSON.parse(rawCart);
        } catch {
          console.warn("Invalid cart in localStorage");
          localStorage.removeItem("zeel-fashion-cart");
          return;
        }

        if (!parsedCart?.items) return;

        let mergeMode = "ignore";

        if (!parsedCart.isSyncedFromServer) {
          mergeMode = "merge";
        }
        if (mergeMode !== "ignore") {
          const newCarts = await authActions.mergeCart(parsedCart.items, mergeMode);
          setItems(newCarts.data.items);
        }
        localStorage.removeItem("zeel-fashion-cart");
        router.push("/");
      }
    },
  });

  const onSubmit = async (body: z.infer<typeof authSchema.loginSchema>) => {
    mutate(body);
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};

export const useSignup = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agree: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authActions.signup,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
      form.reset();
    },
  });

  const onSubmit = async (body: z.infer<typeof authSchema.signUpSchema>) => {
    mutate(body);
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};

/* export const useMergeCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authActions.mergeCart,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}; */

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserAction,
    staleTime: 0, // cache for 5 min
  });
};

export const useCheckUserLoggedIn = () => {
  return useQuery({
    queryKey: ["isLoggedIn"],
    queryFn: checkUserLoggedInAction,
    staleTime: 0, // cache for 5 min
  });
};
