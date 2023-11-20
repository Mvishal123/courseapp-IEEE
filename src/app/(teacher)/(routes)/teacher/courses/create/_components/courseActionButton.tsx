"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CourseDeleteDialog from "./courseDeleteDialog";

interface CourseActionButtonProps {
  courseId: string;
  isCompleted: boolean;
  isPublished: boolean;
}

const CourseActionButton = ({
  courseId,
  isCompleted,
  isPublished,
}: CourseActionButtonProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const courseDeleteHandler = async () => {
    try {
      await axios.delete(`/api/courses/create/${courseId}`);
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
      await axios.put(`/api/courses/create/${courseId}/publish`);
      toast.success("Course published successfully");
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
      await axios.put(`/api/courses/create/${courseId}/unpublish`);
      toast.success("Course unpublished successfully");
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

      <CourseDeleteDialog onDelete={courseDeleteHandler} />
    </div>
  );
};

export default CourseActionButton;
