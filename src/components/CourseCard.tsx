import { currencyConverter } from "@/helper/currencyConverter";
import { CourseData } from "@/types";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  image: string;
  title: string;
  price: string;
  teacher: string;
  id: string;
  category:string;
}

const CourseCard = ({ image, title, price, teacher, id, category }: CourseCardProps) => {

  // const starCount = data.stars.length !== 0 ?  

  return (
    <div className="w-full border p-2 rounded-md hover:shadow-sm cursor-pointer">
      <Link href={`/courses/${id}`}>
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
              <Rating readOnly value={0} size="small"/>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
