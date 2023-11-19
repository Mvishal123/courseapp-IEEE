import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import { Chapter, Course } from "@/models";

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: { chapterId: string; courseId: string };
  }
) {
  try {
    const session = await getServerSession(handler);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const chapter = await Chapter.findOne({
      _id: params.chapterId,
      courseId: params.courseId,
    });
    if (!chapter) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (chapter.isPublished) {
      chapter.isPublished = false;

      const publishCheck = await Chapter.find({
        courseId: params.courseId,
        isPublished: true,
      });
      if (publishCheck.length === 0) {
        const course = await Course.findOne({ _id: params.courseId });
        course.isPublished = false;
        await course.save();
      }

      await chapter.save();
    }

    return NextResponse.json({ message: "Chapter updated" }, { status: 200 });
  } catch (error: any) {
    console.log("[CHAPTER PUBLISH ERROR]", error.message);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
