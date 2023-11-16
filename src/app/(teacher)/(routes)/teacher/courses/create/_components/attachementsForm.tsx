"use client";
import { Button } from "@/components/ui/button";
import { Loader, PencilIcon, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ImageDropZone from "./ImageDropZone";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

interface attachmentsProps {
  initialValue: string[];
  courseId: string;
}

const AttachmentsSection = ({ initialValue, courseId }: attachmentsProps) => {
  const [edit, setEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (url: string) => {
    try {
      setIsDeleting(url);
      console.log(url);
      const res = await axios.delete(
        `/api/courses/create/${courseId}/attachments?url=${url}`
      );
      console.log("RES", res);

      setIsDeleting(null);
      toast.success("Attachment deleted");
      router.refresh();
    } catch (error: any) {
      toast.error("Error deleting attachment");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleSubmit = async ({ url }: { url: string }) => {
    try {
      const res = await axios.post(
        `/api/courses/create/${courseId}/attachments`,
        {
          url,
        }
      );
      toast.success("Attachment added");
      handleEdit();
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
              <PlusCircle className="w-4 h-4 mr-2" />
              <span>
                {!initialValue || initialValue.length === 0
                  ? "Upload attachments"
                  : "add attachments"}
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
        {initialValue && initialValue.length !== 0 && !edit && (
          <div className="mt-6 space-y-3">
            {initialValue.map((url, index) => (
              <div
                key={index}
                className="bg-purple-400/50 border border-purple-700 p-3 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="line-clamp-2"><Link href={`${url}`} target="_blank">{url}</Link></span>
                  <span onClick={async () => await handleDelete(url)}>
                    {isDeleting !== url && (
                      <X className="h-4 w-4 hover:text-red-800" />
                    )}
                    {isDeleting === url && (
                      <Loader className="h-4 w-4 animate-spin" />
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttachmentsSection;
