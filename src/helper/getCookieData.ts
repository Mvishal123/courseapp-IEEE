import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getCookieData = (req: NextRequest) => {
  try {
    const token = req.cookies.get("tokenss")?.value || "";
    const decodedTokenData = jwt.verify(token, process.env.JWT_SECRET!);
    // console.log("Tokendata -> ", decodedTokenData);

    return decodedTokenData;
  } catch (error: any) {
    console.log("Error in decoding token -> ", error.message);
  }
};
