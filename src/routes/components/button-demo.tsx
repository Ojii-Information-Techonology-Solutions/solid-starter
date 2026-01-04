import ProtectedRoute from "~/components/protected-route";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function ButtonDemo() {
  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Button Component</h1>
          <p class="text-muted-foreground">
            A collection of button variants and sizes from solid-ui
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>Different styles of buttons</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Button Sizes</CardTitle>
            <CardDescription>Different sizes of buttons</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disabled State</CardTitle>
            <CardDescription>Buttons in disabled state</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-wrap gap-4">
            <Button disabled>Default Disabled</Button>
            <Button variant="destructive" disabled>
              Destructive Disabled
            </Button>
            <Button variant="outline" disabled>
              Outline Disabled
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Icons</CardTitle>
            <CardDescription>Buttons with icons</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-wrap gap-4">
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              Next
            </Button>
            <Button variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Previous
            </Button>
            <Button variant="secondary">
              Download
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="ml-2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loading State</CardTitle>
            <CardDescription>Buttons with loading indicators</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-wrap gap-4">
            <Button disabled>
              <svg
                class="mr-2 h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading...
            </Button>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
