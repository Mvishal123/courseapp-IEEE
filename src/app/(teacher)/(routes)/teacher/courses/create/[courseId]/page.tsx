import { connectDb } from "@/lib/db";
import { Course } from "@/models";
import { CourseCategory } from "@/models";

import TitleForm from "../_components/titleForm";
import DescriptionForm from "../_components/descriprionForm";
import ImageForm from "../_components/imageForm";
import PriceSection from "../_components/priceForm";
import CategorySection from "../_components/categoryForm";

import IconBadge from "@/components/ui/IconBadge";
import { DollarSign, LayoutDashboard, ListTodo } from "lucide-react";

connectDb();

const CourseCreatePage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const course = await Course.findById(params.courseId);

  const tasks = [
    course.title,
    course.category,
    course.description,
    course.price,
    course.image,
  ];

  const courseCategory = await CourseCategory.find({}).sort({ category: 1 });

  const plainOptions = courseCategory.map((category) => ({
    label: category.category,
    value: category._id.toString(),
  }));

  const completed = tasks.filter(Boolean).length;

  return (
    <div>
      <div className="container pt-6">
        <div>
          <h1 className="text-4xl font-bold">Create a new course</h1>
          <p className="text-sm mt-2 text-muted-foreground">
            Fields remaining {completed}/{tasks.length}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:mt-20 mt-12 pl-6 space-x-20">
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-3">
              <IconBadge icon={LayoutDashboard} status={false} />
              <h1 className="font-bold">Customize your course</h1>
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
              options={plainOptions}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <IconBadge icon={ListTodo} status={false} />
              <h1 className="font-bold">Course chapters</h1>
            </div>
            <div>TODO</div>
            <div className="flex items-center gap-2">
              <IconBadge icon={DollarSign} status={false} />
              <h1>Sell your course</h1>
            </div>
            <PriceSection initialValue={course.price} courseId={course._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreatePage;
