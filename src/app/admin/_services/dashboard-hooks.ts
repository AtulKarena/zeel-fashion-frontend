import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import dashboardActions from "./dashboard-actions";

type Stat = {
  label: string;
  value: string;
  note: string;
};

export const useDashboard = () => {
  const { data, isLoading, error } = useQuery<Stat[]>({
    queryKey: ["dashboard"],
    queryFn: dashboardActions.getDashboard,
  });

  if (error) {
    toast.error(error.message);
  }

  return {
    data,
    isLoading,
    error,
  };
};

export const useLatestOrders = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["latestOrders"],
    queryFn: dashboardActions.getLatestOrders,
  });
  if (error) {
    toast.error(error.message);
  }
  return {
    latestOrders: data || [],
    isLoad: isLoading,
  };
};
