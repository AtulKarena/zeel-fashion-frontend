import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import checkoutActions from "./checkout-actions";
import checkoutSchema from "./checkout-schema";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
export const useOrderAdd = () => {
  const router = useRouter();
  const { setPaymentToken } = useAuth();

  const form = useForm({
    resolver: zodResolver(checkoutSchema.createOrderSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: undefined,
      address: "",
      city: "",
      zip: undefined,
      country: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: checkoutActions.createOrder,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess(data) {
      console.log("data:-", data.success);
      if (data.success) {
        setPaymentToken(data.paymentToken);
        router.push(`/checkout/payment?orderId=${data.orderId}`);
        return;
      } else {
        toast.error(data.message);
      }
    },
  });

  const onSubmit = async (
    body: z.infer<typeof checkoutSchema.createOrderSchema>,
  ) => {
    mutate(body);
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};
