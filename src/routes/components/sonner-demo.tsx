import { Button } from "~/components/ui/button";
import { toast } from "solid-sonner";
import ProtectedRoute from "~/components/protected-route";

export default function SonnerDemo() {
  return (
    <ProtectedRoute>
      <div class="flex min-h-[400px] w-full items-center justify-center rounded-lg border border-dashed bg-muted/20 p-8">
        <div class="flex flex-col items-center gap-4 text-center">
          <div class="space-y-2">
            <h3 class="text-lg font-semibold tracking-tight">Notification Demo</h3>
            <p class="text-sm text-muted-foreground">
              Click the button below to trigger a toast notification using Sonner.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo")
                }
              })
            }
          >
            Show Toast
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}