import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Course, User } from "@/models";
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";

interface CourseTableProps {
  userId: string;
}

const CourseTable = async ({ userId }: CourseTableProps) => {
  console.log("HELLO");
  const session = await getServerSession(handler);
  const user = await User.findOne({email: session?.user.email}).populate('createdCourses');
  // console.log("user", user);
  
  const courses = user.createdCourses;

  console.log("courses", courses);

  return (
    <div>
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CourseTable;
