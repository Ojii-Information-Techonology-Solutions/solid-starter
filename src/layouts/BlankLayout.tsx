import { Suspense } from "solid-js";

export default function BlankLayout(props: { children: any }) {
  return (
    <div class="min-h-screen w-full bg-background">
      <Suspense>{props.children}</Suspense>
    </div>
  );
}