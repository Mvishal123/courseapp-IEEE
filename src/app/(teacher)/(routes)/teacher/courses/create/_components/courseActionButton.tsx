"use client";
import { Button } from "@/components/ui/button";
import { Chapter } from "@/models";
import axios from "axios";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ChapterDeleteDialog from "./chapterDeleteDialog";
import { useRouter } from "next/navigation";

interface CourseActionButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted: boolean;
  isPublished: boolean;
}

const CourseActionButton = ({
  chapterId,
  courseId,
  isCompleted,
  isPublished,
}: CourseActionButtonProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const chapterDeleteHandler = async () => {
    try {
      await axios.delete(
        `/api/courses/create/${courseId}`
      );
      toast.success("Course deleted successfully");
      router.push(`/teacher/courses/`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const publishHandler = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/create/${courseId}/chapter/${chapterId}/publish`
      );
      toast.success("Chapter published successfully");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const unpublishHandler = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/create/${courseId}/chapter/${chapterId}/unpublish`
      );
      toast.success("Chapter unpublished successfully");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      {!isPublished && (
        <Button
          disabled={!isCompleted}
          variant={"ghost"}
          onClick={publishHandler}
        >
          Publish
        </Button>
      )}
      {isPublished && (
        <Button
          disabled={!isCompleted}
          variant={"ghost"}
          onClick={unpublishHandler}
        >
          Unpublish
        </Button>
      )}

      <ChapterDeleteDialog onDelete={chapterDeleteHandler} />
    </div>
  );
};

export default CourseActionButton;
