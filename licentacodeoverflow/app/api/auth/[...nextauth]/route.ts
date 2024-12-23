import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import User from "@/model/model_user";
export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await dbConnect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (
            user &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            return user;
          }
        } catch (err: any) {
          throw new Error(err);
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2hours
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.user.User_Id = token.User_Id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.picture = token.picture;
      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.User_Id = user.User_Id;
        token.email = user.email;
        token.name = user.name;
        token.username = user.username;
        token.picture = user.picture;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
