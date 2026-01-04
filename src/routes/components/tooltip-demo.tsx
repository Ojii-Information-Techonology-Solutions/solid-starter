import ProtectedRoute from "~/components/protected-route";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

export default function TooltipDemo() {
  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Tooltip Component</h1>
          <p class="text-muted-foreground">
            Contextual information on hover or focus
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Tooltips</CardTitle>
              <CardDescription>Simple tooltip examples</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger as={Button} variant="outline">
                  Hover me
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as={Button} variant="outline">
                  More info
                </TooltipTrigger>
                <TooltipContent>
                  <p>Additional information appears here</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as={Button} variant="outline">
                  Help
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click for help and documentation</p>
                </TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Tooltips on different button styles</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger as={Button}>
                  Primary
                </TooltipTrigger>
                <TooltipContent>
                  <p>Primary action button</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as={Button} variant="secondary">
                  Secondary
                </TooltipTrigger>
                <TooltipContent>
                  <p>Secondary action button</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as={Button} variant="destructive">
                  Destructive
                </TooltipTrigger>
                <TooltipContent>
                  <p>This action cannot be undone</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as={Button} variant="ghost">
                  Ghost
                </TooltipTrigger>
                <TooltipContent>
                  <p>Subtle ghost button</p>
                </TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Icon Buttons with Tooltips</CardTitle>
              <CardDescription>Common use case for icon-only buttons</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger as={Button} variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add new item</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as={Button} variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as={Button} variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as={Button} variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as={Button} variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as={Button} variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tooltips on Text</CardTitle>
              <CardDescription>Tooltips on inline elements</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <p class="text-sm">
                Hover over the{" "}
                <Tooltip>
                  <TooltipTrigger class="underline decoration-dotted cursor-help">
                    underlined text
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This provides additional context</p>
                  </TooltipContent>
                </Tooltip>{" "}
                to see more information.
              </p>

              <p class="text-sm">
                This feature is{" "}
                <Tooltip>
                  <TooltipTrigger class="font-semibold text-primary cursor-help">
                    experimental
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This feature may change or be removed</p>
                  </TooltipContent>
                </Tooltip>{" "}
                and should be used with caution.
              </p>

              <p class="text-sm">
                Learn more about{" "}
                <Tooltip>
                  <TooltipTrigger class="text-primary underline cursor-help">
                    keyboard shortcuts
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Press Ctrl+K to open command palette</p>
                  </TooltipContent>
                </Tooltip>{" "}
                to boost your productivity.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Toolbar Example</CardTitle>
            <CardDescription>Common pattern: toolbar with icon buttons and tooltips</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-center gap-1 p-2 border rounded-lg w-fit">
              <Tooltip>
                <TooltipTrigger as={Button} variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>New file</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as={Button} variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>Open folder</TooltipContent>
              </Tooltip>

              <div class="w-px h-6 bg-border mx-1" />

              <Tooltip>
                <TooltipTrigger as={Button} variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>Save (Ctrl+S)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as={Button} variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>Delete (Del)</TooltipContent>
              </Tooltip>

              <div class="w-px h-6 bg-border mx-1" />

              <Tooltip>
                <TooltipTrigger as={Button} variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <polyline points="9 14 4 9 9 4" />
                    <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as={Button} variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <polyline points="15 14 20 9 15 4" />
                    <path d="M4 20v-7a4 4 0 0 1 4-4h12" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
