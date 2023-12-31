"use client";

import { cn } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";

interface CoursesCategorySliderProps {
  label: string;
  value: string;
}

const CoursesCategorySlider = ({
  value,
  label,
}: CoursesCategorySliderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const cuurentCategory = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = cuurentCategory === label;
  const onCLick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: isSelected ? null : label,
          title: currentTitle
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };
  return (
    <div
      className={cn(
        "bg-slate-200 md:px-4 px-1 text-sm md:text-md rounded-full border border-slate-400 cursor-pointer",
        isSelected && "border border-purple-700 bg-purple-200"
      )}
      onClick={onCLick}
    >
      {label}
    </div>
  );
};

export default CoursesCategorySlider;
