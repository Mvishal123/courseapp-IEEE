import { CourseData } from "@/types";
import CourseCard from "@/components/CourseCard";
import { BASE_URL } from "@/config";
import CoursesCategorySlider from "../../_components/CoursesCategorySlider";
import { Course, CourseCategory, User } from "@/models";
import Searchbar from "@/components/user/header/Searchbar";
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import { LoaderIcon } from "react-hot-toast";

interface SearchParamsProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

interface query {
  isPublished: boolean;
  title?: Object;
  category?: string;
}

const page = async ({ searchParams }: SearchParamsProps) => {
  // const courses: CourseData[] = await getCourses();
  const session = await getServerSession(handler);
  if (!session) {
    return (
      <div>
        <LoaderIcon />
      </div>
    );
  }

  let query: query = {
    isPublished: true,
  };

  if (searchParams.categoryId) {
    query.category = searchParams.categoryId;
  }

  if (searchParams.title) {
    const titleQuery = {
      $or: [
        { title: { $regex: new RegExp(searchParams.title, "i") } },
        { description: { $regex: new RegExp(searchParams.title, "i") } },
      ],
    };

    console.log("titleQuery: ", titleQuery);
    query = { ...query, ...titleQuery };
  }

  const courses = await Course.find(query);
  console.log("COURSES", courses);

  const user = await User.findOne({ email: session?.user?.email });
  console.log("USER", user);

  let renderCourses;
  {
    user.mycourses
      ? (renderCourses = courses.filter(
          (course: any) => !user.mycourses.includes(course._id)
        ))
      : (renderCourses = courses);
  }

  const categories = await CourseCategory.find({});

  return (
    <main className="">
      <div className="lg:hidden block w-1/2 mx-auto">
        <Searchbar />
      </div>
      <div className="flex gap-3 overflow-x-scroll no-scrollbar px-3 mt-4">
        {categories.map((category: any, index) => (
          <CoursesCategorySlider
            label={`${category.category}`}
            value={`${category._id}`}
            key={index}
          />
        ))}
      </div>
      <div className="container mt-6">
        <h1 className="text-4xl font-extrabold text-center">All courses</h1>
        <br />
        <hr />

        {courses.length === 0 && (
          <div className="flex justify-center italic text-muted-foreground mt-3">
            no courses
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 mt-3 gap-8">
          {renderCourses.map((course: any, i) => (
            <CourseCard data={course.toObject()} key={i} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
