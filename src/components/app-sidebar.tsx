import { For, ComponentProps } from "solid-js";
import { A, useLocation } from "@solidjs/router";

// Import your custom icons
import {
  IconDashboard,
  IconTicket,
  IconFile,
  IconRocket,
  IconDatabase,
  IconDesktop,
  IconZap,
  IconSmile,
  IconTerminal,
  IconUpdates,
  IconSettings,
  IconSearch,
  IconComponents,
  IconLogin,
  IconRegister,
  IconForgotPassword,
  IconVerifyEmail,
  IconOTP,
  IconBiometrics,
  IconLogout,
  IconFingerPrint,
  IconEvents,
  IconVenues
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
    title: "General",
    items: [
      { title: "Dashboard", link: "/dashboard", icon: IconDashboard },
      { title: "Events", link: "/events", icon: IconEvents },
      { title: "Venues", link: "/venues", icon: IconVenues },
      { title: "Tickets", link: "/tickets", icon: IconTicket },
      { title: "Structure", link: "/structure", icon: IconFile }
    ]
  },
  {
    title: "Application",
    items: [
      { title: "Routing", link: "/routing", icon: IconRocket },
      { title: "Data", link: "/data", icon: IconDatabase },
      { title: "Rendering", link: "/rendering", icon: IconDesktop },
      { title: "Caching", link: "/caching", icon: IconZap },
      { title: "Styling", link: "/styling", icon: IconSmile }
    ]
  },
  {
    title: "Architecture",
    items: [
      { title: "CLI", link: "/cli", icon: IconTerminal },
      { title: "Compiler", link: "/compiler", icon: IconUpdates },
      { title: "Settings", link: "/settings", icon: IconSettings }
    ]
  },
  {
    title: "Components",
    items: [
      { title: "Sonner Demo", link: "/components/sonner-demo", icon: IconComponents },
      { title: "Button Demo", link: "/components/button-demo", icon: IconUpdates },
      { title: "Dialog Demo", link: "/components/dialog-demo", icon: IconSettings }
    ]
  }, {
    title: "Identity",
    items: [
      { title: "Login", link: "/", icon: IconLogin },
      { title: "Register", link: "/auth/register", icon: IconRegister },
      { title: "Forgot", link: "/auth/forgot", icon: IconForgotPassword },
      { title: "Verify", link: "/auth/verify", icon: IconVerifyEmail },
      { title: "OTP", link: "/auth/otp", icon: IconOTP },
      { title: "Biometrics", link: "/auth/biometrics", icon: IconBiometrics },
      { title: "Logout", link: "/auth/logout", icon: IconLogout }
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