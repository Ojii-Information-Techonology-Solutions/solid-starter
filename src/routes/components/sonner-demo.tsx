import ProtectedRoute from "~/components/protected-route";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { toast } from "solid-sonner";

export default function SonnerDemo() {
  const showDefault = () => {
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
    });
  };

  const showSuccess = () => {
    toast.success("Success!", {
      description: "Your changes have been saved successfully.",
    });
  };

  const showError = () => {
    toast.error("Error!", {
      description: "Something went wrong. Please try again.",
    });
  };

  const showWarning = () => {
    toast.warning("Warning!", {
      description: "This action may have unintended consequences.",
    });
  };

  const showInfo = () => {
    toast.info("Information", {
      description: "Here's some helpful information for you.",
    });
  };

  const showWithAction = () => {
    toast("File deleted", {
      description: "The file has been moved to trash.",
      action: {
        label: "Undo",
        onClick: () => toast.success("File restored!"),
      },
    });
  };

  const showPromise = () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
    toast.promise(promise, {
      loading: "Loading...",
      success: "Data loaded successfully!",
      error: "Failed to load data.",
    });
  };

  const showCustom = () => {
    toast("Custom styled toast", {
      description: "This toast has custom styling applied.",
      duration: 5000,
    });
  };

  const showPersistent = () => {
    toast.info("Persistent notification", {
      description: "This toast won't auto-dismiss. Click to close.",
      duration: Infinity,
    });
  };

  const showMultiple = () => {
    toast.success("First notification");
    setTimeout(() => toast.info("Second notification"), 500);
    setTimeout(() => toast.warning("Third notification"), 1000);
  };

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Toast Notifications</h1>
          <p class="text-muted-foreground">
            Non-intrusive notifications using Sonner
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Toast</CardTitle>
              <CardDescription>Simple notification message</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={showDefault} variant="outline" class="w-full">
                Show Default
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Success Toast</CardTitle>
              <CardDescription>Positive confirmation message</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={showSuccess} variant="outline" class="w-full">
                Show Success
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error Toast</CardTitle>
              <CardDescription>Error or failure message</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={showError} variant="outline" class="w-full">
                Show Error
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Warning Toast</CardTitle>
              <CardDescription>Warning or caution message</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={showWarning} variant="outline" class="w-full">
                Show Warning
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Info Toast</CardTitle>
              <CardDescription>Informational message</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={showInfo} variant="outline" class="w-full">
                Show Info
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Action</CardTitle>
              <CardDescription>Toast with an action button</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={showWithAction} variant="outline" class="w-full">
                Show With Action
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Promise Toast</CardTitle>
              <CardDescription>Loading state with resolution</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={showPromise} variant="outline" class="w-full">
                Show Promise
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Duration</CardTitle>
              <CardDescription>Toast with 5 second duration</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={showCustom} variant="outline" class="w-full">
                Show Custom
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Persistent Toast</CardTitle>
              <CardDescription>Toast that doesn't auto-dismiss</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={showPersistent} variant="outline" class="w-full">
                Show Persistent
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Multiple Toasts</CardTitle>
            <CardDescription>Show several toasts in sequence</CardDescription>
          </CardHeader>
          <CardContent class="flex gap-4">
            <Button onClick={showMultiple}>
              Show Multiple Toasts
            </Button>
            <Button variant="outline" onClick={() => toast.dismiss()}>
              Dismiss All
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Example</CardTitle>
            <CardDescription>How to use toast in your code</CardDescription>
          </CardHeader>
          <CardContent>
            <pre class="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { toast } from "solid-sonner";

// Default toast
toast("Event created");

// With description
toast("Event created", {
  description: "Your event has been scheduled."
});

// Success/Error/Warning/Info
toast.success("Changes saved!");
toast.error("Something went wrong");
toast.warning("Please review your input");
toast.info("New features available");

// With action
toast("File deleted", {
  action: {
    label: "Undo",
    onClick: () => console.log("Undo clicked")
  }
});

// Promise toast
toast.promise(asyncFunction, {
  loading: "Loading...",
  success: "Success!",
  error: "Error!"
});

// Dismiss all
toast.dismiss();`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
