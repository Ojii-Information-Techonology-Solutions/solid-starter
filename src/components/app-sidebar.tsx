import { For, ComponentProps } from "solid-js";
import { A, useLocation } from "@solidjs/router";

// Import custom icons
import {
  IconDashboard,
  IconFile,
  IconSearch,
  IconComponents,
  IconInvoice,
  IconKanban,
  IconCard
} from '~/components/icons';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "~/components/ui/sidebar";

import { TeamSwitcher } from "./team-switcher";

const menu = [
  {
    title: "Main",
    items: [
      { title: "Dashboard", link: "/dashboard", icon: IconDashboard },
      { title: "Tasks", link: "/tasks", icon: IconFile },
      { title: "Kanban", link: "/kanban", icon: IconKanban },
      { title: "Invoices", link: "/invoices", icon: IconInvoice }
    ]
  },
  {
    title: "Components",
    items: [
      { title: "Avatar", link: "/components/avatar-demo", icon: IconComponents },
      { title: "Badge", link: "/components/badge-demo", icon: IconComponents },
      { title: "Button", link: "/components/button-demo", icon: IconComponents },
      { title: "Card", link: "/components/card-demo", icon: IconCard },
      { title: "Checkbox", link: "/components/checkbox-demo", icon: IconComponents },
      { title: "Dialog", link: "/components/dialog-demo", icon: IconComponents },
      { title: "Dropdown Menu", link: "/components/dropdown-menu-demo", icon: IconComponents },
      { title: "Form", link: "/components/form-demo", icon: IconComponents },
      { title: "Select", link: "/components/select-demo", icon: IconComponents },
      { title: "Sheet", link: "/components/sheet-demo", icon: IconComponents },
      { title: "Skeleton", link: "/components/skeleton-demo", icon: IconComponents },
      { title: "Sonner", link: "/components/sonner-demo", icon: IconComponents },
      { title: "Table", link: "/components/table-demo", icon: IconComponents },
      { title: "Timeline", link: "/components/timeline-demo", icon: IconComponents },
      { title: "Tooltip", link: "/components/tooltip-demo", icon: IconComponents }
    ]
  }
];

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  const isActive = (href: string) => {
    return href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={[
          { name: "Acme Inc.", logo: "A", plan: "Enterprise" },
          { name: "Beta LLC", logo: "B", plan: "Free" }
        ]} />
        <div class="px-3 py-2">
          <div class="relative">
            <IconSearch class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <input
              placeholder="Search..."
              class="flex h-9 w-full rounded-md border border-input bg-background px-9 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <For each={menu}>
          {(group) => (
            <SidebarGroup>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <For each={group.items}>
                    {(item) => (
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          as={A}
                          href={item.link}
                          isActive={isActive(item.link)}
                          class="transition-all duration-200"
                        >
                          {/* Rendering your custom icon component */}
                          <item.icon class="size-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                  </For>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </For>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}