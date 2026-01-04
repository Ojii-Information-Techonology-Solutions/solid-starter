import { Suspense } from "solid-js";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { BreadcrumbNav } from "~/components/breadcrumb-nav";
import { UserNav } from "~/components/user-nav";
import { Separator } from "~/components/ui/separator";

export default function Authenticated(props: { children: any }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center justify-between border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-1 w-full">
          <div class="flex items-center gap-2">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 h-4" />
            <BreadcrumbNav />
          </div>
          <UserNav />
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <Suspense>{props.children}</Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
