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
    console.log(data);
    
    const course = await Course.findByIdAndUpdate(courseId, { title: data.title });
    if (!course) {
      return NextResponse.json("Course not found", { status: 404 });
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
