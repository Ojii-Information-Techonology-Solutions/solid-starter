import { A } from "@solidjs/router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { IconUser, IconSettings, IconLogout, IconSun, IconMoon, IconLaptop } from "~/components/icons";
import { useColorMode } from "@kobalte/core";


export function UserNav() {
  const { setColorMode } = useColorMode();

  return (
    <>

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

      <DropdownMenu>
        <DropdownMenuTrigger as={Button} variant="ghost" class="relative h-8 w-8 rounded-full">
          <Avatar class="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>DU</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="end">
          <DropdownMenuLabel class="font-normal">
            <div class="flex flex-col space-y-1">
              <p class="text-sm font-medium leading-none">Demo User</p>
              <p class="text-xs leading-none text-muted-foreground">demo@gmail.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem as={A} href="/profile">
            <IconUser class="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem as={A} href="/settings">
            <IconSettings class="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem as={A} href="/auth/logout">
            <IconLogout class="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
