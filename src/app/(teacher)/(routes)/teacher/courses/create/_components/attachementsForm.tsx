"use client";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ImageDropZone from "./ImageDropZone";
import axios from "axios";
import toast from "react-hot-toast";

interface attachmentsProps {
  initialValue: string[];
  courseId: string;
}

const AttachmentsSection = ({ initialValue, courseId }: attachmentsProps) => {
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  const handleSubmit = async ({ url }: { url: string }) => {
    try {
      const res = await axios.post(
        `/api/courses/create/${courseId}/attachments`,
        {
          url,
        }
      );
      toast.success("Attachment added");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = () => setEdit((prev) => !prev);

  return (
    <div className="w-full">
      <div className="px-4 py-2 bg-slate-100 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-lg">Course attachments</h1>
          {!edit ? (
            <Button size="sm" variant={"ghost"} onClick={handleEdit}>
              {!initialValue || initialValue.length === 0 ? (
                <PlusCircle className="h-4 w-4 mr-2" />
              ) : (
                <PencilIcon className="h-4 w-4 mr-2" />
              )}
              <span>
                {!initialValue || initialValue.length === 0
                  ? "Upload attachments"
                  : "edit attachments"}
              </span>
            </Button>
          ) : (
            <Button size="sm" variant={"ghost"} onClick={handleEdit}>
              <span>Cancel</span>
            </Button>
          )}
        </div>
        {typeof initialValue === "undefined" && !edit && (
          <div className="text-muted-foreground">No attachments</div>
        )}
        {edit && (
          <div>
            <ImageDropZone
              endpoint="courseAttachment"
              onChange={(url) => {
                if (url) {
                  handleSubmit({ url });
                } else {
                  toast.error("Error publishing image");
                }
              }}
            />
          </div>
        )}
        {initialValue && initialValue.length === 0 && !edit && (
          <div className="relative aspect-video">Hello</div>
        )}
      </div>
    </div>
  );
};

export default AttachmentsSection;
