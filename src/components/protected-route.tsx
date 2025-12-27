import { createAsync, useNavigate } from "@solidjs/router";
import { createEffect, type JSX } from "solid-js";
import { getAuthenticatedUser } from "~/lib/user";
import LayoutSwitch from "./layout-switch";

export default function ProtectedRoute(props: { children: JSX.Element }) {
  const userID = createAsync(() => getAuthenticatedUser());
  const navigate = useNavigate();

  createEffect(() => {
    if (userID() === null) {
      navigate("/", { replace: true });
    }
  });

  return (
    <LayoutSwitch>
      {props.children}
    </LayoutSwitch>
  );
}
