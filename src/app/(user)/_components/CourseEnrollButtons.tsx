"use client";

import { Button } from "@/components/ui/button";
import { connectDb } from "@/lib/db";
import { User } from "@/models";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface props {
  courseId: string;
  email: string;
}

const CourseEnrollButtons = ({ courseId, email }: props) => {
  const [loading, setLoading] = useState(false);
  const onEnroll = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/courses/${courseId}/checkout`);
      // window.location.assign(`/courses/${courseId}`);
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
