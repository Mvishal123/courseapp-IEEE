import React from "react";

type Chapters = {
  chapters: Object[];
};

const CourseChapterView = ({ chapters }: Chapters) => {
  return (
    <div>
      {chapters.map((chapter: any, index: number) => (
        <h1>{chapter.title}</h1>
      ))}
    </div>
  );
};

export default CourseChapterView;
