"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LandingHeroSection = () => {
  const router = useRouter();
  return (
    <div className="bg-black/95 top-[11%] w-full md:h-[88vh] h-[55vh] relative z-20">
      <Image
        src={"/teacher_landing_main.jpg"}
        alt="teacher"
        fill
        className="md:bg-center object-fill z-0 opacity-40 "
      />
      <div className="z-50 relative">
        <div className="flex w-full h-[60vh] justify-center items-center flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="md:text-6xl text-5xl text-white font-bold">
              Teach, create, earn.
            </h1>
            <p className="text-center text-white text-md md:text-xl">
              Share your thoughts, connect with professional, and <br /> enrich
              your career.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="text-black bg-yellow-300 hover:bg-yellow-500 px-3 py-2 text-sm md:text-md rounded-full transition-all"
              onClick={() => router.push("/teacher/courses/create")}
            >
              Start teaching
            </button>
            <Link href="#">
              <button className="text-white px-3 py-2 rounded-full border border-white">
                Learn more
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHeroSection;
