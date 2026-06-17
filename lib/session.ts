import { cookies } from "next/headers";
import crypto from "node:crypto";

type SessionData = {
  userId: number;
  name: string;
  email: string;
};

// Simple in-memory session store for development/MVP.
// For production, use Redis or a database-backed session store.
const sessions = new Map<string, SessionData>();

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function createSession(data: SessionData): string {
  const token = generateSessionToken();
  sessions.set(token, data);
  return token;
}

export function getSession(token: string): SessionData | undefined {
  return sessions.get(token);
}

export function destroySession(token: string): void {
  sessions.delete(token);
}

export async function getSessionFromCookies(): Promise<{
  session: SessionData | null;
  token: string | null;
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get("anomx_session")?.value ?? null;

  if (!token) {
    return { session: null, token: null };
  }

  const session = getSession(token);
  if (!session) {
    return { session: null, token: null };
  }

  return { session, token };
}
