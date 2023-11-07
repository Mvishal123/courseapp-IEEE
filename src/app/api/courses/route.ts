import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "../../../lib/db";
import { Course } from "@/models/index";



export async function GET(req: NextRequest) {
  await connectDb();
  const courses = await Course.find({});
  return NextResponse.json(courses);
}
