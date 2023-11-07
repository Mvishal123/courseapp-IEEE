import { connectDb } from "@/lib/db";
import { Course } from "@/models";
import TitleForm from "../_components/titleForm";
import DescriptionForm from "../_components/descriprionForm";
import ImageForm from "../_components/imageForm";

connectDb();

const CourseCreatePage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const course = await Course.findById(params.courseId);
  // console.log(course);

  const tasks = [
    course.title,
    course.category,
    course.description,
    course.price,
    course.image,
  ];

  const completed = tasks.filter(Boolean).length;

  return (
    <div className="">
      <div className="container pt-6">
        <div>
          <h1 className="text-4xl font-bold">Create a new course</h1>
          <p className="text-sm mt-2 text-muted-foreground">
            Fields remaining {completed}/{tasks.length}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-12">
          <div className="flex flex-col gap-10">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreatePage;
