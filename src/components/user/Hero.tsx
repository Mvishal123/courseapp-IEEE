import React from "react";

const HeroUser = () => {
  return (
    <main>
      <div className="pt-28 bg-gradient-to-t from-fuchsia-100 to-slate-100">
        <div className="flex md:flex-row flex-col justify-evenly container">
          <div>
            <h1 className="flex items-start md:text-4xl text-3xl font-extrabold tracking-tight mt-4">
              Don't just browse the web, <br /> learn to design it.
            </h1>
            <p className="text-slate-600 text-xl md:pt-3">spend around 30 minutes a day skyrocket your career</p>
          </div>
          <div className="flex justify-center items-">
            <img src="/Teacher.png" alt="teacher" className="md:h-[400px] h-[200px] mt-10 md:m-0" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroUser;
