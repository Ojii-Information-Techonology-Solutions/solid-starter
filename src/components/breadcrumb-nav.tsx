import { useLocation } from "@solidjs/router";
import { createMemo, For } from "solid-js";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
// import { useColorMode } from "@kobalte/core"
// import { IconLaptop, IconMoon, IconSun } from "~/components/icons"
// import { Button } from "~/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger
// } from "~/components/ui/dropdown-menu"


export function BreadcrumbNav() {
  const location = useLocation();
  // const { setColorMode } = useColorMode();

  const links = createMemo(() => {
    const path = location.pathname;
    if (path === "/") {
      return [{ title: "Dashboard", href: "/", last: true }];
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

    return [{ title: "Dashboard", href: "/", last: false }, ...breadcrumbs];
  });

  return (
    <>
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

    </>
  );
}