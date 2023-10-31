import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "@/models";

import { connectDb } from "@/lib/db";

connectDb();

export async function POST(req: NextRequest) {
  try {
    const bodyData = await req.json();
    const { email, password } = bodyData;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        { status: 404 }
      );
    } else {
      const isPasswordValid = bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          {
            message: "Invalid credentials",
          },
          { status: 404 }
        );
      } else {
        const tokenData = {
          username: user.username,
          email,
          userId: user._id,
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
          expiresIn: "1d",
        });

        const response = NextResponse.json(
          {
            message: "User logged in successfully",
            cookie: token,
          },
          { status: 200 }
        );

        response.cookies.set("tokenss", token, {
          httpOnly: true,
        });

        return response;
      }
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
