import { createSignal } from "solid-js";
import ProtectedRoute from "~/components/protected-route";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Separator } from "~/components/ui/separator";
import { toast } from "solid-sonner";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = createSignal(true);
  const [marketingEmails, setMarketingEmails] = createSignal(false);
  const [securityAlerts, setSecurityAlerts] = createSignal(true);
  const [darkMode, setDarkMode] = createSignal(false);
  const [compactView, setCompactView] = createSignal(false);

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Settings</h1>
          <p class="text-muted-foreground">Manage your application preferences</p>
        </div>

        <div class="grid gap-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Email Notifications</p>
                  <p class="text-sm text-muted-foreground">
                    Receive email updates about your account activity
                  </p>
                </div>
                <Checkbox
                  checked={emailNotifications()}
                  onChange={setEmailNotifications}
                />
              </div>

              <Separator />

              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Marketing Emails</p>
                  <p class="text-sm text-muted-foreground">
                    Receive emails about new features and promotions
                  </p>
                </div>
                <Checkbox
                  checked={marketingEmails()}
                  onChange={setMarketingEmails}
                />
              </div>

              <Separator />

              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Security Alerts</p>
                  <p class="text-sm text-muted-foreground">
                    Get notified about security events on your account
                  </p>
                </div>
                <Checkbox
                  checked={securityAlerts()}
                  onChange={setSecurityAlerts}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Dark Mode</p>
                  <p class="text-sm text-muted-foreground">
                    Use dark theme for the interface
                  </p>
                </div>
                <Checkbox
                  checked={darkMode()}
                  onChange={setDarkMode}
                />
              </div>

              <Separator />

              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Compact View</p>
                  <p class="text-sm text-muted-foreground">
                    Show more content with less spacing
                  </p>
                </div>
                <Checkbox
                  checked={compactView()}
                  onChange={setCompactView}
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card class="border-destructive/50">
            <CardHeader>
              <CardTitle class="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for your account</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Delete Account</p>
                  <p class="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => toast.error("This action is not available in demo mode")}
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          <div class="flex justify-end">
            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}