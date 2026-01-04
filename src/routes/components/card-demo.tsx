import ProtectedRoute from "~/components/protected-route";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export default function CardDemo() {
  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Card Component</h1>
          <p class="text-muted-foreground">
            Flexible card components for displaying content
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>A simple card with a title and description</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm">
                This is the card content. You can put any content here including text, images, or
                other components.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card with Actions</CardTitle>
              <CardDescription>Card with interactive buttons</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <p class="text-sm">This card includes action buttons at the bottom.</p>
              <div class="flex gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="outline">
                  Secondary
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div class="flex items-start justify-between">
                <div>
                  <CardTitle>With Badge</CardTitle>
                  <CardDescription>Card with a status badge</CardDescription>
                </div>
                <Badge>New</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p class="text-sm">This card shows a badge in the header.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stats Card</CardTitle>
              <CardDescription>Total Revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">$45,231.89</div>
              <p class="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
              <CardDescription>Total active users</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">+2,350</div>
              <p class="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales</CardTitle>
              <CardDescription>Total sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">+12,234</div>
              <p class="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Full Width Card</CardTitle>
            <CardDescription>A card that spans the full width of its container</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm">
                This card demonstrates how cards can be used in different layouts and sizes. You
                can combine cards with grids, flex layouts, or use them standalone.
              </p>
              <div class="flex flex-wrap gap-2">
                <Badge variant="default">Feature</Badge>
                <Badge variant="secondary">Update</Badge>
                <Badge variant="outline">Info</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
