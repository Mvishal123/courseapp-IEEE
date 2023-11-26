"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";
import { cn } from "@/lib/utils";

interface CategoryCardsProps {
  label: string;
  value: string;
}

const CategoryCards = ({ label, value }: CategoryCardsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategory === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: isSelected ? null : value,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(`/courses/${url}`);
  };
  return (
    <div
      className={cn(
        "p-4 border-2 border-purple-600 rounded-md flex justify-center items-center hover:border-purple-800 cursor-pointer",
        isSelected && "bg-purple-400/20"
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default CategoryCards;
