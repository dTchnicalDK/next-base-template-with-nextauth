import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    //implementing credential login
    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },

      async authorize(credentials) {
        //validation if inputs exits
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user || !user.password) return null;
        //verifying password
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!isValid) return null;

        // if evrything is ok! then return user
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          // image: user.image,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub!;

      return session;
    },
  },
});
