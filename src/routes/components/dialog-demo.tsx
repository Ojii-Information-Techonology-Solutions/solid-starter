import { createSignal } from "solid-js";
import ProtectedRoute from "~/components/protected-route";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field";

export default function DialogDemo() {
  const [open, setOpen] = createSignal(false);
  const [formOpen, setFormOpen] = createSignal(false);

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Dialog Component</h1>
          <p class="text-muted-foreground">
            Modal dialogs for displaying important information and forms
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Basic Dialog</CardTitle>
            <CardDescription>A simple dialog with title and description</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={open()} onOpenChange={setOpen}>
              <DialogTrigger as={Button}>Open Dialog</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Welcome!</DialogTitle>
                  <DialogDescription>
                    This is a basic dialog component. You can use it to display important
                    information to your users.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dialog with Form</CardTitle>
            <CardDescription>Dialog containing a form with input fields</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={formOpen()} onOpenChange={setFormOpen}>
              <DialogTrigger as={Button}>Edit Profile</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div class="space-y-4 py-4">
                  <TextField>
                    <TextFieldLabel>Name</TextFieldLabel>
                    <TextFieldInput placeholder="John Doe" />
                  </TextField>
                  <TextField>
                    <TextFieldLabel>Email</TextFieldLabel>
                    <TextFieldInput type="email" placeholder="john@example.com" />
                  </TextField>
                  <TextField>
                    <TextFieldLabel>Bio</TextFieldLabel>
                    <textarea
                      class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Tell us about yourself"
                    />
                  </TextField>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setFormOpen(false)}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confirmation Dialog</CardTitle>
            <CardDescription>Dialog for confirming destructive actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger as={Button} variant="destructive">
                Delete Account
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
