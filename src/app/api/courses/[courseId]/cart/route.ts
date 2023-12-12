import { handler } from "@/app/api/auth/[...nextauth]/route";
import { connectDb } from "@/lib/db";
import { User } from "@/models";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

connectDb();
export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(handler);
    const user = await User.findOne({ email: session?.user.email });

    if (!user) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    await user.cart.push(params.courseId);
    user.save();

    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    console.log("[CART ERROR", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function GET() {
    const session = await getServerSession(handler);
    const user = await User.findOne({ email: session?.user.email });

    if (!user) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const count = user.cart.length;
    return NextResponse.json({ count });
}
