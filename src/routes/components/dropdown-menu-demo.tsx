import { createSignal } from "solid-js";
import ProtectedRoute from "~/components/protected-route";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
} from "~/components/ui/dropdown-menu";

export default function DropdownMenuDemo() {
  const [showStatusBar, setShowStatusBar] = createSignal(true);
  const [showActivityBar, setShowActivityBar] = createSignal(false);
  const [showPanel, setShowPanel] = createSignal(false);
  const [position, setPosition] = createSignal("bottom");

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Dropdown Menu Component</h1>
          <p class="text-muted-foreground">
            Contextual menus with actions and options
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Menu</CardTitle>
              <CardDescription>Simple dropdown with items</CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger as={Button} variant="outline">
                  Open Menu
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Billing
                    <DropdownMenuShortcut>Ctrl+B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>Ctrl+Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Icons</CardTitle>
              <CardDescription>Menu items with icons</CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger as={Button} variant="outline">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 size-4">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                  Actions
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56">
                  <DropdownMenuItem>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 size-4">
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    New Item
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 size-4">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 size-4">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem class="text-destructive">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 size-4">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checkbox Items</CardTitle>
              <CardDescription>Menu with toggleable options</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <DropdownMenu>
                <DropdownMenuTrigger as={Button} variant="outline">
                  View Options
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56">
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={showStatusBar()}
                    onChange={setShowStatusBar}
                  >
                    Status Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showActivityBar()}
                    onChange={setShowActivityBar}
                  >
                    Activity Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showPanel()}
                    onChange={setShowPanel}
                  >
                    Panel
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div class="text-sm text-muted-foreground">
                <p>Status Bar: {showStatusBar() ? "Visible" : "Hidden"}</p>
                <p>Activity Bar: {showActivityBar() ? "Visible" : "Hidden"}</p>
                <p>Panel: {showPanel() ? "Visible" : "Hidden"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Radio Items</CardTitle>
              <CardDescription>Menu with single-select options</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <DropdownMenu>
                <DropdownMenuTrigger as={Button} variant="outline">
                  Panel Position
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56">
                  <DropdownMenuLabel>Position</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={position()} onChange={setPosition}>
                    <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <div class="text-sm text-muted-foreground">
                Selected position: <strong>{position()}</strong>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Submenu</CardTitle>
              <CardDescription>Nested menu structure</CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger as={Button} variant="outline">
                  Open Menu
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56">
                  <DropdownMenuItem>New File</DropdownMenuItem>
                  <DropdownMenuItem>New Window</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Messages</DropdownMenuItem>
                      <DropdownMenuItem>Notes</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Copy Link</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>PDF</DropdownMenuItem>
                      <DropdownMenuItem>CSV</DropdownMenuItem>
                      <DropdownMenuItem>JSON</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Print</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Grouped Items</CardTitle>
              <CardDescription>Menu with grouped sections</CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger as={Button} variant="outline">
                  Insert
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuGroupLabel>Content</DropdownMenuGroupLabel>
                    <DropdownMenuItem>Text</DropdownMenuItem>
                    <DropdownMenuItem>Image</DropdownMenuItem>
                    <DropdownMenuItem>Video</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuGroupLabel>Components</DropdownMenuGroupLabel>
                    <DropdownMenuItem>Button</DropdownMenuItem>
                    <DropdownMenuItem>Card</DropdownMenuItem>
                    <DropdownMenuItem>Table</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuGroupLabel>Layout</DropdownMenuGroupLabel>
                    <DropdownMenuItem>Container</DropdownMenuItem>
                    <DropdownMenuItem>Grid</DropdownMenuItem>
                    <DropdownMenuItem>Stack</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Disabled Items</CardTitle>
            <CardDescription>Menu with some items disabled</CardDescription>
          </CardHeader>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger as={Button} variant="outline">
                File Menu
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56">
                <DropdownMenuItem>
                  New
                  <DropdownMenuShortcut>Ctrl+N</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Open
                  <DropdownMenuShortcut>Ctrl+O</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Save
                  <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  Save As...
                  <DropdownMenuShortcut>Ctrl+Shift+S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>Undo</DropdownMenuItem>
                <DropdownMenuItem disabled>Redo</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Close
                  <DropdownMenuShortcut>Ctrl+W</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
