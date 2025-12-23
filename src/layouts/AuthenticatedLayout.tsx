import { Suspense } from "solid-js";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { BreadcrumbNav } from "~/components/breadcrumb-nav";

export default function Authenticated(props: { children: any }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
           <BreadcrumbNav />
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <Suspense>{props.children}</Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}