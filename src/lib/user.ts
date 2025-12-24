import { query } from "@solidjs/router";
import { useAuthSession } from "./session";

export const getAuthenticatedUser = query(async () => {
  "use server";
  const session = await useAuthSession();
  return session.data.userId || null;
}, "user-session");