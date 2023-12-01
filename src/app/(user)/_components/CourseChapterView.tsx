import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ArrowDown, ChevronDown, PlayIcon } from "lucide-react";
import Link from "next/link";

type Chapters = {
  chapters: {
    title: string;
    description: string;
    isFree: boolean;
    _id: string;
    courseId: string;
  }[];
};

const CourseChapterView = ({ chapters }: Chapters) => {
  return (
    <div>
      {chapters.map((chapter, index) => (
        <div key={index}>
          <Collapsible>
            <div className="md:w-1/2 w-full flex bg-slate-100 p-2 rounded-sm justify-between">
              <div className="flex items-center gap-4 cursor-pointer">
                <h1>{chapter.title}</h1>
                {chapter.isFree && (
                  <Link
                    href={`/courses/learn/${chapter.courseId}/${chapter.courseId}`}
                  >
                    <div className="bg-emerald-600 text-xs p-[2px_5px] rounded-full text-white  hover:bg-emerald-700">
                      <div className="flex items-center gap-1">
                        <p>Free preview</p>
                        <PlayIcon className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              <CollapsibleTrigger>
                <ChevronDown />
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <div
                className="p-2 border md:w-1/2 w-full rounded-sm"
                dangerouslySetInnerHTML={{ __html: chapter.description }}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
};

export default CourseChapterView;
