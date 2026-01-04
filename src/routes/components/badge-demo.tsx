import ProtectedRoute from "~/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export default function BadgeDemo() {
  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Badge Component</h1>
          <p class="text-muted-foreground">
            Small status indicators and labels
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Badge Variants</CardTitle>
              <CardDescription>Different badge styles</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-4">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Round Badges</CardTitle>
              <CardDescription>Badges with rounded pill shape</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-4">
              <Badge round>Default</Badge>
              <Badge variant="secondary" round>Secondary</Badge>
              <Badge variant="outline" round>Outline</Badge>
              <Badge variant="success" round>Success</Badge>
              <Badge variant="warning" round>Warning</Badge>
              <Badge variant="error" round>Error</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Badges</CardTitle>
              <CardDescription>Common status indicators</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex flex-wrap gap-2">
                <Badge variant="success">Active</Badge>
                <Badge variant="error">Inactive</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="secondary">Draft</Badge>
              </div>
              <div class="flex flex-wrap gap-2">
                <Badge variant="success">Completed</Badge>
                <Badge variant="secondary">In Progress</Badge>
                <Badge variant="warning">Review</Badge>
                <Badge variant="error">Blocked</Badge>
              </div>
              <div class="flex flex-wrap gap-2">
                <Badge variant="success">Paid</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="error">Overdue</Badge>
                <Badge variant="outline">Refunded</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Priority Badges</CardTitle>
              <CardDescription>Priority level indicators</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex flex-wrap gap-2">
                <Badge variant="error">Critical</Badge>
                <Badge variant="warning">High</Badge>
                <Badge variant="secondary">Medium</Badge>
                <Badge variant="outline">Low</Badge>
              </div>
              <div class="flex flex-wrap gap-2">
                <Badge variant="error" round>P0</Badge>
                <Badge variant="warning" round>P1</Badge>
                <Badge variant="secondary" round>P2</Badge>
                <Badge variant="outline" round>P3</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Labels & Tags</CardTitle>
              <CardDescription>Category and label badges</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex flex-wrap gap-2">
                <Badge variant="default">Feature</Badge>
                <Badge variant="error">Bug</Badge>
                <Badge variant="secondary">Enhancement</Badge>
                <Badge variant="outline">Documentation</Badge>
              </div>
              <div class="flex flex-wrap gap-2">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">TailwindCSS</Badge>
                <Badge variant="secondary">SolidJS</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Icons</CardTitle>
              <CardDescription>Badges with inline icons</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-4">
              <Badge variant="success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-1 size-3"
                >
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                Verified
              </Badge>
              <Badge variant="warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-1 size-3"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Warning
              </Badge>
              <Badge variant="error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-1 size-3"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Error
              </Badge>
              <Badge variant="secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-1 size-3"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87l1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87l6.91-1.01L12 2z" />
                </svg>
                Featured
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Badges in Context</CardTitle>
            <CardDescription>How badges appear in common UI patterns</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center justify-between p-4 border rounded-lg">
              <div class="flex items-center gap-3">
                <div class="size-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  JD
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-medium">John Doe</span>
                    <Badge variant="success" round>Pro</Badge>
                  </div>
                  <p class="text-sm text-muted-foreground">john@example.com</p>
                </div>
              </div>
              <Badge variant="success">Active</Badge>
            </div>

            <div class="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-medium">New Feature Request</span>
                  <Badge variant="default">Feature</Badge>
                  <Badge variant="warning">High</Badge>
                </div>
                <p class="text-sm text-muted-foreground mt-1">
                  Add dark mode support to the dashboard
                </p>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </div>

            <div class="flex items-center gap-4">
              <Button>
                Notifications
                <Badge variant="error" class="ml-2" round>5</Badge>
              </Button>
              <Button variant="outline">
                Messages
                <Badge variant="default" class="ml-2" round>12</Badge>
              </Button>
              <Button variant="secondary">
                Updates
                <Badge variant="secondary" class="ml-2" round>3</Badge>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
