import { CourseData } from "@/types";
import {Rating} from "@mui/material";

const CourseCard = (props: CourseData) => {
  return (
    <div>
      <img
        src= {props.image ? String(props.image) : "https://wallpaper.dog/large/20525131.jpg"} 
        alt = ""
        className="h-38 w-66 group-hover:scale-105"
      />
      <div>
        <h1 className="text-lg font-bold pt-1">{props.title}</h1>
        <span className="text-slate-500">{props.teacher}</span>
        <div className="flex items-center justify-between py-2 ">
          <span className="text-lg font-bold">{props.price}</span>
          <div className="flex items-center">
            <Rating readOnly></Rating>
            <span className="text-sm px-2 text-slate-500">(0)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
