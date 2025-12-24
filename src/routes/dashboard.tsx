import { createAsync, redirect, useNavigate } from "@solidjs/router";
import { createEffect, Show } from "solid-js";
import LayoutSwitch from "~/components/layout-switch"
import ProtectedRoute from "~/components/protected-route";
import { getAuthenticatedUser } from "~/lib/user";

export default function Dashboard() {

  const userID = createAsync(() => getAuthenticatedUser());

  return (

    <ProtectedRoute>
      <Show when={userID()}>
        <LayoutSwitch>
          <div>
            <h1>Dashboard</h1>
            <div class="flex flex-1 flex-col gap-4 p-4">
              <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div class="aspect-video rounded-xl bg-muted/50" />
                <div class="aspect-video rounded-xl bg-muted/50" />
                <div class="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </div>
        </LayoutSwitch>
      </Show>
    </ProtectedRoute>

  );
}