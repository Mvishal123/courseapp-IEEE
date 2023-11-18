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
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Editor from "@/components/editor";

import { cn } from "@/lib/utils";
import EditorPreview from "@/components/editorPreview";

interface PageProps {
  initialValue: string;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Required",
  }),
});

const ChapterDescriptionForm = ({
  initialValue,
  courseId,
  chapterId,
}: PageProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialValue ? initialValue : "",
    },
  });

  const handleEdit = () => setIsEdit((prev) => !prev);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // console.log(data);
      const res = await axios.patch(
        `/api/courses/create/${courseId}/chapter/${chapterId}`,
        data
      );
      toast.success("description updated successfully");
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
        <h1 className="text-lg">Chapter description</h1>
        {!isEdit ? (
          <Button variant={"ghost"} onClick={handleEdit}>
            <Pencil className="h-4 w-4 mr-2" />{" "}
            <span className="text-sm"> Edit Description</span>
          </Button>
        ) : (
          <Button variant={"ghost"} onClick={handleEdit}>
            Cancel
          </Button>
        )}
      </div>
      <div className="mt-6">
          {!isEdit && !initialValue && (
            <p className="text-sm text-muted-foreground italic">No description</p>
          )}
        {!isEdit && initialValue && (
          <div>
            <EditorPreview initialValue={initialValue} />
          </div>
        )}
        {isEdit && (
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Editor {...field} />
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

export default ChapterDescriptionForm;
