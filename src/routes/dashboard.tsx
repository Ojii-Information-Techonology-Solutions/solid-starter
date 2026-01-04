import { createAsync } from "@solidjs/router";
import { For, Show } from "solid-js";
import { A } from "@solidjs/router";
import ProtectedRoute from "~/components/protected-route";
import { getDashboardStats, getRecentInvoices, getRecentTasks } from "~/actions/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

export default function Dashboard() {
  const stats = createAsync(() => getDashboardStats());
  const recentInvoices = createAsync(() => getRecentInvoices(5));
  const recentTasks = createAsync(() => getRecentTasks(5));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  const getColumnLabel = (columnId: string) => {
    switch (columnId) {
      case "todo":
        return "To Do";
      case "in-progress":
        return "In Progress";
      case "review":
        return "Review";
      default:
        return columnId;
    }
  };

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-6">
        {/* Header */}
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p class="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
        </div>

        {/* Stats Cards */}
        <Show when={stats()}>
          {(s) => (
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div class="text-2xl font-bold">{formatCurrency(s().totalRevenue)}</div>
                  <p class="text-xs text-muted-foreground">
                    From {s().paidInvoices} paid invoices
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle class="text-sm font-medium">Total Invoices</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div class="text-2xl font-bold">{s().totalInvoices}</div>
                  <p class="text-xs text-muted-foreground">
                    {s().pendingInvoices} pending, {s().overdueInvoices} overdue
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle class="text-sm font-medium">Active Tasks</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div class="text-2xl font-bold">{s().totalTasks - s().completedTasks}</div>
                  <p class="text-xs text-muted-foreground">
                    {s().inProgressTasks} in progress
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle class="text-sm font-medium">Completed Tasks</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div class="text-2xl font-bold">{s().completedTasks}</div>
                  <p class="text-xs text-muted-foreground">
                    {s().totalTasks > 0
                      ? Math.round((s().completedTasks / s().totalTasks) * 100)
                      : 0}% completion rate
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </Show>

        {/* Recent Activity */}
        <div class="grid gap-4 md:grid-cols-2">
          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <div class="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Invoices</CardTitle>
                  <CardDescription>Latest invoices from your business</CardDescription>
                </div>
                <Button as={A} href="/invoices" variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Show
                when={recentInvoices() && recentInvoices()!.length > 0}
                fallback={
                  <div class="text-center py-8 text-muted-foreground">
                    <p>No invoices yet</p>
                    <Button as={A} href="/invoices/new" variant="link" class="mt-2">
                      Create your first invoice
                    </Button>
                  </div>
                }
              >
                <div class="space-y-4">
                  <For each={recentInvoices()}>
                    {(invoice) => (
                      <A
                        href={`/invoices/${invoice.id}`}
                        class="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div class="flex items-center gap-3">
                          <div class="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                            <span class="text-xs font-medium text-primary">
                              {invoice.client_name.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p class="text-sm font-medium">{invoice.client_name}</p>
                            <p class="text-xs text-muted-foreground">{invoice.invoice_number}</p>
                          </div>
                        </div>
                        <div class="text-right">
                          <p class="text-sm font-medium">{formatCurrency(invoice.total)}</p>
                          <Badge variant={getStatusVariant(invoice.status)} class="text-xs">
                            {invoice.status}
                          </Badge>
                        </div>
                      </A>
                    )}
                  </For>
                </div>
              </Show>
            </CardContent>
          </Card>

          {/* Recent Tasks */}
          <Card>
            <CardHeader>
              <div class="flex items-center justify-between">
                <div>
                  <CardTitle>Active Tasks</CardTitle>
                  <CardDescription>Tasks that need your attention</CardDescription>
                </div>
                <Button as={A} href="/kanban" variant="outline" size="sm">
                  View Board
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Show
                when={recentTasks() && recentTasks()!.length > 0}
                fallback={
                  <div class="text-center py-8 text-muted-foreground">
                    <p>No active tasks</p>
                    <Button as={A} href="/kanban" variant="link" class="mt-2">
                      Go to Kanban board
                    </Button>
                  </div>
                }
              >
                <div class="space-y-4">
                  <For each={recentTasks()}>
                    {(task) => (
                      <div class="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div class="flex items-center gap-3">
                          <Show
                            when={task.assignee}
                            fallback={
                              <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                <span class="text-xs text-muted-foreground">?</span>
                              </div>
                            }
                          >
                            <Avatar class="h-8 w-8">
                              <AvatarFallback class="text-xs">
                                {task.assignee}
                              </AvatarFallback>
                            </Avatar>
                          </Show>
                          <div>
                            <p class="text-sm font-medium">{task.title}</p>
                            <p class="text-xs text-muted-foreground">
                              {getColumnLabel(task.column_id)}
                            </p>
                          </div>
                        </div>
                        <span class={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    )}
                  </For>
                </div>
              </Show>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap gap-2">
              <Button as={A} href="/invoices/new" variant="outline">
                Create Invoice
              </Button>
              <Button as={A} href="/kanban" variant="outline">
                Add Task
              </Button>
              <Button as={A} href="/profile" variant="outline">
                Edit Profile
              </Button>
              <Button as={A} href="/settings" variant="outline">
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
