"use client";
import { PencilIcon } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface titleProps {
  initialValue: string;
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const TitleForm = ({ initialValue, courseId }: titleProps) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValue,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    try {
      const res = await axios.patch(`/api/courses/create/${courseId}`, data);
      console.log("CHANGE", res);
      handleEdit();
      router.refresh();
      toast.success("Title updated");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleEdit = () => setEdit((prev) => !prev);

  return (
    <div>
      <div className="w-full bg-slate-100 rounded-lg px-4 py-2">
        <div className="flex justify-between" onClick={handleEdit}>
          <h1 className="text-lg">Course title</h1>
          <span
            className={cn(
              "flex items-center text-sm cursor-pointer",
              edit && "text-muted-foreground"
            )}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit title
          </span>
        </div>
        <div className="mt-4 ">
          {!edit && <div className="font-bold">{initialValue}</div>}
          {edit && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          defaultValue={initialValue}
                          placeholder="e.g. learn blockchain"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="mt-4">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={
                      form.formState.isLoading || !form.formState.isValid
                    }
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={"secondary"}
                    className="ml-3"
                    onClick={handleEdit}
                  >
                    cancel
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleForm;
