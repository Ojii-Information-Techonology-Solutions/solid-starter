import { createAsync, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createMemo, ErrorBoundary } from "solid-js"; // Added ErrorBoundary
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import { Toaster } from "~/components/ui/sonner";
import { getAuthenticatedUser } from "./lib/user";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./app.css"; 

import Authenticated from "~/layouts/AuthenticatedLayout";
import BlankLayout from "~/layouts/BlankLayout";

export default function App() {
  return (
    <MetaProvider>
      <Title>TicketBux</Title>
      <Router
        root={(props) => {

          const userId = createAsync(() => getAuthenticatedUser());

          // Robust path checking
          const layoutType = createMemo(() => {
            if (userId()) return "authenticated";
            
            const path = props.location.pathname.toLowerCase();
            const blankRoutes = ["/", "/login", "/register", "/forgot-password"];
            const isMatch = blankRoutes.some(route => path === route || path === `${route}/`);
            
            return isMatch ? "blank" : "authenticated";
          });

          return (
            <ErrorBoundary fallback={(err) => {
              console.error("Global Error:", err);
              return <div class="p-4 text-red-500">Something went wrong. Check console.</div>
            }}>
              {layoutType() === "blank" ? (
                <BlankLayout>
                  <Suspense>{props.children}</Suspense>
                </BlankLayout>
              ) : (
                <Authenticated>
                  <Suspense>{props.children}</Suspense>
                </Authenticated>
              )}
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