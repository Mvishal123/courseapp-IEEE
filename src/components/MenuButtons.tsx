"use client";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { LucideIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
interface ButtonProps {
  name: string;
  dir: string;
  icon: LucideIcon;
} 

const MenuButtons = ({ name, dir, icon: Icon }: ButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (pathname === "/teacher" && dir === "/teacher") || (pathname === dir);
  return (
    <Button variant={"ghost"} size="sm" onClick={() => router.push(dir)} key={name} className={cn("gap-2", isActive ? "bg-slate-300/50" : "")}>
      <span className="text-sm">{name}</span>
      <Icon className="h-4 w-4"/>
    </Button>
  );
};

export default MenuButtons;
