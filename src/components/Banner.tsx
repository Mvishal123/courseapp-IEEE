import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface BannerProps {
  label: string;
  status: "warning" | "success";
  icon: LucideIcon;
}

const Banner = ({ label, icon: Icon, status }: BannerProps) => {
  return <div className={cn("p-2 flex items-center justify-center gap-2 border-1 border text-sm md:text-md px-3", status === "warning" ? "bg-yellow-200/50": "bg-purple-600/50")}>
    <Icon className="w-4 h-4"/>
    {label}
  </div>;
};

export default Banner;
