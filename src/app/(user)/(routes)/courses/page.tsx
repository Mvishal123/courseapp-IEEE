// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
import { CourseData } from "@/types";
import CourseCard from "@/components/CourseCard";
import { BASE_URL } from "@/config";

const getCourses = async () => {
  const courses = await fetch(`${BASE_URL}/api/courses`, {
    cache: "no-cache",
  });

  return courses.json();
};

const page = async () => {
  // const [courses, setCourses] = useState<CourseData[]>([]);

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const data = await axios.get("api/courses");
  //       setCourses(data.data);
  //     } catch (error: any) {
  //       throw new Error(error.message);
  //     }
  //   };

  //   init();
  // }, []);
  const courses: CourseData[] = await getCourses();

  return (
    <main className="pt-20 container">
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
    </main>
  );
};

export default page;
