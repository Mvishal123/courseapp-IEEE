import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { Course } from "@/models";

connectDb();

export async function PATCH(
  req: NextResponse,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    console.log("[UPDATE]", courseId);

    const data = await req.json();
    console.log("[data]: ", data);
    

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json("Course not found", { status: 404 });
    }
    course.set(data);
    await course.save();
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error: any) {
    console.log("here i am :(");
    
    return NextResponse.json(error.message, { status: 500 });
  }
}
