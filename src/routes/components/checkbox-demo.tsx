import { createSignal, For } from "solid-js";
import ProtectedRoute from "~/components/protected-route";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";

export default function CheckboxDemo() {
  const [termsAccepted, setTermsAccepted] = createSignal(false);
  const [notifications, setNotifications] = createSignal({
    email: true,
    push: false,
    sms: false,
  });

  const features = [
    { id: "analytics", label: "Analytics", description: "Track user behavior and engagement" },
    { id: "api", label: "API Access", description: "Enable API access for integrations" },
    { id: "exports", label: "Data Exports", description: "Export data in various formats" },
    { id: "support", label: "Priority Support", description: "Get priority customer support" },
  ];

  const [selectedFeatures, setSelectedFeatures] = createSignal<string[]>(["analytics"]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Checkbox Component</h1>
          <p class="text-muted-foreground">
            Toggle controls for boolean selections
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Checkboxes</CardTitle>
              <CardDescription>Simple checkbox controls</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center space-x-2">
                <Checkbox id="basic1" />
                <label for="basic1" class="text-sm font-medium leading-none">
                  Default checkbox
                </label>
              </div>

              <div class="flex items-center space-x-2">
                <Checkbox id="basic2" defaultChecked />
                <label for="basic2" class="text-sm font-medium leading-none">
                  Checked by default
                </label>
              </div>

              <div class="flex items-center space-x-2">
                <Checkbox id="basic3" disabled />
                <label for="basic3" class="text-sm font-medium leading-none text-muted-foreground">
                  Disabled checkbox
                </label>
              </div>

              <div class="flex items-center space-x-2">
                <Checkbox id="basic4" disabled defaultChecked />
                <label for="basic4" class="text-sm font-medium leading-none text-muted-foreground">
                  Disabled and checked
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Controlled Checkbox</CardTitle>
              <CardDescription>Checkbox with controlled state</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted()}
                  onChange={setTermsAccepted}
                />
                <label for="terms" class="text-sm font-medium leading-none">
                  I accept the terms and conditions
                </label>
              </div>

              <div class="rounded-lg border p-4 bg-muted/50">
                <p class="text-sm">
                  Terms accepted: <strong>{termsAccepted() ? "Yes" : "No"}</strong>
                </p>
              </div>

              <Button
                disabled={!termsAccepted()}
                class="w-full"
              >
                Continue
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Group of related checkboxes</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="email-notif"
                  checked={notifications().email}
                  onChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                />
                <div class="grid gap-1.5 leading-none">
                  <label for="email-notif" class="text-sm font-medium leading-none">
                    Email notifications
                  </label>
                  <p class="text-sm text-muted-foreground">
                    Receive emails about your account activity.
                  </p>
                </div>
              </div>

              <div class="flex items-center space-x-2">
                <Checkbox
                  id="push-notif"
                  checked={notifications().push}
                  onChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                />
                <div class="grid gap-1.5 leading-none">
                  <label for="push-notif" class="text-sm font-medium leading-none">
                    Push notifications
                  </label>
                  <p class="text-sm text-muted-foreground">
                    Receive push notifications on your device.
                  </p>
                </div>
              </div>

              <div class="flex items-center space-x-2">
                <Checkbox
                  id="sms-notif"
                  checked={notifications().sms}
                  onChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                />
                <div class="grid gap-1.5 leading-none">
                  <label for="sms-notif" class="text-sm font-medium leading-none">
                    SMS notifications
                  </label>
                  <p class="text-sm text-muted-foreground">
                    Receive text messages for urgent updates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Selection</CardTitle>
              <CardDescription>Select multiple features</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <For each={features}>
                {(feature) => (
                  <div class="flex items-start space-x-2">
                    <Checkbox
                      id={feature.id}
                      checked={selectedFeatures().includes(feature.id)}
                      onChange={() => toggleFeature(feature.id)}
                    />
                    <div class="grid gap-1.5 leading-none">
                      <label for={feature.id} class="text-sm font-medium leading-none cursor-pointer">
                        {feature.label}
                      </label>
                      <p class="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                )}
              </For>

              <div class="rounded-lg border p-4 bg-muted/50 mt-4">
                <p class="text-sm">
                  Selected features: <strong>{selectedFeatures().join(", ") || "None"}</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Indeterminate State</CardTitle>
            <CardDescription>Checkbox with indeterminate (mixed) state</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center space-x-2">
              <Checkbox id="parent" indeterminate />
              <label for="parent" class="text-sm font-medium leading-none">
                Select all items (indeterminate)
              </label>
            </div>

            <div class="ml-6 space-y-2">
              <div class="flex items-center space-x-2">
                <Checkbox id="child1" defaultChecked />
                <label for="child1" class="text-sm">Item 1</label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="child2" />
                <label for="child2" class="text-sm">Item 2</label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="child3" defaultChecked />
                <label for="child3" class="text-sm">Item 3</label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
