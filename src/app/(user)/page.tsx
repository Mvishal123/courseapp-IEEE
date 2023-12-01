import Footer from "@/components/Footer";
import Companies from "@/components/user/Companies";
import CourseSlider from "@/components/user/CourseSlider";
import HeroUser from "@/components/user/Hero";
import Card1 from "@/components/user/landing/Card1";
import { CourseCategory } from "@/models";
import React from "react";
import CategoryCards from "./_components/CategoryCards";
import { connectDb } from "@/lib/db";

const HomePage = async () => {
  await connectDb();
  const categories = await CourseCategory.find({}); 

  return (
    <div className="">
      <HeroUser />
      <Companies />
      <hr />
      <div className="container pt-8">
        <h1 className="font-bold text-3xl">Topics recommended</h1>
        <div className="grid md:grid-cols-4 grid-cols-3 gap-3 mt-4 place-content-center">
          {categories.map((category: any, index: number) => (
            <CategoryCards
              label={`${category.category}`}
              value={`${category._id}`}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="mt-12">
        {/* <CourseSlider /> */}
        COURSES TO BE DISPLAYED
      </div>
      <br />
      <Card1 />
      {/* top categories */}
      {/* testimonials */}
      {/* get started as a teacher */}
      <div className="pt-8">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
