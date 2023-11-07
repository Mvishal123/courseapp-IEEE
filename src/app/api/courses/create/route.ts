import { NextRequest, NextResponse } from "next/server";
import { Course } from "@/models";
import { connectDb } from "@/lib/db";

connectDb();

export async function POST(req: NextRequest) {
  try {
    const { userId, data } = await req.json();
    console.log("[CREATE]", userId, data);
    

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const newCourse = new Course({
      title: data.title,
      userId,
    });
    await newCourse.save();

    console.log("[CREATE]", newCourse);

    return NextResponse.json({ courseId: newCourse._id }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
