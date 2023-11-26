import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { User } from "@/models";

export async function GET(req: NextRequest) {
  try {
    const header = headers();
    console.log("ME", headers);

    const email = header.get("email");
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not present",
          data: null,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "success", data: user._id },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "User not present",
        data: null,
      },
      { status: 401 }
    );
  }
}
