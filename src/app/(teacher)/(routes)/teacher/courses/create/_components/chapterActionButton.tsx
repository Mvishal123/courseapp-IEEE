"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

interface ChapterActionButtonsProps {
  chapterId: string;
  courseId: string;
  isCompleted: boolean;
}

const ChapterActionButtons = ({
  chapterId,
  courseId,
  isCompleted,
}: ChapterActionButtonsProps) => {
  const chapterDeleteHandler = async () => {
    try {
      const res = await axios.delete(
        `api/courses/create/${courseId}/chapter/${chapterId}`
      );
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex items-center">
      <Button disabled={!isCompleted} variant={"ghost"}>
        Publish
      </Button>
      <Button size={"sm"} onClick={chapterDeleteHandler}>
        <Trash className="w-5" />
      </Button>
    </div>
  );
};

export default ChapterActionButtons;
