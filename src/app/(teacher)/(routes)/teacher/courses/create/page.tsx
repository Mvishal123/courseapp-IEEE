"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be atleast 3 characters long" }),
});

const onSubmitHandler = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    
};

const CreateCourse = () => {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      create
    </div>
  );
};

export default CreateCourse;
