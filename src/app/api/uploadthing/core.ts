import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { handler } from "../auth/[...nextauth]/route";
const f = createUploadthing();

const auth = async () => {
  const session = await getServerSession(handler);
  if (session) {
    return session.user.userId;
  }

  return false;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(auth)
    .onUploadComplete((uploadedFile) => {
      // Handle the uploaded file here, e.g., save it to the server or database
    }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => auth())
    .onUploadComplete(() => {}),
  courseVideo: f({ video: { maxFileSize: "256GB", maxFileCount: 1 } })
    .middleware(() => auth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
