import { action, redirect } from "@solidjs/router";
import { useAuthSession } from "~/lib/session";

export const logoutAction = action(async () => {
  "use server";

  const session = await useAuthSession();

  // Clear session data
  await session.update({
    userId: undefined,
    email: undefined
  });

  return redirect("/");
}, "logout-action");
