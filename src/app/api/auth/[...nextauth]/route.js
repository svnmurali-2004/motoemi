// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import users from "@/models/userModel"; // Adjust path as needed
// Import or define verifyPassword
import { verifyPassword } from "@/lib/hash"; // Adjust path as needed
import db from "@/dbConfig/dbConfig"; // Adjust path as needed
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        await db()
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        const user = await users.findOne({ email: credentials.email });
        if (
          user &&
          (await verifyPassword(credentials.password, user.password))
        ) {
          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role || "user",
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        // Find or create user in DB
        let user = await users.findOne({ email: profile.email });
        if (!user) {
          throw new Error("User not found");
        }
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
