"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CoursePageTopClient = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("/teacher/courses/create")}>
        Add course
      </Button>
    </div>
  );
};

export default CoursePageTopClient;
