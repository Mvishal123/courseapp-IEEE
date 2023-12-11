"use client";

import { currencyConverter } from "@/helper/currencyConverter";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  data: {
    image: string;
    title: string;
    price: string;
    teacher: string;
    _id: string;
    category: string;
  };
}

const CourseCard = ({ data }: CourseCardProps) => {
  // const starCount = data.stars.length !== 0 ?
  const router = useRouter();
  const { image, title, price, teacher, _id, category } = data;
  
  return (
    <div className="w-full border p-2 rounded-md hover:shadow-sm cursor-pointer" onClick={() => router.push(`/courses/${_id}`)}>
      <div className="">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={`${image}`}
            alt="course image"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="mt-1 font-semibold flex flex-col text-lg">
          {title}
          <span className="text-slate-500 text-xs">{category}</span>
        </div>
        <div className="font-medium mt-2 flex items-center justify-between">
          <div>
            {/* @ts-ignore */}
            {currencyConverter(parseFloat(data.price))}
          </div>
          <div className="">
            <Rating readOnly value={0} size="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
