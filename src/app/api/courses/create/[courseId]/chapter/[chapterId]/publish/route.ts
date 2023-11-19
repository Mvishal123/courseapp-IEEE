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
  console.log("chapterId", params.chapterId, "courseId", params.courseId);

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

    if (!chapter.isPublished) {
      chapter.isPublished = true;
      await chapter.save();
    }

    return NextResponse.json({ message: "Chapter updated" }, { status: 200 });
  } catch (error: any) {
    console.log("[CHAPTER PUBLISH ERROR]", error.message);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
