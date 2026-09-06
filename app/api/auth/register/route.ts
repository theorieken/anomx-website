import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { countUsers, createUser, ensureUsersTable } from "@/lib/database";
import { createSession } from "@/lib/session";

export const runtime = "nodejs";

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    await ensureUsersTable();

    // Only allow registration if no users exist (first user creation)
    const userCount = await countUsers();
    if (userCount > 0) {
      return NextResponse.json(
        { message: "Registration is closed. An admin account already exists." },
        { status: 403 }
      );
    }

    const passwordHash = hashPassword(password);
    await createUser(name, email, passwordHash);

    // Log the user in immediately after registration
    const storedUser = await (
      await import("@/lib/database")
    ).findUserByEmail(email);

    const token = createSession({
      userId: storedUser!.id,
      name: storedUser!.name,
      email: storedUser!.email,
    });

    const response = NextResponse.json({
      message: "Account created successfully.",
      user: { id: storedUser!.id, name: storedUser!.name, email: storedUser!.email },
    });

    response.cookies.set("anomx_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: unknown) {
    // Handle duplicate email
    if (error && typeof error === "object" && "code" in error && error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
