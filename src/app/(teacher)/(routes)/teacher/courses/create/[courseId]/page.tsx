import { connectDb } from "@/lib/db";
import { Course } from "@/models";
import { CourseCategory } from "@/models";
import { Chapter } from "@/models";

import TitleForm from "../_components/titleForm";
import DescriptionForm from "../_components/descriprionForm";
import ImageForm from "../_components/imageForm";
import PriceSection from "../_components/priceForm";
import CategorySection from "../_components/categoryForm";

import IconBadge from "@/components/ui/IconBadge";
import {
  AlertTriangle,
  DollarSign,
  File,
  LayoutDashboard,
  ListTodo,
} from "lucide-react";
import AttachmentsSection from "../_components/attachementsForm";
import ChapterSection from "../_components/chapterForm";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import CourseActionButton from "../_components/courseActionButton";
import Banner from "@/components/Banner";

connectDb();

const CourseCreatePage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const session = await getServerSession(handler);
  if (!session) {
    return redirect("/");
  } else {
    const course = await Course.findById(params.courseId);
    const chapters = await Chapter.find({ courseId: params.courseId }).sort({
      position: "asc",
    });

    if (!course) {
      toast.error("Course not found");
      return redirect("teacher/courses");
    }

    const tasks = [
      course.title,
      course.category,
      course.description,
      course.price,
      course.image,
      chapters.some((chapter) => chapter.isPublished),
    ];

    const courseCategory = await CourseCategory.find({}).sort({ category: 1 });

    const categoryData = courseCategory.map((category) => ({
      label: category.category,
      value: category._id.toString(),
    }));

    const chapterData = chapters.map((chapter) => ({
      ...chapter.toObject(),
      _id: chapter._id.toString(),
    }));

    const completed = tasks.filter(Boolean).length;
    const isCompleted = tasks.every(Boolean);

    return (
      <div>
        {!course.isPublished && (
          <Banner
            label="This course is not published yet and will not be visible to the users"
            icon={AlertTriangle}
            status="warning"
          />
        )}
        <div className="container pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">
                Create a new course
              </h1>
              <p className="text-sm mt-2 text-muted-foreground">
                Fields remaining {completed}/{tasks.length}
              </p>
            </div>
            <div>
              <CourseActionButton
                courseId={`${course._id}`}
                isCompleted={isCompleted}
                isPublished={course.isPublished}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:mt-20 mt-5 gap-x-10">
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-3">
                <IconBadge icon={LayoutDashboard} status={false} />
                <h1 className="font-bold md:text-xl lg:text-2xl">
                  Customize your course
                </h1>
              </div>
              <TitleForm
                initialValue={`${course.title}`}
                courseId={`${course._id}`}
              />
              <DescriptionForm
                initialValue={`${course.description}`}
                courseId={`${course._id}`}
              />
              <ImageForm
                initialValue={`${course.image}`}
                courseId={`${course._id}`}
              />
              <CategorySection
                initialValue={`${course.category}`}
                courseId={`${course._id}`}
                options={categoryData}
              />
            </div>
            <div className="flex flex-col gap-10 mt-10 md:mt-0">
              <div className="flex items-center gap-2">
                <IconBadge icon={ListTodo} status={false} />
                <h1 className="font-bold md:text-xl lg:text-2xl">
                  Course chapters
                </h1>
              </div>

              <ChapterSection
                initialValue={chapterData}
                courseId={`${course._id}`}
              />
              <div>
                <div className="flex items-center gap-2">
                  <IconBadge icon={DollarSign} status={false} />
                  <h1 className="font-bold md:text-xl lg:text-2xl">
                    Sell your course
                  </h1>
                </div>
                <PriceSection
                  initialValue={course.price}
                  courseId={`${course._id}`}
                />
              </div>

              <div>
                <div className="flex items-center gap-2 md:pb-6">
                  <IconBadge icon={File} status={false} />
                  <h1 className="font-bold md:text-xl lg:text-2xl">
                    Does your students need any resources to complete this
                    course
                  </h1>
                </div>
                <AttachmentsSection
                  initialValue={course.attachments}
                  courseId={`${course._id}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CourseCreatePage;
