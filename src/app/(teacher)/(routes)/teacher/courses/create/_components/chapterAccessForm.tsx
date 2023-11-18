"use client";

import { useState } from "react";
import { Lock, Pencil, Unlock } from "lucide-react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";

interface PageProps {
  initialValue: boolean;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

const ChapterAcessForm = ({ initialValue, courseId, chapterId }: PageProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: initialValue,
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
      toast.success("Chapter access changed");
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
            <span className="text-sm"> Edit chapter access</span>
          </Button>
        ) : (
          <Button variant={"ghost"} onClick={handleEdit}>
            Cancel
          </Button>
        )}
      </div>
      <div className="mt-6">
        {!isEdit && !initialValue && (
          <div className="text-md  italic flex items-center gap-2">
            <span>
              <Lock size={15} />
            </span>
            This chapter is locked
          </div>
        )}
        {!isEdit && initialValue && (
          <div className="text-md  italic flex items-center gap-2">
            <span>
              <Unlock size={15} />
            </span>
            This chapter is a free preview
          </div>
        )}
        {isEdit && (
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="isFree"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="border border-slate-200 rounded-lg px-3 py-1 flex gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription className="text-slate-600">
                        Check if you want to make this chapter a free preview
                      </FormDescription>
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

export default ChapterAcessForm;
