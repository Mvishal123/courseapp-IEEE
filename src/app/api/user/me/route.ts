import { NextRequest, NextResponse } from "next/server";
import { getCookieData } from "@/helper/getCookieData";

export async function GET(req: NextRequest) {
  try {
    const cookieData = getCookieData(req);
    // console.log("cookie data", cookieData);
    return NextResponse.json(
      {
        message: "User present",
        data: cookieData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // throw new Error(error.message);
    return NextResponse.json(
      {
        message: "User not present",
        data: null,
      },
      { status: 401 }
    );
  }
}
