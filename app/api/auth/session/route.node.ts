import { NextResponse } from "next/server";
import { getSessionFromCookies, destroySession } from "@/lib/session";

export const runtime = "nodejs";

// GET /api/auth/session - check current session
export async function GET() {
  try {
    const { session } = await getSessionFromCookies();

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({
      authenticated: true,
      user: { id: session.userId, name: session.name, email: session.email },
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}

// DELETE /api/auth/session - logout
export async function DELETE() {
  try {
    const { token } = await getSessionFromCookies();

    if (token) {
      destroySession(token);
    }

    const response = NextResponse.json({ message: "Logged out." });
    response.cookies.set("anomx_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
