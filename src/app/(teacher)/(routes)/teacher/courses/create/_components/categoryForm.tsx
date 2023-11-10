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
      categoryId: initialValue ? initialValue : "",
    },
  });

  const handleEdit = () => setIsEdit((prev) => !prev);

  const selectedOptions = options.find(
    (option) => option.value === initialValue
  );

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // console.log(data);
      const res = await axios.patch(`/api/courses/create/${courseId}`, {
        category: data.categoryId,
      });
      toast.success("category added successfully");
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
        {!isEdit ? (
          <Button variant={"ghost"} onClick={handleEdit}>
            {initialValue && initialValue !== "undefined" ? (
              <Pencil className="h-4 w-4 mr-2" />
            ) : (
              <PlusCircle className="h-4 w-4 mr-2" />
            )}
            <span className="text-sm">
              {initialValue && initialValue !== "undefined"
                ? "Edit Category"
                : "add category"}
            </span>
          </Button>
        ) : (
          <Button variant={"ghost"} onClick={handleEdit}>
            Cancel
          </Button>
        )}
      </div>
      <div className="mt-6">
        {!isEdit && (
          <h1
            className={cn(
              "font-bold text-md",
              !initialValue && " text-slate-500 font-medium text-sm "
            )}
          >
            {!initialValue || (initialValue === "undefined" && "no category")}
            {initialValue && initialValue !== "undefined" && (
              <p>{selectedOptions?.label}</p>
            )}
          </h1>
        )}
        {isEdit && (
          <div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
