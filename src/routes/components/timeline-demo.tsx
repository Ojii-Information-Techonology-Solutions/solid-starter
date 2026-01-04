import { For } from "solid-js";
import ProtectedRoute from "~/components/protected-route";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
} from "~/components/ui/timeline";

export default function TimelineDemo() {
  const activityEvents = [
    {
      title: "Project Created",
      description: "Initial project setup and configuration completed",
      time: "2 hours ago",
      variant: "success" as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
          <path d="M5 12l5 5l10 -10" />
        </svg>
      ),
    },
    {
      title: "Team Members Added",
      description: "3 new team members have been invited to the project",
      time: "4 hours ago",
      variant: "info" as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Deployment Failed",
      description: "Build failed due to missing environment variables",
      time: "Yesterday",
      variant: "error" as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
    },
    {
      title: "Review Requested",
      description: "Code review requested for pull request #42",
      time: "2 days ago",
      variant: "warning" as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
  ];

  const orderTimeline = [
    { status: "Order Placed", description: "Your order has been placed successfully", time: "Dec 21, 2024 - 10:30 AM", completed: true },
    { status: "Payment Confirmed", description: "Payment received via Credit Card", time: "Dec 21, 2024 - 10:32 AM", completed: true },
    { status: "Processing", description: "Your order is being prepared", time: "Dec 21, 2024 - 11:00 AM", completed: true },
    { status: "Shipped", description: "Package has been handed to courier", time: "Dec 22, 2024 - 09:15 AM", completed: true },
    { status: "Out for Delivery", description: "Package is on its way to you", time: "Dec 23, 2024 - 08:00 AM", completed: false },
    { status: "Delivered", description: "Package delivered to recipient", time: "Expected: Dec 23, 2024", completed: false },
  ];

  const versionHistory = [
    { version: "v2.0.0", date: "January 5, 2025", changes: ["Major UI redesign", "New dashboard features", "Performance improvements"], breaking: true },
    { version: "v1.5.0", date: "December 15, 2024", changes: ["Added timeline component", "Bug fixes", "Documentation updates"], breaking: false },
    { version: "v1.4.2", date: "November 28, 2024", changes: ["Security patches", "Minor bug fixes"], breaking: false },
    { version: "v1.4.0", date: "November 10, 2024", changes: ["New form components", "Improved accessibility"], breaking: false },
  ];

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Timeline Component</h1>
          <p class="text-muted-foreground">
            Display chronological events and activities
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Timeline</CardTitle>
              <CardDescription>Simple timeline with events</CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline>
                <TimelineItem>
                  <TimelineConnector />
                  <TimelineIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </TimelineIcon>
                  <TimelineContent>
                    <TimelineTitle>First Event</TimelineTitle>
                    <TimelineDescription>This is the first event in the timeline</TimelineDescription>
                    <TimelineTime>Just now</TimelineTime>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineConnector />
                  <TimelineIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </TimelineIcon>
                  <TimelineContent>
                    <TimelineTitle>Second Event</TimelineTitle>
                    <TimelineDescription>This is the second event in the timeline</TimelineDescription>
                    <TimelineTime>1 hour ago</TimelineTime>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </TimelineIcon>
                  <TimelineContent>
                    <TimelineTitle>Third Event</TimelineTitle>
                    <TimelineDescription>This is the third and last event</TimelineDescription>
                    <TimelineTime>2 hours ago</TimelineTime>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Timeline with different status indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline>
                <For each={activityEvents}>
                  {(event, index) => (
                    <TimelineItem>
                      {index() < activityEvents.length - 1 && <TimelineConnector />}
                      <TimelineIcon variant={event.variant}>
                        {event.icon}
                      </TimelineIcon>
                      <TimelineContent>
                        <TimelineTitle>{event.title}</TimelineTitle>
                        <TimelineDescription>{event.description}</TimelineDescription>
                        <TimelineTime>{event.time}</TimelineTime>
                      </TimelineContent>
                    </TimelineItem>
                  )}
                </For>
              </Timeline>
            </CardContent>
          </Card>

          <Card class="lg:col-span-2">
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
              <CardDescription>Track your order status</CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline>
                <For each={orderTimeline}>
                  {(step, index) => (
                    <TimelineItem>
                      {index() < orderTimeline.length - 1 && (
                        <TimelineConnector class={step.completed ? "bg-green-500" : ""} />
                      )}
                      <TimelineIcon variant={step.completed ? "success" : "default"}>
                        {step.completed ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                            <circle cx="12" cy="12" r="4" />
                          </svg>
                        )}
                      </TimelineIcon>
                      <TimelineContent>
                        <div class="flex items-center gap-2">
                          <TimelineTitle class={!step.completed ? "text-muted-foreground" : ""}>
                            {step.status}
                          </TimelineTitle>
                          {step.completed && (
                            <Badge variant="success" class="text-xs">Completed</Badge>
                          )}
                        </div>
                        <TimelineDescription>{step.description}</TimelineDescription>
                        <TimelineTime>{step.time}</TimelineTime>
                      </TimelineContent>
                    </TimelineItem>
                  )}
                </For>
              </Timeline>
            </CardContent>
          </Card>

          <Card class="lg:col-span-2">
            <CardHeader>
              <CardTitle>Version History</CardTitle>
              <CardDescription>Release changelog and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline>
                <For each={versionHistory}>
                  {(release, index) => (
                    <TimelineItem>
                      {index() < versionHistory.length - 1 && <TimelineConnector />}
                      <TimelineIcon variant={release.breaking ? "warning" : "default"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                        </svg>
                      </TimelineIcon>
                      <TimelineContent>
                        <div class="flex items-center gap-2 flex-wrap">
                          <TimelineTitle>{release.version}</TimelineTitle>
                          {release.breaking && (
                            <Badge variant="warning">Breaking Changes</Badge>
                          )}
                        </div>
                        <TimelineTime class="mb-2 block">{release.date}</TimelineTime>
                        <ul class="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <For each={release.changes}>
                            {(change) => <li>{change}</li>}
                          </For>
                        </ul>
                      </TimelineContent>
                    </TimelineItem>
                  )}
                </For>
              </Timeline>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Timeline with Actions</CardTitle>
            <CardDescription>Interactive timeline with action buttons</CardDescription>
          </CardHeader>
          <CardContent>
            <Timeline>
              <TimelineItem>
                <TimelineConnector />
                <TimelineIcon variant="success">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </TimelineIcon>
                <TimelineContent>
                  <div class="flex items-start justify-between">
                    <div>
                      <TimelineTitle>Document Uploaded</TimelineTitle>
                      <TimelineDescription>quarterly_report.pdf (2.4 MB)</TimelineDescription>
                      <TimelineTime>10 minutes ago by John Doe</TimelineTime>
                    </div>
                    <div class="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="ghost">Download</Button>
                    </div>
                  </div>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineConnector />
                <TimelineIcon variant="info">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </TimelineIcon>
                <TimelineContent>
                  <div class="flex items-start justify-between">
                    <div>
                      <TimelineTitle>Comment Added</TimelineTitle>
                      <TimelineDescription>"Great work on this report! Let's discuss the findings in our next meeting."</TimelineDescription>
                      <TimelineTime>30 minutes ago by Jane Smith</TimelineTime>
                    </div>
                    <Button size="sm" variant="ghost">Reply</Button>
                  </div>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineIcon variant="warning">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                    <path d="M3.2 14.6L9 4a3 3 0 0 1 5.2 0l5.8 10.6a3 3 0 0 1-2.6 4.4H5.8a3 3 0 0 1-2.6-4.4z" />
                  </svg>
                </TimelineIcon>
                <TimelineContent>
                  <div class="flex items-start justify-between">
                    <div>
                      <TimelineTitle>Review Required</TimelineTitle>
                      <TimelineDescription>The document needs approval before it can be published.</TimelineDescription>
                      <TimelineTime>1 hour ago</TimelineTime>
                    </div>
                    <div class="flex gap-2">
                      <Button size="sm" variant="outline">Reject</Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
