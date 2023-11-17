"use client";

import { useState } from "react";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
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

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { useSession } from "next-auth/react";
import ChaptersList from "./ChaptersList";
import { chapterModelType } from "@/types";

interface ChapterSchemaProps {
  initialValue: chapterModelType[] | [];
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Required",
  }),
});

const ChapterSection = ({ initialValue, courseId }: ChapterSchemaProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const toggleCreate = () => setIsCreating((prev) => !prev);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("DATA", data);
      const res = await axios.post(`/api/courses/create/${courseId}/chapter`, {
        ...data,
        userId: session?.user?.userId,
      });
      toast.success("chapter created successfully");
      toggleCreate();
      router.refresh();
    } catch (error: any) {
      toast.error("Something went wrong");
      console.log(error.message);
    }
  };

  const onReorderHandler = async (
    updateData: { chapterId: string; position: number }[]
  ) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/create/${courseId}/chapter/reorder`, {
        list: updateData,
      });

      toast.success("Chapters reordered");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEditHandler = (chapterId: string) => {
    router.push(`/teacher/courses/create/${courseId}/chapter/${chapterId}`);
  };

  return (
    <div className="relative mt-4 rounded-lg bg-slate-100 px-4 py-2">
      {isUpdating && (
        <div className="absolute w-full h-full flex items-center justify-center bg-slate-400/20 top-0 right-0 rounded-lg">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-lg">Course Chapters</h1>
        {!isCreating ? (
          <Button variant={"ghost"} onClick={toggleCreate}>
            <PlusCircle className="h-4 w-4 mr-2" />{" "}
            <span className="text-sm"> Add a Chapter</span>
          </Button>
        ) : (
          <Button variant={"ghost"} onClick={toggleCreate}>
            Cancel
          </Button>
        )}
      </div>
      <div className="mt-6">
        {isCreating && (
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="e.g. 'This is an introduction"
                          defaultValue=""
                          {...field}
                        />
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
                  Create
                </Button>
              </form>
            </Form>
          </div>
        )}
        {!isCreating && initialValue?.length <= 0 && (
          <div
            className={cn("text-sm mt-2", !initialValue?.length && "italic")}
          >
            No chapters
          </div>
        )}

        {!isCreating && (
          <ChaptersList
            onEdit={onEditHandler}
            onReorder={onReorderHandler}
            items={initialValue || []}
          />
        )}
        {!isCreating && (
          <p className="text-sm text-muted-foreground mt-4">
            Drag and drop to reorder the chapters
          </p>
        )}
      </div>
    </div>
  );
};

export default ChapterSection;
