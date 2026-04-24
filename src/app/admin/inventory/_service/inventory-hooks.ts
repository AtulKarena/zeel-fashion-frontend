import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import inventoryActions from "./inventory-actions";
import { Inventory } from "@/lib/products";

export const useInventory = (page: number, limit: number, search: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["inventory", page, limit, search],
    queryFn: () => inventoryActions.getInventory(page, limit, search),
  });

  if (error) {
    toast.error(error.message);
  }

  return {
    data,
    isLoading,
  };
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
      type,
    }: {
      productId: string;
      quantity: number;
      type: "add" | "reduce";
    }) => inventoryActions.updateStock(productId, quantity, type),

    onSuccess: (data, variables) => {
      toast.success(
        variables.type === "add"
          ? "Stock added successfully"
          : "Stock reduced successfully",
      );

      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to update stock");
    },
  });

  return {
    updateStock: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};