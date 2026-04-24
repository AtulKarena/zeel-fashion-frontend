import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Payment } from "@/lib/products";
import paymentActions from "./payment-actions";





export const usePayments = (page: number, limit: number, search: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["payments", page, limit, search],
    queryFn: () => paymentActions.getPayments(page, limit, search),
  });

  if (error) {
    toast.error(error.message);
  }

  return {
    data,
    isLoading,
  };
};

export const usePaymentById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["payment", id],
    queryFn: () => paymentActions.getPaymentById(id),
  });
  return {
    product: data as Payment,
    isLoading,
    error,
  };
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => paymentActions.deletePayment(id),
    onError(error) {
      toast.error(error.message);
    },
    onSuccess() {
      toast.success("Payment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });

  return mutation;
};



