import { createAsync, useNavigate } from "@solidjs/router";
import { Show, createEffect, type JSX } from "solid-js";
import { useAuthSession } from "~/lib/session";
import LayoutSwitch from "./layout-switch";

async function getSessionUser() {
  "use server";
  const session = await useAuthSession();
  return session.data.userId || null;
}

export default function ProtectedRoute(props: { children: JSX.Element }) {
  const userId = createAsync(() => getSessionUser());
  const navigate = useNavigate();

  createEffect(() => {
    // Redirect to login if no user
    if (userId() === null) {
      navigate("/", { replace: true });
    }
  });

  return (
    <Show when={userId()}>
      <LayoutSwitch>
        {props.children}
      </LayoutSwitch>
    </Show>
  );
}
