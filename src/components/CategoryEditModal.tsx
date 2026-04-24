import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categorySchema from "@/app/admin/categories/_servicecs/categorySchema";
import { useUpdateCategory } from "@/app/admin/categories/_servicecs/category-hooks";
import { z } from "zod";
import { X } from "lucide-react";

type Category = {
  _id: string;
  name: string;
  active: boolean;
};

type CategoryEditModalProps = {
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function CategoryEditModal({
  category,
  isOpen,
  onClose,
}: CategoryEditModalProps) {
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(categorySchema.categorySchema),
    defaultValues: {
      name: "",
      active: true,
    },
  });

  const mutation = useUpdateCategory(category?._id || "");

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        active: category.active,
      });
    }
  }, [category, reset]);

  const handleFormSubmit = async (
    data: z.infer<typeof categorySchema.categorySchema>,
  ) => {
    try {
      await mutation.mutateAsync(data);
      onClose();
    } catch (error) {
      // Error is already handled by the mutation
      console.error("Update failed:", error);
    }
  };

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Edit Category</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Category name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm"
              placeholder="Accessories"
              required
            />
            {formState.errors.name && (
              <p className="text-xs text-red-500">
                {formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3 text-sm font-semibold">
              <input
                type="checkbox"
                {...register("active")}
                className="h-4 w-4 rounded border-black/10 bg-black/5"
              />
              <span>Active</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-black/10 px-4 py-2 text-sm font-semibold hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {mutation.isPending ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
