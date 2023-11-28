import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ArrowDown, ChevronDown } from "lucide-react";

type Chapters = {
  chapters: { title: string, description: string}[];
};

const CourseChapterView = ({ chapters }: Chapters) => {
  return (
    <div>
      <ul>
        {chapters.map((chapter, index) => (
          <div key={index}>
            <Collapsible>
            <div className="md:w-1/2 w-full flex bg-slate-100 p-2 rounded-sm justify-between">
                <h1>{chapter.title}</h1>
                <CollapsibleTrigger>
                    <ChevronDown/>
                </CollapsibleTrigger>
            </div>
              
              <CollapsibleContent>
              <div className="p-2 border md:w-1/2 w-full rounded-sm" dangerouslySetInnerHTML={{ __html: chapter.description }} />
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CourseChapterView;
