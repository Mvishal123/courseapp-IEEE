"use client";
import { Button } from "@/components/ui/button";
import { CameraIcon, PlusCircle } from "lucide-react";
import { set } from "mongoose";
import Image from "next/image";
import React, { useState } from "react";
import ImageDropZone from "./ImageDropZone";

interface imageProps {
  initialValue: string;
  courseId: string;
}

const ImageForm = ({ initialValue, courseId }: imageProps) => {
  const [edit, setEdit] = useState(false);

  const handleSubmit = ({ imageUrl }: { imageUrl: string }) => {
    console.log(imageUrl);
  };
  const handleEdit = () => setEdit((prev) => !prev);
  return (
    <div className="w-full">
      <div className="px-4 py-2 bg-slate-100 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-lg">Course image</h1>
          {!edit ? (
            <Button size="sm" variant={"ghost"} onClick={handleEdit}>
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>Uplaod image</span>
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
                  }
                }}
              />
            </div>
          )}
          {initialValue && initialValue !== "undefined" && !edit && (
            <div className="relative object-contain">
              <Image fill src={initialValue} alt="course image" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
