"use client";
import { Button } from "@/components/ui/button";
import { CameraIcon, PencilIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ImageDropZone from "./ImageDropZone";
import axios from "axios";
import toast from "react-hot-toast";

interface imageProps {
  initialValue: string;
  courseId: string;
}

const ImageForm = ({ initialValue, courseId }: imageProps) => {
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  const handleSubmit = async ({ imageUrl }: { imageUrl: string }) => {
    try {
      const res = await axios.patch(`/api/courses/create/${courseId}`, {
        image: imageUrl,
      });
      toast.success("Image uploaded successfully");
      handleEdit();
      router.refresh();
    } catch (error) {}
  };
  const handleEdit = () => setEdit((prev) => !prev);
  return (
    <div className="w-full">
      <div className="px-4 py-2 bg-slate-100 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-lg">Course image</h1>
          {!edit ? (
            <Button size="sm" variant={"ghost"} onClick={handleEdit}>
              {!initialValue ? (
                <PlusCircle className="h-4 w-4 mr-2" />
              ) : (
                <PencilIcon className="h-4 w-4 mr-2" />
              )}
              <span>{!initialValue ? "Uplaod image" : "edit image"}</span>
            </Button>
          ) : (
            <Button size="sm" variant={"ghost"} onClick={handleEdit}>
              <span>Cancel</span>
            </Button>
          )}
        </div>
        <div className="mt-4">
          {!initialValue ||
            (initialValue === "undefined" && !edit && (
              <div className="w-full bg-slate-200 flex aspect-video items-center justify-center">
                <CameraIcon className="text-muted-foreground h-16 w-16" />
              </div>
            ))}
          {edit && (
            <div>
              <ImageDropZone
                endpoint="courseImage"
                onChange={(url) => {
                  if (url) {
                    handleSubmit({ imageUrl: url });
                  } else {
                    toast.error("Error publishing image");
                  }
                }}
              />
            </div>
          )}
          {initialValue && initialValue !== "undefined" && !edit && (
            <div className="relative aspect-video">
              <Image
                fill
                src={initialValue}
                alt="course image"
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
