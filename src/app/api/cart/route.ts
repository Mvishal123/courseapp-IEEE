import { getServerSession } from "next-auth";
import { handler } from "../auth/[...nextauth]/route";
import { User } from "@/models";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";

connectDb();
export async function GET() {
  try {
    const session = await getServerSession(handler);
    const user = await User.findOne({ email: session?.user.email });

    // console.log(user);
    

    if (!user) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const count = user.cart.length;
    return NextResponse.json({ count });
  } catch (error: any) {
    console.log("[CART GET ERROR", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
