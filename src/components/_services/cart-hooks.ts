import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/products";
import cartSchema from "./cart-schema";
import cartActions from "./cart-actions";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartActions.addToCart,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item added to cart");
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};

export const useCarts = () => {
  const query = useQuery({
    queryKey: ["cart"],
    queryFn: cartActions.getCart,
  });

  if (query.error) {
    toast.error((query.error as Error).message);
  }

  return query;
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartActions.removeFromCart,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed from cart");
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};

export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartActions.updateCartItemQuantity,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cart item quantity updated");
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartActions.clearCart,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cart cleared");
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};
