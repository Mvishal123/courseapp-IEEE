import { CourseData } from "@/types";
import CourseCard from "@/components/CourseCard";
import { BASE_URL } from "@/config";
import CoursesCategorySlider from "../../_components/CoursesCategorySlider";
import { CourseCategory } from "@/models";
import Searchbar from "@/components/user/header/Searchbar";

const getCourses = async () => {
  const courses = await fetch(`${BASE_URL}/api/courses`, {
    cache: "no-cache",
  });

  return courses.json();
};

const page = async () => {
  const courses: CourseData[] = await getCourses();

  const categories = await CourseCategory.find({});

  return (
    <main className="">
      <div className="lg:hidden block w-1/2 mx-auto">
        <Searchbar />
      </div>
      <div className="flex gap-3 overflow-x-scroll no-scrollbar px-3 mt-4">
        {categories.map((category :any, index) => (
          <CoursesCategorySlider label={category.category} value={category._id} key={index}/>
        ))}
        
      </div>
      <div className="container mt-6">
        <h1 className="text-4xl font-extrabold text-center">All courses</h1>
        <br />
        <hr />
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full place-items-center space-y-20">
          {courses.map((course) => (
            <div
              key={course._id}
              className="min-w-[200px] lg:w-[300px] sm:w-[250px] max-w-[300px]"
            >
              <CourseCard
                title={course.title}
                teacher={course.teacher}
                price={course.price}
                description={course.description}
                image={course.image}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
