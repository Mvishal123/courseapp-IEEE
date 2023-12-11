"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface props {
  courseId: string;
}

const CourseEnrollButtons = ({ courseId }: props) => {
    console.log("courseIdhahah: ", courseId);
    
  const [loading, setLoading] = useState(false);
  const onEnroll = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(res.data.url);
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute pt-4 flex flex-col gap-2 justify-between w-full">
      <Button disabled={loading} onClick={onEnroll}>
        Enroll now
      </Button>
      <Button variant={"secondary"}>Add to cart</Button>
    </div>
  );
};

export default CourseEnrollButtons;
