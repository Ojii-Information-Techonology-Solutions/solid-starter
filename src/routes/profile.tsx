import { createAsync } from "@solidjs/router";
import { createSignal, createEffect, Show } from "solid-js";
import ProtectedRoute from "~/components/protected-route";
import { getCurrentUserProfile, updateUserProfile } from "~/actions/user";
import { Button } from "~/components/ui/button";
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { toast } from "solid-sonner";

export default function ProfilePage() {
  const profile = createAsync(() => getCurrentUserProfile());

  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [isEditing, setIsEditing] = createSignal(false);

  createEffect(() => {
    const p = profile();
    if (p) {
      setName(p.name);
      setEmail(p.email);
    }
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(name(), email());
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Profile</h1>
          <p class="text-muted-foreground">Manage your account settings</p>
        </div>

        <Show when={profile()}>
          {(p) => (
            <div class="grid gap-6 md:grid-cols-3">
              {/* Profile Card */}
              <Card class="md:col-span-1">
                <CardContent class="pt-6">
                  <div class="flex flex-col items-center text-center">
                    <Avatar class="h-24 w-24 mb-4">
                      <AvatarFallback class="text-2xl bg-primary text-primary-foreground">
                        {getInitials(p().name)}
                      </AvatarFallback>
                    </Avatar>
                    <h2 class="text-xl font-semibold">{p().name}</h2>
                    <p class="text-sm text-muted-foreground">{p().email}</p>
                    <Separator class="my-4" />
                    <div class="text-sm text-muted-foreground">
                      <p>Member since</p>
                      <p class="font-medium text-foreground">
                        {new Date(p().created_at).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Edit Profile Form */}
              <Card class="md:col-span-2">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account details here</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                  <TextField>
                    <TextFieldLabel>User ID</TextFieldLabel>
                    <TextFieldInput value={p().id} disabled />
                  </TextField>

                  <TextField>
                    <TextFieldLabel>Full Name</TextFieldLabel>
                    <TextFieldInput
                      value={name()}
                      onInput={(e) => setName(e.currentTarget.value)}
                      disabled={!isEditing()}
                    />
                  </TextField>

                  <TextField>
                    <TextFieldLabel>Email</TextFieldLabel>
                    <TextFieldInput
                      type="email"
                      value={email()}
                      onInput={(e) => setEmail(e.currentTarget.value)}
                      disabled={!isEditing()}
                    />
                  </TextField>

                  <div class="flex gap-2 pt-4">
                    <Show
                      when={isEditing()}
                      fallback={
                        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                      }
                    >
                      <Button onClick={handleSave}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </Show>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </Show>
      </div>
    </ProtectedRoute>
  );
}
