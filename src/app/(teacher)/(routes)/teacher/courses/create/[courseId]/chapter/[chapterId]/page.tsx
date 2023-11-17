import { getSession, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { connectDb } from "@/lib/db";
import toast from "react-hot-toast";
import { Chapter, MuxData } from "@/models/index";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";

connectDb();

const ChapterDetailsSection = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const session = await getServerSession(handler);

  if (!session) {
    return redirect("/signin");
  }

  const chapter = await Chapter.findOne({
    _id: params.chapterId,
    courseId: params.courseId,
  }).populate("muxData");

  console.log("chapter", chapter);

  if (!chapter) {
    toast.error("Something went wrong");
    console.log("chapter not found");

    return redirect(`/teacher/courses/create/${params.courseId}`);
  }

  const muxData = await MuxData.find({ chapterId: params.chapterId });

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const isCompleted = requiredFields.filter(Boolean).length;

  const requiredRender = `Complete all fields (${isCompleted}/${requiredFields.length})`;

  return (
    <div className="p-6">
      <div className="">
        <div className="flex items-center justify-between w-full text-sm">
          <Link href={`/teacher/courses/create/${params.courseId}`}>
            <div className="flex gap-2 items-center text-slate-800 hover:text-slate-600 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              <p>back to the course setup</p>
            </div>
          </Link>
        </div>
        <div className="mt-4">
          <h1>Create chapter</h1>
        </div>
      </div>
    </div>
  );
};

export default ChapterDetailsSection;
