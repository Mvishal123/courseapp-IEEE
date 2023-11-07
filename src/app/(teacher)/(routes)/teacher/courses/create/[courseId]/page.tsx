import { connectDb } from "@/lib/db";
import { Course } from "@/models";
import TitleForm from "../_components/titleForm";

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
    <div>
      <div className="container pt-6">
        <div>
          <h1 className="text-4xl font-bold">Create a new course</h1>
          <p className="text-sm mt-2 text-muted-foreground">
            Fields remaining {completed}/{tasks.length}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-12">
          <div>
              <TitleForm initialValue={`${course.title}`} courseId={`${course._id}`}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreatePage;
