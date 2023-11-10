import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { Course } from "@/models/index";
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";

connectDb();

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(handler);
    const { url } = await req.json();
    console.log("URL: ", url);

    const course = await Course.findById(params.courseId);
    console.log("COURSE: ", course);

    if (!course.userId === session?.user.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    course.attachments.push(url);
    await course.save();

    return NextResponse.json({ message: "Attachment added" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url");

    // console.log("URL: {DELETE}", url);

    const course = await Course.findById(params.courseId);
    const session = await getServerSession(handler);

    if (!course.userId === session?.user.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // console.log("URL: {DELETE}", url);
    // console.log(": {DELETE}", url);

    const filterdAttachment = course.attachments.filter(
      (att: string) => att !== url
    );
    course.attachments = filterdAttachment;

    await course.save();

    return NextResponse.json(
      { message: "Attachment deleted" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
