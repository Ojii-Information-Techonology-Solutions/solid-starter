import ProtectedRoute from "~/components/protected-route";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field";

export default function SheetDemo() {
  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Sheet Component</h1>
          <p class="text-muted-foreground">
            Slide-out panels from screen edges
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Right Sheet (Default)</CardTitle>
              <CardDescription>Sheet sliding from the right edge</CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger as={Button} variant="outline">
                  Open Right Sheet
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                  </SheetHeader>
                  <div class="space-y-4 py-4">
                    <TextField>
                      <TextFieldLabel>Name</TextFieldLabel>
                      <TextFieldInput placeholder="John Doe" />
                    </TextField>
                    <TextField>
                      <TextFieldLabel>Username</TextFieldLabel>
                      <TextFieldInput placeholder="@johndoe" />
                    </TextField>
                    <TextField>
                      <TextFieldLabel>Email</TextFieldLabel>
                      <TextFieldInput type="email" placeholder="john@example.com" />
                    </TextField>
                  </div>
                  <SheetFooter>
                    <Button type="submit">Save changes</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Left Sheet</CardTitle>
              <CardDescription>Sheet sliding from the left edge</CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger as={Button} variant="outline">
                  Open Left Sheet
                </SheetTrigger>
                <SheetContent position="left">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>
                      Browse through the application sections.
                    </SheetDescription>
                  </SheetHeader>
                  <nav class="flex flex-col gap-2 py-4">
                    <Button variant="ghost" class="justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 size-4">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      Home
                    </Button>
                    <Button variant="ghost" class="justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 size-4">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      Documents
                    </Button>
                    <Button variant="ghost" class="justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 size-4">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      Team
                    </Button>
                    <Button variant="ghost" class="justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 size-4">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Settings
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Sheet</CardTitle>
              <CardDescription>Sheet sliding from the top edge</CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger as={Button} variant="outline">
                  Open Top Sheet
                </SheetTrigger>
                <SheetContent position="top">
                  <SheetHeader>
                    <SheetTitle>Search</SheetTitle>
                    <SheetDescription>
                      Search across all documents and content.
                    </SheetDescription>
                  </SheetHeader>
                  <div class="py-4">
                    <TextField>
                      <TextFieldInput placeholder="Search..." class="w-full" />
                    </TextField>
                    <div class="mt-4 text-sm text-muted-foreground">
                      <p>Recent searches:</p>
                      <ul class="mt-2 space-y-1">
                        <li class="cursor-pointer hover:text-foreground">Dashboard components</li>
                        <li class="cursor-pointer hover:text-foreground">User authentication</li>
                        <li class="cursor-pointer hover:text-foreground">API documentation</li>
                      </ul>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bottom Sheet</CardTitle>
              <CardDescription>Sheet sliding from the bottom edge</CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger as={Button} variant="outline">
                  Open Bottom Sheet
                </SheetTrigger>
                <SheetContent position="bottom">
                  <SheetHeader>
                    <SheetTitle>Share Document</SheetTitle>
                    <SheetDescription>
                      Choose how you want to share this document.
                    </SheetDescription>
                  </SheetHeader>
                  <div class="grid grid-cols-4 gap-4 py-4">
                    <button class="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
                      <div class="size-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-blue-600">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <span class="text-sm">Email</span>
                    </button>
                    <button class="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
                      <div class="size-12 rounded-full bg-green-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-green-600">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <span class="text-sm">Message</span>
                    </button>
                    <button class="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
                      <div class="size-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-purple-600">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      </div>
                      <span class="text-sm">Copy Link</span>
                    </button>
                    <button class="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted">
                      <div class="size-12 rounded-full bg-orange-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-orange-600">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                        </svg>
                      </div>
                      <span class="text-sm">More</span>
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Sheet</CardTitle>
            <CardDescription>Complete form inside a sheet</CardDescription>
          </CardHeader>
          <CardContent>
            <Sheet>
              <SheetTrigger as={Button}>
                Create New Item
              </SheetTrigger>
              <SheetContent class="sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Create New Item</SheetTitle>
                  <SheetDescription>
                    Fill in the details below to create a new item. All fields marked with * are required.
                  </SheetDescription>
                </SheetHeader>
                <form class="space-y-4 py-4">
                  <TextField>
                    <TextFieldLabel>Title *</TextFieldLabel>
                    <TextFieldInput placeholder="Enter title..." />
                  </TextField>
                  <TextField>
                    <TextFieldLabel>Description</TextFieldLabel>
                    <textarea
                      class="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter description..."
                    />
                  </TextField>
                  <div class="grid grid-cols-2 gap-4">
                    <TextField>
                      <TextFieldLabel>Category *</TextFieldLabel>
                      <TextFieldInput placeholder="Select category..." />
                    </TextField>
                    <TextField>
                      <TextFieldLabel>Priority</TextFieldLabel>
                      <TextFieldInput placeholder="Select priority..." />
                    </TextField>
                  </div>
                  <TextField>
                    <TextFieldLabel>Due Date</TextFieldLabel>
                    <TextFieldInput type="date" />
                  </TextField>
                  <TextField>
                    <TextFieldLabel>Tags</TextFieldLabel>
                    <TextFieldInput placeholder="Add tags separated by commas..." />
                  </TextField>
                </form>
                <SheetFooter class="gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button type="submit">Create Item</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
