import CourseChapterView from "@/app/(user)/_components/CourseChapterView";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currencyConverter } from "@/helper/currencyConverter";
import { Course } from "@/models";
import { Rating } from "@mui/material";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

const CourseViewPage = async ({ params }: { params: { courseId: string } }) => {
  const session = await getServerSession(handler);

  const course = await Course.findOne({ _id: params.courseId }).populate("chapters");
  

  const numberReviews = course?.reviews.length;

  return (
    <div>
      <div className="py-1 bg-gradient-to-t from-fuchsia-100 to-slate-100 w-full z-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="md:p-8 p-4">
            <div>
              <h1 className="text-4xl font-bold">{course.title}</h1>
              <div className="flex flex-col gap-2 mt-3">
                <span>
                  <Badge className="bg-slate-200 hover:bg-slate-200 text-slate-800">
                    {course.category}
                  </Badge>
                </span>
                <div className="flex items-center gap-1">
                  <Rating readOnly />
                  <span>
                    <p className="text-slate-400 text-sm">
                      ({numberReviews} reviews)
                    </p>
                  </span>
                </div>
                <div className="pt-4">
                  <span className="text-2xl font-bold italic">
                    {currencyConverter(parseFloat(course.price))}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:relative md:flex justify-center items-center md:pl-8">
            <div className="absolute md:top-[90px] shadow-[0_0_2px_2px] rounded-md">
              <div className="aspect-video w-96 overflow-hidden">
                <Image
                  src={course.image}
                  layout="fill"
                  objectFit="cover"
                  alt="course image"
                  className="rounded-md"
                />
              </div>
              <div className="absolute pt-4 flex justify-between w-full">
                <Button className="bg-purple-600">Enroll now</Button>
                <Button variant={"secondary"}>Add to cart</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Course Section */}
      <div className="md:hidden mt-4 px-2">
        <div className="relative aspect-video w-full mx-auto">
          <Image
            src={course.image}
            layout="fill"
            objectFit="cover"
            alt="course image"
            className="rounded-md"
          />
        </div>
      </div>

      {/* Description Section */}
      <div className="p-8">
        <div>
          <h1 className="text-2xl font-bold">About Course</h1>
          <div className="mt-6 space-y-8">
            <div className="md:w-1/2 w-full">
              <h2 className="text-lg font-semibold">Course Description</h2>
              <div>
                <p>{course.description}</p>
              </div>
            </div>
            <div className="">
              <h2 className="text-lg font-semibold">Course contents</h2>
              <CourseChapterView chapters={course.chapters.toObject()}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewPage;
