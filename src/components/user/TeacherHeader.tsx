import React from "react";
import Searchbar from "./header/Searchbar";

const TeacherHeader = () => {
  return (
    <header className="py-5 flex justify-between items-center w-full container">
      <h1>
        Skill<span className="text-[#7b2cbf]">Sphere</span>
      </h1>
      <div className="hidden lg:block">
        <Searchbar />
      </div>
    </header>
  );
};

export default TeacherHeader;
