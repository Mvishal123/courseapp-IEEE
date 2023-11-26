import { Course } from "@/models";
import { columns } from "./_components/columns";
import CoursePageTopClient from "./_components/coursePageTopClient";
import { DataTable } from "./_components/data-table";
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { User } from "@/models";
import CourseTable from "./_components/CourseTable";

// async function getData(userId: string): Promise<any[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ];
// }

const CoursePage = async () => {
  const session = await getServerSession(handler);
  if (!session) return <div></div>;

  const user = await User.findOne({ email: session.user.email });
  let courses = await Course.find({ userId: user._id });

  console.log("courses", courses);
  

  return (
    <div className="container pt-6">
      <CoursePageTopClient />
      <div className="mt-4">
        <div>
          <DataTable columns={columns} data={courses} />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
