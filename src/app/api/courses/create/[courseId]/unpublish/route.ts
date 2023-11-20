import { handler } from "@/app/api/auth/[...nextauth]/route";
import { Course } from "@/models";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = getServerSession(handler);
    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const course = await Course.findById(params.courseId).populate("chapters");
    if (!course) {
      return NextResponse.json("Unauthorized", { status: 404 });
    }

    course.isPublished = false;
    await course.save();

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error: any) {
    console.log("[COURSE PUBLISH ERROR", error.message);
    return NextResponse.json(error.message, { status: 500 });
  }
}
