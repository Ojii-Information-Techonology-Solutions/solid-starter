import { useSession, getEvent, type SessionConfig } from "vinxi/http";

// Vinxi uses Iron Session logic: password must be at least 32 chars
const sessionConfig: SessionConfig = {
  password: process.env.SESSION_SECRET || "a-very-secret-password-32-chars-long!!",
  name: "auth-session",
};

type SessionData = {
  userId?: string;
  email?: string;
};

export async function useAuthSession() {
  "use server";
  const event = getEvent();
  if (!event) throw new Error("No Vinxi event found. This must run on the server.");
  
  // This matches your Vinxi example exactly
  return await useSession<SessionData>(event, sessionConfig);
}