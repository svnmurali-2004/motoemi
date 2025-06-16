import db from "@/dbConfig/dbConfig";
import users from "@/models/userModel"; // Make sure this exports your model correctly
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/hash"; // Must be a bcrypt wrapper

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, password, branch, role } = body;

    // Validate required fields
    if (!name || !email || !password || !phone || !branch) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await db();

    // Check for existing email or phone
    const existingUser = await users.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or phone already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await users.create({
      name,
      phone,
      email,
      password: hashedPassword,
      branch,
      role: role || "user", // fallback to "user" if not provided
    });

    // Avoid returning password in response
    const { password: _, ...userWithoutPassword } = user._doc;

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (err) {
    console.error("Error in create user route:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "GET method not allowed" },
    { status: 405 }
  );
}
