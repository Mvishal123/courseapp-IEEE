"use client"
import { useRouter } from "next/navigation";

import { ChevronDownIcon, Menu } from "lucide-react";
import { Button } from "./ui/button";

import Cart from "./user/header/Cart";
import Searchbar from "./user/header/Searchbar";
import StartTeaching from "./user/StartTeaching";
import Profilebutton from "./user/header/Profilebutton";
import MenuHeader from "./user/header/MenuHeader";
import { useEffect } from "react";

function UserHeader() {
  const router = useRouter();


  return (
    <header className="absolute container top-0 w-full px-4 md:px-6 lg:px-8 py-5 flex justify-between items-center backdrop:blur-md border-b/10">
      <MenuHeader />
      <h1 className="text-4xl font-extrabold text-slate-800 cursor-pointer" onClick={() => router.push("/")}>
        Skill<span className="text-[#7b2cbf]">Sphere</span>
      </h1>

      <div className="hidden lg:block">
        <Searchbar />
      </div>

      <div className="hidden lg:flex justify-center items-center">
        <Button variant={"ghost"} onClick={() => router.push("/courses")}>
          All courses
        </Button>

        <Button variant={"ghost"} className="group">
          <span>Learn</span>
          <span className="group-hover:rotate-180">
            <ChevronDownIcon />
          </span>
        </Button>
        <Button variant={"ghost"}>About</Button>
      </div>

      <div className="hidden lg:flex w-[190px]">
        <StartTeaching />
      </div>

      <div className="flex items-center gap-4">
        <div>
          <Cart />
        </div>

        <Profilebutton />
      </div>
    </header>
  );
}

export default UserHeader;
