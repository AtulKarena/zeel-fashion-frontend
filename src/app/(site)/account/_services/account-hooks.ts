import authActions from "@/app/(auth)/_services/auth-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import accountActions from "./account-actions";
import profileSchema from "./profile-schema";

type User = {
  name: string;
  email: string;
  phone: number;
};

export const useProfile = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryFn: accountActions.getProfile,
    queryKey: ["profile"],
  });

  const form = useForm<z.infer<typeof profileSchema.updateUserSchema>>({
    resolver: zodResolver(profileSchema.updateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: '',
    },
  });

  const updateProfifleMutation = useMutation({
    mutationFn: accountActions.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const onSubmit = async (
    data: z.infer<typeof profileSchema.updateUserSchema>,
  ) => {
    updateProfifleMutation.mutate(data);
  };

  useEffect(() => {
    if (user) {
      form.reset({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      });
    }
  }, [user]);
  console.log("user:-", user);
  return {
    user: user as User,
    isLoading,
    form,
    onSubmit,
    isPending: updateProfifleMutation.isPending,
  };
};
