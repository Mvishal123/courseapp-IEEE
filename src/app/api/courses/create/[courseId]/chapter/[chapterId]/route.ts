import { handler } from "@/app/api/auth/[...nextauth]/route";
import { connectDb } from "@/lib/db";
import { Chapter } from "@/models";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

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
    const chapter = await Chapter.findByIdAndUpdate(params.chapterId, data);

    return NextResponse.json({ message: "Chapter updated" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
