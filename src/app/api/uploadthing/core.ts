import { connectDb } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getSession } from "next-auth/react";

import { Session } from "next-auth";

const f = createUploadthing();

const auth = async (session: Session) => {
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session.user.userId;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => )
    .onUploadComplete((uploadedFile) => {
      // Handle the uploaded file here, e.g., save it to the server or database
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
