import CoursePageTopClient from "./_components/coursePageTopClient";
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import CourseTable from "./_components/CourseTable";
import { redirect } from "next/navigation";
import { connectDb } from "@/lib/db";

connectDb();

const CoursePage = async () => {
  const session = await getServerSession(handler);
  if (!session) return redirect("/");

  return (
    <div className="container pt-6">
      <CoursePageTopClient />
      <div className="mt-4">
        <div>
          <CourseTable email={session.user.email} />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
