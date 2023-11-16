import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { Chapter, Course } from "@/models";

connectDb();

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { list } = await req.json();

    for (let item of list) {
      console.log("item", item);

      await Chapter.updateOne(
        { _id: item.chapterId, courseId: params.courseId },
        { $set: { position: item.position } }, // Combine update and use $set to specify the field to update
        { new: true }
      );
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
