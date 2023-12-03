"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BASE_URL } from "@/config";
import { useRouter } from "next/navigation";
import CourseCard from "../CourseCard";

interface Course {
  _id: string;
  title: string;
  teacher: string;
  price: string;
  category: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

function Coursecard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/courses`);
        res.data && setCourses(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  const slideRight = () => {
    const scroll = document.getElementById("slider");
    if (scroll) {
      scroll.scrollLeft += 550;
    }
  };

  const slideLeft = () => {
    const scroll = document.getElementById("slider");

    if (scroll) {
      scroll.scrollLeft -= 550;
    }
  };

  if (courses.length === 0) return <div>loading...</div>;

  return (
    <main>
      <h1 className="container text-3xl font-extrabold mb-12">
        Trending courses
      </h1>
      <div className=" container relative flex items-center">
        <div className="rounded-full hover:opacity-100 opacity-50 ">
          <ChevronLeft size={40} id="slideLeft" onClick={slideLeft} />
        </div>
        <div
          className="flex overflow-x-scroll scroll-smooth container no-scrollbar"
          id="slider"
        >
          {courses.map((course, i) => {
            return (
              <div
                className="px-2 pt-2 min-w-[300px] cursor-pointer group"
                key={i}
                onClick={() => {
                  router.push(`/user/courses/${course._id}`);
                }}
              >
                <CourseCard
                  image={course.image}
                  teacher={course.teacher}
                  title={course.title}
                  price={course.price}
                  id={course._id}
                  category={course.category}
                />
              </div>
            );
          })}
        </div>
        <div className="rounded-full hover:opacity-100 opacity-50 scroll">
          <ChevronRight size={40} id="slideRight" onClick={slideRight} />
        </div>
      </div>
    </main>
  );
}

export default Coursecard;
