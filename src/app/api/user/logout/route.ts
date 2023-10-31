import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = NextResponse.json(
      {
        message: "Logged out successfully",
      },
      { status: 200 }
    );
    res.cookies.set("tokenss", "", { maxAge: 0 });

    return res;
  } catch (error: any) {
    // throw new Error(error.message);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
