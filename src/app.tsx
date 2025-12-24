import { createAsync, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createMemo, ErrorBoundary } from "solid-js"; // Added ErrorBoundary
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import { Toaster } from "~/components/ui/sonner";


import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./app.css"; 

import { useAuthSession } from "./lib/session";

export default function App() {

  return (
    <MetaProvider>
      <Title>Ojii ITS</Title>
      <Router
        root={(props) => {

          return (
            <ErrorBoundary fallback={(err) => {
              console.error("Global Error:", err);
              return <div class="p-4 text-red-500">Something went wrong. Check console.</div>
            }}>

              <Suspense>{props.children}</Suspense>
              <Toaster />
            </ErrorBoundary>
          );
        }}
      >
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}