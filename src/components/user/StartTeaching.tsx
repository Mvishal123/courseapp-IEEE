"use client";
import React from "react";
import { useRouter } from "next/navigation";

const StartTeaching = () => {
  const router = useRouter();
  return (
    <div
      className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-[2.5px] rounded-full w-full gap-6"
      onClick={() => router.push("/teacher")}
    >
      <div className="bg-white rounded-full px-2 hover:bg-transparent hover:text-white font-bold cursor-pointer text-center">
        <p>Start teaching</p>
      </div>
    </div>
  );
};

export default StartTeaching;
