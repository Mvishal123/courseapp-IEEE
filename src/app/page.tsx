import { InitUser } from "@/components/InitUser";
import Companies from "@/components/user/Companies";
import CourseSlider from "@/components/user/CourseSlider";
import HeroUser from "@/components/user/Hero";
import React from "react";

const index = () => {
  return (
    <div className="">
      <InitUser />
      <HeroUser />
      <Companies />
      <hr />
      <div className="mt-12">
        <CourseSlider />
      </div>
    </div>
  );
};

export default index;
