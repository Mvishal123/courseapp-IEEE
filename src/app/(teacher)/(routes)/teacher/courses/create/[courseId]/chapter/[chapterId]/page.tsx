import { redirect, useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Eye,
  LayoutDashboard,
  Video,
} from "lucide-react";
import { connectDb } from "@/lib/db";
import toast from "react-hot-toast";
import { Chapter, MuxData } from "@/models/index";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";

import IconBadge from "@/components/ui/IconBadge";
import ChapterTitleForm from "../../../_components/chapterTitleForm";
import ChapterDescriptionForm from "../../../_components/chapterDescriptionForm";
import ChapterAcessForm from "../../../_components/chapterAccessForm";
import ChapterVideoForm from "../../../_components/chapterVideoForm";
import Banner from "@/components/Banner";
import ChapterActionButtons from "../../../_components/chapterActionButton";

connectDb();

const ChapterDetailsSection = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const session = await getServerSession(handler);

  if (!session) {
    return redirect("/");
  }

  const chapter = await Chapter.findOne({
    _id: params.chapterId,
    courseId: params.courseId,
  }).populate("muxData");

  if (!chapter) {
    toast.error("Something went wrong");
    console.log("chapter not found");

    return redirect(`/teacher/courses/create/${params.courseId}`);
  }

  const muxData = await MuxData.findOne({ chapterId: params.chapterId });

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const isRemaining = requiredFields.filter(Boolean).length;
  const isCompleted = isRemaining === requiredFields.length;

  const requiredRender = `Complete all fields (${isRemaining}/${requiredFields.length})`;

  const notPublishedLabel =
    "This chapter is not published yet and will not be visible to the users";

  return (
    <div>
      {!chapter.isPublished ? (
        <Banner
          label={notPublishedLabel}
          status="warning"
          icon={AlertTriangle}
        />
      ) : null}
      <div className="container mt-6">
        <div >
          <div className="flex items-center justify-between w-full text-sm">
            <Link href={`/teacher/courses/create/${params.courseId}`}>
              <div className="flex gap-2 items-center text-slate-800 hover:text-slate-600 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                <p>back to the course setup</p>
              </div>
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <div className="mt-4 flex-col">
              <h1 className="text-4xl font-bold">Create chapter</h1>
              <div className="text-sm mt-2 text-slate-600 italic">
                {requiredRender}
              </div>
            </div>
            <div>
              <ChapterActionButtons
                chapterId={params.chapterId}
                courseId={params.courseId}
                isCompleted={isCompleted}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="md:mt-12 mt-6 grid md:grid-cols-2 grid-cols-1 space-x-20">
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold">
                <IconBadge icon={LayoutDashboard} />
                <p className="text-xl">Customize your chapter</p>
              </div>
              <div className="mt-6">
                <div>
                  <ChapterTitleForm
                    initialValue={chapter.title}
                    chapterId={params.chapterId}
                    courseId={params.courseId}
                  />
                </div>
                <div>
                  <ChapterDescriptionForm
                    initialValue={chapter.description}
                    chapterId={params.chapterId}
                    courseId={params.courseId}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex gap-2 items-center text-xl font-bold">
                <IconBadge icon={Eye} />
                <h1>Course access</h1>
              </div>
              <div>
                <ChapterAcessForm
                  initialValue={chapter.isFree}
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                />
              </div>
            </div>
          </div>

          {/* Grid col 2 section */}
          <div>
            <div>
              <div className="flex items-center gap-2 text-lg font-bold">
                <div>
                  <IconBadge icon={Video} />
                </div>
                <h1>Chapter Video</h1>
              </div>
              <div className="mt-6">
                <ChapterVideoForm
                  initialValue={chapter?.videoUrl}
                  playbackId={muxData?.playbackId}
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterDetailsSection;
