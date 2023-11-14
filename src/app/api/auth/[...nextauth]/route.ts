import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import toast from "react-hot-toast";
import bcrypt from "bcryptjs";

import { User } from "@/models";
import { connectDb } from "@/lib/db";

const handler: NextAuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    //@ts-ignore
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "johndoe" },
        password: { label: "password", type: "password", placeholder: "..." },
        email: { label: "email", type: "email", placeholder: "name@gmail.com" },
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) return false;

        await connectDb();
        // console.log(credentials);

        const user = await User.findOne({ email: credentials?.email });
        if (!user) return false;

        const isPasswordValid = bcrypt.compare(
          credentials?.password,
          user.password
        );

        if (!isPasswordValid) return false;

        return user;
      },
    }),
    // //@ts-ignore
    // CredentialsProvider({
    //   name: "adminCredentials",
    //   credentials: {
    //       email: { label: "email", type: "email", placeholder: "organization email"},
    //       password: { label: "password", type: "password", placeholder: "..." },
    //       organization: { label: "organization", type: "text", placeholder: "organization name" },
    //   },
    //   async authorize(credentials) {
    //     if(!credentials?.email || !credentials.password || !credentials?.organization) return false;

    //     await connectDb();

    //     const admin = await Admin.findOne({email: credentials.ema})
    //   }

    // })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET!,
  debug: process.env.NODE_ENV === "development",
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

export { handler as GET, handler as POST, handler };
