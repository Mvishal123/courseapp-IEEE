import { handler } from "@/app/api/auth/[...nextauth]/route";
import { connectDb } from "@/lib/db";
import { Chapter, Course, MuxData } from "@/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import Mux from "@mux/mux-node";
const { Video } = new Mux(process.env.MUX_TOKEN_ID!, process.env.MUX_API_KEY!);
connectDb();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { chapterId: string } }
) {
  try {
    const session = await getServerSession(handler);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const data = await req.json();
    console.log("[DATA]", data);

    const chapter = await Chapter.findByIdAndUpdate(params.chapterId, data);

    if (data.videoUrl) {
      const muxData = await MuxData.findOne({ chapterId: params.chapterId });

      if (muxData) {
        chapter.muxData = chapter.muxData.remove(muxData._id);

        await Video.Assets.del(muxData.assetId);
        await MuxData.deleteOne({ _id: muxData._id });
      }

      const asset = await Video.Assets.create({
        input: data.videoUrl,
        playback_policy: "public",
        test: false,
      });

      const newMuxData = await new MuxData({
        chapterId: params.chapterId,
        assetId: asset.id,
        playbackId:
          asset.playback_ids && asset.playback_ids.length > 0
            ? asset.playback_ids[0].id
            : null,
      });

      chapter.muxData.push(newMuxData._id);

      console.log("[MUXDATA]", newMuxData);

      await chapter.save();
      await newMuxData.save();
    }

    return NextResponse.json({ message: "Chapter updated" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { chapterId: string; courseId: string } }
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

    await Chapter.deleteOne({ _id: params.chapterId });

    const courseData = await Course.findOne({ _id: params.courseId });
    await courseData.chapters.pull(params.chapterId);

    const muxData = await MuxData.findOne({ chapterId: params.chapterId });
    if (muxData) {
      await Video.Assets.del(muxData.assetId);
      console.log("[MUXDATA]", muxData);
      await MuxData.findByIdAndDelete(muxData._id);
    }

    await courseData.save();

    return NextResponse.json({ message: "Chapter deleted" }, { status: 200 });
  } catch (error) {
    console.log("[CHAPTER DELETE ERROR]", error);

    return NextResponse.json(
      { message: "Unable to delete the chapter" },
      { status: 500 }
    );
  }
}
