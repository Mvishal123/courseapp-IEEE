import { Badge } from "@/components/ui/badge";
import { currencyConverter } from "@/helper/currencyConverter";
import { Course, User } from "@/models";
import { CourseData } from "@/types";
import { Edit } from "lucide-react";
import Link from "next/link";

const CourseTable = async ({email}: any) => {
  const user = await User.findOne({ email: email});
  let courses = await Course.find({ userId: user._id });

  console.log("courses", courses);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between p-4 font-bold rounded-md">
        <div style={{ minWidth: "200px" }}>Title</div>
        <div className="flex gap-6">
          <span style={{ minWidth: "80px" }}>Price</span>
          <span style={{ minWidth: "120px" }}>Is Published</span>
          <span style={{ minWidth: "40px" }}>Edit</span>
        </div>
      </div>
      {courses.map((course: any) => (
        <div
          key={course._id}
          className="bg-slate-200 rounded-md p-4 flex justify-between"
        >
          <div style={{ minWidth: "200px" }}>{course.title}</div>
          <div className="flex gap-6 justify-center items-center">
            <span style={{ minWidth: "80px" }}>{course.price ? currencyConverter(course.price) :  "-"}</span>
            <span style={{ minWidth: "120px" }}>
              {!course.isPublished && (
                <Badge className="h-4 bg-slate-600/75">Draft</Badge>
              )}
              {course.isPublished && (
                <Badge className="h-4 bg-purple-500">Published</Badge>
              )}
            </span>
            <Link href={`/teacher/courses/create/${course._id}`}>
              <Edit className="h-4 w-4 text-muted-foreground hover:text-slate-900" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseTable;
