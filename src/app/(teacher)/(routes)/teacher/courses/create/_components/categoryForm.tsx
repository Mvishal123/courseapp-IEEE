"use client";

import { useState } from "react";
import { Pencil, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { ComboboxDemo } from "@/components/ui/combobox";

interface CategorySectionProps {
  initialValue: string;
  courseId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

const CategorySection = ({
  initialValue,
  courseId,
  options,
}: CategorySectionProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialValue || "", // Ensure initial value is truthy
    },
  });

  const handleEdit = () => setIsEdit((prev) => !prev);

  const selectedOption = options.find(
    (option) => option.value === initialValue
  );

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/create/${courseId}`, {
        category: data.categoryId,
      });
      toast.success("Category added successfully");
      handleEdit();
      router.refresh();
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-4 rounded-lg bg-slate-100 px-4 py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Course Category</h1>
        <Button variant={"ghost"} onClick={handleEdit}>
          {isEdit ? "Cancel" : "Edit Category"}
        </Button>
      </div>
      <div className="mt-6">
        {isEdit ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ComboboxDemo options={options} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-3"
                disabled={
                  form.formState.isLoading ||
                  !form.formState.isValid ||
                  form.formState.isSubmitting
                }
              >
                Save
              </Button>
            </form>
          </Form>
        ) : (
          <h1 className="font-bold text-md">
            {initialValue ? selectedOption?.value : "No Category"}
          </h1>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
