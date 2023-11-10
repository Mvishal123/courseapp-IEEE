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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string} }
) {
  try {
    const searchParams = req.nextUrl.searchParams
    const url = searchParams.get('url')

    console.log("URL: {DELETE}", url);
    

    // const course = await Course.findById(params.courseId);
    // const session = await getServerSession(handler);

    // if (!course.userId === session?.user.userId) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    // console.log("URL: {DELETE}", params.url);
    // console.log(": {DELETE}", params.url);

    // const filterdAttachment = course.attachments.filter(
    //   (att: string) => att !== params.url
    // );
    // course.attachments = filterdAttachment;

    // await course.save();

    return NextResponse.json(
      { message: "Attachment deleted" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
