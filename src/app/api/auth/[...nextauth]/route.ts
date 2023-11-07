import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDb } from "@/lib/db";
import toast from "react-hot-toast";
import { User } from "@/models";
import { Profile } from "next-auth";

interface profileImage extends Profile {
  picture: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        await connectDb();
        const user = await User.findOne({ email: session?.user?.email });
        if (user && session.user) {
          session.user.userId = user._id;
        }
      } catch (error: any) {
        toast.error(error.message);
      }
      return session;
    },

    async signIn({ profile }) {
      await connectDb();
      const isUser = await User.findOne({ email: profile?.email });
      if (!isUser) {
        const newUser = await new User({
          username: profile?.name,
          email: profile?.email,
          //@ts-ignore
          profileImage: profile?.picture,
        });
        newUser.save();
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
