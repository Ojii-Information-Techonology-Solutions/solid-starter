import { createAsync } from "@solidjs/router";
import { Show, Suspense, type JSX } from "solid-js";
import { getAuthenticatedUser } from "~/lib/user";
import Authenticated from "~/layouts/AuthenticatedLayout";
import BlankLayout from "~/layouts/BlankLayout";

export default function LayoutSwitch(props: { children: JSX.Element }) {
  const userId = createAsync(() => getAuthenticatedUser());

  return (
    <Show 
      when={userId()} 
      fallback={<BlankLayout>{props.children}</BlankLayout>}
    >
      <Authenticated>{props.children}</Authenticated>
    </Show>
  );
}