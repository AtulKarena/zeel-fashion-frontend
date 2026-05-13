import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import orderActions from "./order-actions";
import { toast } from "sonner";
import { Order } from "@/lib/products";

export const useOrders = (page: number, limit: number, search: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", page, limit, search],
    queryFn: () => orderActions.getOrders(page, limit, search),
  });

  if (error) {
    toast.error(error.message);
  }

  return {
    data,
    isLoading,
  };
};

export const useDeleteOrders = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => orderActions.deleteProduct(id),
    onError(error) {
      toast.error(error.message);
    },
    onSuccess() {
      toast.success("Order(s) deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return mutation;
};

export const useOrderById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["order", id],
    queryFn: () => orderActions.getOrderById(id),
  });
  console.log("Fetched order data:", data); // Debug log to inspect the fetched order data
  return {
    order: data as Order,
    isLoading,
    error,
  };
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isDelivered }: { id: string; isDelivered: boolean }) =>
      orderActions.updateOrderById(id, isDelivered),

    onError(error: any) {
      toast.error(error.message);
    },

    onSuccess() {
      toast.success("Order updated successfully");
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
};
