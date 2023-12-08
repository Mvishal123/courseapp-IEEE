import CourseCard from "@/components/CourseCard";

import CoursesCategorySlider from "../../_components/CoursesCategorySlider";
import { Course, CourseCategory, User } from "@/models";
import Searchbar from "@/components/user/header/Searchbar";

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
          {courses.map((course: any, i) => (
            <CourseCard data={course.toObject()} key={i} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
