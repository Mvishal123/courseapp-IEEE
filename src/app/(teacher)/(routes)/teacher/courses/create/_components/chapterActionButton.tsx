"use client";
import { Button } from "@/components/ui/button";
import { Chapter } from "@/models";
import axios from "axios";
import { Trash } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import ChapterDeleteDialog from "./chapterDeleteDialog";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const chapterDeleteHandler = async () => {
    try {
      await axios.delete(
        `/api/courses/create/${courseId}/chapter/${chapterId}`
      );
      toast.success("Chapter deleted successfully");
      router.push(`/teacher/courses/create/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex items-center">
      <Button disabled={!isCompleted} variant={"ghost"}>
        Publish
      </Button>
      <ChapterDeleteDialog onDelete={chapterDeleteHandler} />
    </div>
  );
};

export default ChapterActionButtons;
