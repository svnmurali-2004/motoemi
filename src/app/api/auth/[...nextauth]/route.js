// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import users from "@/models/userModel"; // Adjust path as needed
// Import or define verifyPassword
import { verifyPassword } from "@/lib/hash"; // Adjust path as needed
import db from "@/dbConfig/dbConfig"; // Adjust path as needed
export const authOptions = {
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
        role: {
          label: "Role",
          type: "text",
          placeholder: "admin or employee",
        },
        branch: {
          label: "Branch",
          type: "text",
          placeholder: "Branch (if employee)",
        },
      },
      async authorize(credentials) {
        await db();
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.role
        ) {
          throw new Error("Missing email, password, or role");
        }
        const user = await users.findOne({ email: credentials.email });
        if (
          user &&
          (await verifyPassword(credentials.password, user.password))
        ) {
          // If employee, check branch
          if (credentials.role === "employee") {
            if (!credentials.branch) {
              throw new Error("Branch is required for employees");
            }
            if (!user.branch || user.branch !== credentials.branch) {
              throw new Error("Invalid branch for employee");
            }
          }
          if (credentials.role !== user.role) {
            throw new Error("Role mismatch");
          }
          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role || "user",
            branch: user.branch || null,
          };
        }
        throw new Error("Invalid email or password");
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
        token.branch = user.branch || null; // Add branch if available
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.branch = token.branch;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
