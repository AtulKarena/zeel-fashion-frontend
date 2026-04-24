import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import productActions from "./product-actions";
import productSchema from "./product-schema";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/products";

export const useProductsAdd = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(productSchema.productAddSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      reservedStock: 0,
      sizes: [],
      colors: [],
      images: [],
      ratings: 0,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: productActions.addProduct,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess(data) {
      if (data.status) {
        router.push("/admin/products");
        return;
      } else {
        toast.error(data.message);
      }
    },
  });

  const onSubmit = async (
    body: z.infer<typeof productSchema.productAddSchema>,
  ) => {
    mutate(body);
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};

export const useProducts = (page: number, limit: number, search: string) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, limit, search],
    queryFn: () => productActions.getProducts(page, limit, search),
  });

  if (error) {
    toast.error(error.message);
  }

  const deleteProduct = useMutation({
    mutationFn: productActions.deleteProduct,
    mutationKey: ["products", "delete"],
    onSuccess() {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return {
    data,
    isLoading,
    deleteProduct: deleteProduct.mutate,
  };
};

export const useProductById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productActions.getProductById(id),
  });
  return {
    product: data as Product,
    isLoading,
    error,
  };
};

export const useDeleteProducts = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => productActions.deleteProduct(id),
    onError(error) {
      toast.error(error.message);
    },
    onSuccess() {
      toast.success("Product(s) deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return mutation;
};

export const useProductsEdit = (id: string) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(productSchema.productAddSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      reservedStock: 0,
      sizes: [],
      colors: [],
      images: [],
      ratings: 0,
      offer: {
        label: "",
        percentOff: 0,
      },
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (body: z.infer<typeof productSchema.productAddSchema>) =>
      productActions.updateProduct(id, body),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess(data) {
      if (data.status) {
        router.push("/admin/products");
        return;
      } else {
        toast.error(data.message);
      }
    },
  });

  const onSubmit = async (
    body: z.infer<typeof productSchema.productAddSchema>,
  ) => {
    mutate(body);
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};

export const useProductsByCategory = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: () => productActions.getProductsByCategory(),
  });

  if (error) {
    toast.error(error.message);
  }

  return {
    products: data || [],
    isLoading,
  };
};
