import { useLocation } from "@solidjs/router";
import { createMemo, For } from "solid-js";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { useColorMode } from "@kobalte/core"
import { IconLaptop, IconMoon, IconSun, IconSettings, IconLogout, IconUser, IconProfile } from "~/components/icons"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"


export function BreadcrumbNav() {
  const location = useLocation();
  const { setColorMode } = useColorMode();

  const links = createMemo(() => {
    const path = location.pathname;
    if (path === "/") {
      return [{ title: "Home", href: "/", last: true }];
    }

    const segments = path.split("/").filter((item) => item !== "");
    const breadcrumbs = segments.map((item, index) => {
      const title = item
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");

      return {
        title,
        href: `/${segments.slice(0, index + 1).join("/")}`,
        last: index === segments.length - 1,
      };
    });

    return [{ title: "Home", href: "/", last: false }, ...breadcrumbs];
  });

  return (
    <header class="flex h-16 shrink-0 items-center justify-between border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-1 w-full">

      <div class="flex items-center gap-2">
        <SidebarTrigger class="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <For each={links()}>
              {(link) => (
                <>
                  <BreadcrumbItem>
                    {link.last ? (
                      <div class="font-medium">{link.title}</div>
                    ) : (
                      <BreadcrumbLink href={link.href}>{link.title}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!link.last && <BreadcrumbSeparator />}
                </>
              )}
            </For>
          </BreadcrumbList>
        </Breadcrumb>
      </div>


      <div class="flex items-center gap-4">

        <DropdownMenu>
          <DropdownMenuTrigger as={Button<"button">} variant="ghost" size="sm" class="w-9 px-0">
            <IconSun class="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <IconMoon class="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span class="sr-only">Toggle theme</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setColorMode("light")}>
              <IconSun class="mr-2 size-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setColorMode("dark")}>
              <IconMoon class="mr-2 size-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setColorMode("system")}>
              <IconLaptop class="mr-2 size-4" />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger as={Button<"button">} variant="ghost" class="relative h-8 w-8 rounded-full">
            <Avatar class="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>
              <div class="flex flex-col space-y-1">
                <p class="text-sm font-medium leading-none">John Doe</p>
                <p class="text-xs leading-none text-muted-foreground">john@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconProfile class="size-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconSettings class="size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="">
              <IconLogout class="size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}