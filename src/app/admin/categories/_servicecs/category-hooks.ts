import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import categorySchema from "./categorySchema";
import categoryActions from "./category-actions";

export const useCategory = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(categorySchema.categorySchema),
    defaultValues: {
      name: "",
      active: true,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: categoryActions.createCategory,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess(data) {
      if (data.success) {
        router.push("/admin/categories");
        return;
      } else {
        toast.error(data.message || "Failed to create category");
      }
    },
  });

  const onSubmit = async (
    body: z.infer<typeof categorySchema.categorySchema>,
  ) => {
    mutate(body);
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};

export const useCategories = (page: number, limit: number, search: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryActions.getCategories(page, limit, search),
  });
  if (error) {
    toast.error(error.message);
  }
  console.log("Categories data in hook:", data); // Debug log to inspect the fetched categories data
  return {
    data,
    isLoading,
  };
};
export const useAllCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["all_categories"],
    queryFn: () => categoryActions.getAllCategories(),
  });
  if (error) {
    toast.error(error.message);
  }
  return {
    categories: data || [],
    isLoading,
  };
};

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body: z.infer<typeof categorySchema.categorySchema>) =>
      categoryActions.updateCategory(id, body),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return mutation;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => categoryActions.deleteCategory(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return mutation;
};
