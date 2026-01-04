import { For } from "solid-js";
import ProtectedRoute from "~/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function AvatarDemo() {
  const users = [
    { name: "John Doe", initials: "JD", image: "https://i.pravatar.cc/150?u=john" },
    { name: "Jane Smith", initials: "JS", image: "https://i.pravatar.cc/150?u=jane" },
    { name: "Bob Johnson", initials: "BJ", image: "https://i.pravatar.cc/150?u=bob" },
    { name: "Alice Brown", initials: "AB", image: "https://i.pravatar.cc/150?u=alice" },
  ];

  const teamMembers = [
    { name: "Sarah Wilson", initials: "SW", status: "online" },
    { name: "Mike Chen", initials: "MC", status: "away" },
    { name: "Emily Davis", initials: "ED", status: "offline" },
    { name: "Tom Anderson", initials: "TA", status: "online" },
    { name: "Lisa Park", initials: "LP", status: "busy" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "busy": return "bg-red-500";
      default: return "bg-gray-400";
    }
  };

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Avatar Component</h1>
          <p class="text-muted-foreground">
            Display user profile images with fallback support
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Avatars</CardTitle>
              <CardDescription>Avatars with images and fallbacks</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex items-center gap-4">
                <For each={users}>
                  {(user) => (
                    <Avatar>
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                  )}
                </For>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fallback Only</CardTitle>
              <CardDescription>Avatars with initials fallback</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>CK</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>MN</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avatar Sizes</CardTitle>
              <CardDescription>Different avatar sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex items-end gap-4">
                <Avatar class="size-6">
                  <AvatarImage src="https://i.pravatar.cc/150?u=small" alt="Small" />
                  <AvatarFallback class="text-xs">XS</AvatarFallback>
                </Avatar>
                <Avatar class="size-8">
                  <AvatarImage src="https://i.pravatar.cc/150?u=medium" alt="Medium" />
                  <AvatarFallback class="text-xs">SM</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?u=default" alt="Default" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <Avatar class="size-14">
                  <AvatarImage src="https://i.pravatar.cc/150?u=large" alt="Large" />
                  <AvatarFallback>LG</AvatarFallback>
                </Avatar>
                <Avatar class="size-20">
                  <AvatarImage src="https://i.pravatar.cc/150?u=xlarge" alt="Extra Large" />
                  <AvatarFallback class="text-xl">XL</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avatar with Status</CardTitle>
              <CardDescription>Avatars with online/offline indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex items-center gap-4">
                <For each={teamMembers}>
                  {(member) => (
                    <div class="relative">
                      <Avatar>
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <span
                        class={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                      />
                    </div>
                  )}
                </For>
              </div>
              <div class="mt-4 flex gap-4 text-sm text-muted-foreground">
                <span class="flex items-center gap-1">
                  <span class="size-2 rounded-full bg-green-500" /> Online
                </span>
                <span class="flex items-center gap-1">
                  <span class="size-2 rounded-full bg-yellow-500" /> Away
                </span>
                <span class="flex items-center gap-1">
                  <span class="size-2 rounded-full bg-red-500" /> Busy
                </span>
                <span class="flex items-center gap-1">
                  <span class="size-2 rounded-full bg-gray-400" /> Offline
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avatar Group</CardTitle>
              <CardDescription>Stacked avatar group</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <div class="flex -space-x-4">
                <For each={users}>
                  {(user) => (
                    <Avatar class="border-2 border-background">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                  )}
                </For>
                <Avatar class="border-2 border-background">
                  <AvatarFallback>+3</AvatarFallback>
                </Avatar>
              </div>

              <div class="flex -space-x-2">
                <For each={users.slice(0, 3)}>
                  {(user) => (
                    <Avatar class="size-8 border-2 border-background">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback class="text-xs">{user.initials}</AvatarFallback>
                    </Avatar>
                  )}
                </For>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avatar with Info</CardTitle>
              <CardDescription>Avatar combined with user information</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <For each={users.slice(0, 3)}>
                {(user) => (
                  <div class="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p class="text-sm font-medium">{user.name}</p>
                      <p class="text-sm text-muted-foreground">
                        {user.name.toLowerCase().replace(" ", ".")}@example.com
                      </p>
                    </div>
                  </div>
                )}
              </For>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Avatar Shapes</CardTitle>
            <CardDescription>Different avatar shapes and styles</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-center gap-6">
              <div class="text-center">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?u=round" alt="Round" />
                  <AvatarFallback>RD</AvatarFallback>
                </Avatar>
                <p class="mt-2 text-sm text-muted-foreground">Round</p>
              </div>
              <div class="text-center">
                <Avatar class="rounded-lg">
                  <AvatarImage src="https://i.pravatar.cc/150?u=rounded" alt="Rounded" />
                  <AvatarFallback class="rounded-lg">RL</AvatarFallback>
                </Avatar>
                <p class="mt-2 text-sm text-muted-foreground">Rounded</p>
              </div>
              <div class="text-center">
                <Avatar class="rounded-none">
                  <AvatarImage src="https://i.pravatar.cc/150?u=square" alt="Square" />
                  <AvatarFallback class="rounded-none">SQ</AvatarFallback>
                </Avatar>
                <p class="mt-2 text-sm text-muted-foreground">Square</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
