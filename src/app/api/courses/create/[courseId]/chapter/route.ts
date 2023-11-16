import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { Chapter, Course } from "@/models/index";

connectDb();

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { title, userId } = await req.json();
    // console.log("CHAPTER FORM", title, userId);

    const course = await Course.findOne({
      _id: params.courseId,
      userId,
    });

    // console.log("COURSE", course);

    if (!course)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const chapterPosition = await Chapter.find({
      courseId: params.courseId,
    }).sort({ position: -1 });

    console.log("CHAPTER POSITION", chapterPosition);

    const newPosition = chapterPosition[0]
      ? chapterPosition[0].position + 1
      : 0;
    console.log("POSITION", newPosition);

    const chapter = new Chapter({
      title,
      position: newPosition,
      courseId: params.courseId,
    });
    await chapter.save();

    const courseChapter = await Course.findOneAndUpdate(
      { _id: params.courseId },
      { $push: { chapters: chapter._id } },
      { new: true }
    );

    return NextResponse.json({ message: "Chapter created" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
