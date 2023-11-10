"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
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
import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { currencyConverter } from "@/helper/currencyConverter";
import { cn } from "@/lib/utils";

interface PageProps {
  initialValue: number;
  courseId: string;
}

const formSchema = z.object({
  price: z.coerce.number().min(0, { message: "Price required" }),
});

const PriceSection = ({ initialValue, courseId }: PageProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialValue ? initialValue : 0,
    },
  });

  const handleEdit = () => setIsEdit((prev) => !prev);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // console.log(data);
      const res = await axios.patch(`/api/courses/create/${courseId}`, data);
      toast.success("Price updated successfully");
      handleEdit();
      router.refresh();
    } catch (error: any) {
      toast.error("Something went wrong");
      console.log(error.message);
    }
  };

  return (
    <div className="mt-4 rounded-lg bg-slate-100 px-4 py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Course Price</h1>
        {!isEdit ? (
          <Button variant={"ghost"} onClick={handleEdit}>
            <Pencil className="h-4 w-4 mr-2" />{" "}
            <span className="text-sm"> Edit Price</span>
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
            {!initialValue && "no Price"}
            {initialValue && <p>{currencyConverter(initialValue)}</p>}
          </h1>
        )}
        {isEdit && (
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" min="0" step={0.1} {...field} />
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

export default PriceSection;
