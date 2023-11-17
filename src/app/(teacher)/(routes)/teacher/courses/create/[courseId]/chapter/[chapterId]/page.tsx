"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const ChapterDetailsSection = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user) {
    router.push("/teacher");
  }

  return (
    <div className="p-6">
        <div className="">
            <div className="flex items-center justify-between w-full">
                <div>
                    <div>
                        <ArrowLeft />
                    </div>
                    <p>
                        back to the course setup
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
};

export default ChapterDetailsSection;
