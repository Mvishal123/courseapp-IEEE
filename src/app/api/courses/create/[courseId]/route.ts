import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { Chapter, Course, MuxData } from "@/models";
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import Mux from "@mux/mux-node";
import { LucideAward } from "lucide-react";

connectDb();

const { Video } = new Mux(process.env.MUX_TOKEN_ID!, process.env.MUX_API_KEY!);

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
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(handler);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const course = await Course.findOne({
      _id: params.courseId,
    });

    if (!course) {
      return NextResponse.json("Unauthorized", { status: 404 });
    }

    // Delete the respective chapters of the course
    const chapters = await Chapter.find({ courseId: params.courseId });
    // console.log("[chapters]: ", chapters);

    // Delete the muxData's of eaxh chapter associated with the course
    for (let chapter of chapters) {
      const muxData = await MuxData.findOne({ chapterId: chapter._id });
      console.log("[muxData]: ", muxData);
      if (muxData) {
        await Video.Assets.del(muxData.assetId);
        await MuxData.deleteOne({ _id: muxData._id });
      }
    }

    await Chapter.deleteMany({ courseId: params.courseId });

    await Course.deleteOne({ _id: params.courseId});

    return NextResponse.json({ message: "Course deleted" }, { status: 200 });
  } catch (error: any) {
    console.log("[COURSE DELETE API ERROR]", error.message);

    return NextResponse.json(error.message, { status: 500 });
  }
}
