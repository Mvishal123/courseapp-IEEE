import React from "react";
import { Button } from "@/components/ui/button";

const Card1 = () => {
  return (
    <div id="card1" className="container mt-20">
      <div
        className="w-full h-72 mx-auto"
        style={{
          backgroundImage: `url("landing/card1_img.jpg")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="pl-6 pt-10">
          <div className="w-1/2 text-3xl font-extrabold text-slate-800">
            <h1>Still confused about your career?</h1>
            <h1>
              Start learning from our <br />
              courses
            </h1>
          </div>
          <Button className="mt-6">Get started</Button>
        </div>
      </div>
    </div>
  );
};

export default Card1;
