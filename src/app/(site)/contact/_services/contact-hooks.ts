import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import contactSchema from "./contact-schema";
import contactActions from "./contact-actions";

export const useContactSave = () => {
  const form = useForm({
    resolver: zodResolver(contactSchema.saveContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: contactActions.saveContact,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess(data) {
      form.reset();
      toast.error(data.message);
    },
  });

  const onSubmit = async (
    body: z.infer<typeof contactSchema.saveContactSchema>,
  ) => {
    mutate(body);
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};
