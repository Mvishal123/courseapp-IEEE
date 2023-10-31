import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models";
import { connectDb } from "@/lib/db";
import jwt from "jsonwebtoken";

connectDb();

export async function POST(req: NextRequest) {
  try {
    const bodyData = await req.json();
    const { username, password, email } = bodyData;

    const user = await User.findOne({ email, username });
    if (user) {
      return NextResponse.json(
        {
          message: "Try a different username or email",
        },
        { status: 409 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    const tokenData = {
      username: newUser.username,
      email: newUser.email,
      userId: newUser._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    console.log("signup -> tokendata ---> ", tokenData);

    const response = NextResponse.json(
      {
        message: "User created successfully",
      },
      { status: 200 }
    );

    response.cookies.set("tokenss", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
}
