"use client";
import { usePathname, useRouter } from "next/navigation";

import {
  BarChart,
  BookIcon,
  ChevronDownIcon,
  Home,
  LogOut,
  Menu,
} from "lucide-react";

import MenuHeader from "@/components/user/header/MenuHeader";
import { Button } from "@/components/ui/button";
import Cart from "@/components/user/header/Cart";
import Profilebutton from "@/components/user/header/Profilebutton";
import MenuButtons from "@/components/MenuButtons";

import { cn } from "@/lib/utils";

const routes = [
  {
    name: "Home",
    dir: "/teacher",
    icon: Home,
  },
  {
    name: "Courses",
    dir: "/teacher/courses",
    icon: BookIcon,
  },
  {
    name: "Analytics",
    dir: "/teacher/analytics",
    icon: BarChart,
  },
];

const highlighter = () => {};

function UserHeader() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="py-5 flex justify-between items-center">
      <MenuHeader />
      <h1 className="text-4xl font-extrabold text-slate-800 cursor-pointer">
        Skill<span className="text-[#7b2cbf]">Sphere</span>
      </h1>

      <div className="hidden lg:flex justify-center items-center gap-6">
        {routes.map((route) => (
          <MenuButtons name={route.name} icon={route.icon} dir={route.dir} />
        ))}
      </div>
      <div>
        <Button
          className="flex gap-2 "
          variant={"ghost"}
          onClick={() => router.push("/")}
        >
          <span>Exit</span>
          <LogOut />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Profilebutton />
      </div>
    </header>
  );
}

export default UserHeader;
