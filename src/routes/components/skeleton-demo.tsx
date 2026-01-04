import { For } from "solid-js";
import ProtectedRoute from "~/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export default function SkeletonDemo() {
  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Skeleton Component</h1>
          <p class="text-muted-foreground">
            Loading placeholders for content
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Shapes</CardTitle>
              <CardDescription>Common skeleton shapes</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <p class="text-sm font-medium">Text lines</p>
                <Skeleton class="h-4 w-full" />
                <Skeleton class="h-4 w-4/5" />
                <Skeleton class="h-4 w-3/5" />
              </div>

              <div class="space-y-2">
                <p class="text-sm font-medium">Circle</p>
                <Skeleton class="size-12 rounded-full" />
              </div>

              <div class="space-y-2">
                <p class="text-sm font-medium">Rectangle</p>
                <Skeleton class="h-32 w-full rounded-lg" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Profile Skeleton</CardTitle>
              <CardDescription>Loading state for user profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex items-center space-x-4">
                <Skeleton class="size-12 rounded-full" />
                <div class="space-y-2">
                  <Skeleton class="h-4 w-[200px]" />
                  <Skeleton class="h-4 w-[150px]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card Skeleton</CardTitle>
              <CardDescription>Loading state for cards</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <Skeleton class="h-48 w-full rounded-lg" />
                <div class="space-y-2">
                  <Skeleton class="h-4 w-3/4" />
                  <Skeleton class="h-4 w-full" />
                  <Skeleton class="h-4 w-2/3" />
                </div>
                <div class="flex gap-2">
                  <Skeleton class="h-8 w-20 rounded-md" />
                  <Skeleton class="h-8 w-20 rounded-md" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>List Skeleton</CardTitle>
              <CardDescription>Loading state for lists</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <For each={[1, 2, 3, 4]}>
                {() => (
                  <div class="flex items-center space-x-4">
                    <Skeleton class="size-10 rounded-full" />
                    <div class="space-y-2 flex-1">
                      <Skeleton class="h-4 w-1/2" />
                      <Skeleton class="h-3 w-3/4" />
                    </div>
                    <Skeleton class="h-8 w-16 rounded-md" />
                  </div>
                )}
              </For>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Table Skeleton</CardTitle>
              <CardDescription>Loading state for tables</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div class="flex gap-4 pb-2 border-b">
                  <Skeleton class="h-4 w-1/4" />
                  <Skeleton class="h-4 w-1/4" />
                  <Skeleton class="h-4 w-1/4" />
                  <Skeleton class="h-4 w-1/4" />
                </div>
                <For each={[1, 2, 3, 4, 5]}>
                  {() => (
                    <div class="flex gap-4 py-2">
                      <Skeleton class="h-4 w-1/4" />
                      <Skeleton class="h-4 w-1/4" />
                      <Skeleton class="h-4 w-1/4" />
                      <Skeleton class="h-4 w-1/4" />
                    </div>
                  )}
                </For>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stats Skeleton</CardTitle>
              <CardDescription>Loading state for statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="grid grid-cols-2 gap-4">
                <For each={[1, 2, 3, 4]}>
                  {() => (
                    <div class="p-4 border rounded-lg space-y-2">
                      <Skeleton class="h-3 w-20" />
                      <Skeleton class="h-8 w-16" />
                      <Skeleton class="h-3 w-24" />
                    </div>
                  )}
                </For>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard Skeleton</CardTitle>
            <CardDescription>Complete dashboard loading state</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-6">
              {/* Stats row */}
              <div class="grid grid-cols-4 gap-4">
                <For each={[1, 2, 3, 4]}>
                  {() => (
                    <div class="p-4 border rounded-lg space-y-2">
                      <Skeleton class="h-3 w-20" />
                      <Skeleton class="h-7 w-24" />
                      <Skeleton class="h-3 w-16" />
                    </div>
                  )}
                </For>
              </div>

              {/* Main content */}
              <div class="grid grid-cols-3 gap-6">
                {/* Chart area */}
                <div class="col-span-2 border rounded-lg p-4 space-y-4">
                  <div class="flex justify-between items-center">
                    <Skeleton class="h-5 w-32" />
                    <Skeleton class="h-8 w-24 rounded-md" />
                  </div>
                  <Skeleton class="h-[200px] w-full rounded-lg" />
                </div>

                {/* Side panel */}
                <div class="border rounded-lg p-4 space-y-4">
                  <Skeleton class="h-5 w-28" />
                  <For each={[1, 2, 3, 4, 5]}>
                    {() => (
                      <div class="flex items-center gap-3">
                        <Skeleton class="size-8 rounded-full" />
                        <div class="flex-1 space-y-1">
                          <Skeleton class="h-3 w-full" />
                          <Skeleton class="h-3 w-2/3" />
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>

              {/* Table */}
              <div class="border rounded-lg p-4 space-y-4">
                <div class="flex justify-between items-center">
                  <Skeleton class="h-5 w-36" />
                  <div class="flex gap-2">
                    <Skeleton class="h-8 w-24 rounded-md" />
                    <Skeleton class="h-8 w-8 rounded-md" />
                  </div>
                </div>
                <div class="space-y-3">
                  <div class="flex gap-4 pb-2 border-b">
                    <Skeleton class="h-4 w-1/5" />
                    <Skeleton class="h-4 w-1/5" />
                    <Skeleton class="h-4 w-1/5" />
                    <Skeleton class="h-4 w-1/5" />
                    <Skeleton class="h-4 w-1/5" />
                  </div>
                  <For each={[1, 2, 3]}>
                    {() => (
                      <div class="flex gap-4 py-2">
                        <Skeleton class="h-4 w-1/5" />
                        <Skeleton class="h-4 w-1/5" />
                        <Skeleton class="h-4 w-1/5" />
                        <Skeleton class="h-4 w-1/5" />
                        <Skeleton class="h-4 w-1/5" />
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
