"use client";
import { Button } from "@/components/ui/button";
import { CameraIcon, PencilIcon, PlusCircle, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ImageDropZone from "./ImageDropZone";
import axios from "axios";
import toast from "react-hot-toast";

import MuxPlayer from "@mux/mux-player-react";
import { chapterModelType } from "@/types";

interface imageProps {
  initialValue: string;
  courseId: string;
  chapterId: string;
  playbackId: string;
}

const ChapterVideoForm = ({
  initialValue,
  courseId,
  chapterId,
  playbackId,
}: imageProps) => {
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  const handleSubmit = async ({ videoUrl }: { videoUrl: string }) => {
    try {
      const res = await axios.patch(
        `/api/courses/create/${courseId}/chapter/${chapterId}`,
        {
          videoUrl,
        }
      );
      toast.success("Video uploaded");
      handleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handleEdit = () => setEdit((prev) => !prev);
  return (
    <div className="w-full">
      <div className="px-4 py-2 bg-slate-100 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-lg">Chapter video</h1>
          {!edit ? (
            <Button size="sm" variant={"ghost"} onClick={handleEdit}>
              {!initialValue ? (
                <PlusCircle className="h-4 w-4 mr-2" />
              ) : (
                <PencilIcon className="h-4 w-4 mr-2" />
              )}
              <span>{!initialValue ? "Upload video" : "edit video"}</span>
            </Button>
          ) : (
            <Button size="sm" variant={"ghost"} onClick={handleEdit}>
              <span>Cancel</span>
            </Button>
          )}
        </div>
        <div className="mt-4">
          {!initialValue && !edit && (
            <div className="w-full bg-slate-200 flex aspect-video items-center justify-center">
              <Video className="text-muted-foreground h-16 w-16" />
            </div>
          )}
          {edit && (
            <div>
              <ImageDropZone
                endpoint="courseVideo"
                onChange={(url) => {
                  if (url) {
                    handleSubmit({ videoUrl: url });
                  } else {
                    toast.error("Something went wrong");
                  }
                }}
              />
            </div>
          )}
          {initialValue && !edit && (
            <div className="">
              <MuxPlayer playbackId={playbackId} />
            </div>
          )}
        </div>
        {initialValue && !edit && (
          <p className="text-sm italic text-muted-foreground">
            Video may take a few minutes to process
          </p>
        )}
      </div>
    </div>
  );
};

export default ChapterVideoForm;
