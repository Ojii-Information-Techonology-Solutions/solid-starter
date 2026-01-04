import { createAsync, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import { useAuthSession } from "~/lib/session";

async function performLogout() {
  "use server";
  const session = await useAuthSession();
  await session.clear();
  return true;
}

export default function LogoutPage() {
  const result = createAsync(() => performLogout());
  const navigate = useNavigate();

  createEffect(() => {
    if (result()) {
      navigate("/", { replace: true });
    }
  });

  return (
    <div class="flex min-h-screen items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
        <p class="text-muted-foreground">Logging out...</p>
      </div>
    </div>
  );
}
