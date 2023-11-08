import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";

export const getServerData = async () => {
  return await getServerSession(handler);
};
