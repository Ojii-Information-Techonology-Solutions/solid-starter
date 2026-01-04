import { For } from "solid-js";
import ProtectedRoute from "~/components/protected-route";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "~/components/ui/table";

const invoices = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { id: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
  { id: "INV006", status: "Pending", method: "Bank Transfer", amount: "$200.00" },
  { id: "INV007", status: "Unpaid", method: "Credit Card", amount: "$300.00" },
];

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Viewer", status: "Active" },
];

const tasks = [
  { id: "TASK-8782", title: "You can't compress the program without quantifying the open-source SSD...", status: "In Progress", priority: "Medium" },
  { id: "TASK-7878", title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!", status: "Backlog", priority: "High" },
  { id: "TASK-7839", title: "We need to bypass the neural TCP card!", status: "Todo", priority: "Low" },
  { id: "TASK-5562", title: "The SAS interface is down, bypass the open-source sensor so we can...", status: "Done", priority: "High" },
  { id: "TASK-8686", title: "I'll parse the wireless SSL protocol, that should driver the API panel!", status: "Canceled", priority: "Medium" },
];

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
    case "active":
    case "done":
      return "default";
    case "pending":
    case "in progress":
      return "secondary";
    case "unpaid":
    case "inactive":
    case "backlog":
      return "outline";
    case "canceled":
      return "destructive";
    default:
      return "secondary";
  }
};

const getPriorityVariant = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "destructive";
    case "medium":
      return "secondary";
    case "low":
      return "outline";
    default:
      return "secondary";
  }
};

export default function TableDemo() {
  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Table Component</h1>
          <p class="text-muted-foreground">
            Display data in organized rows and columns
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Basic Table</CardTitle>
            <CardDescription>A simple table with caption and footer</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead class="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <For each={invoices}>
                  {(invoice) => (
                    <TableRow>
                      <TableCell class="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{invoice.method}</TableCell>
                      <TableCell class="text-right">{invoice.amount}</TableCell>
                    </TableRow>
                  )}
                </For>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colspan={3}>Total</TableCell>
                  <TableCell class="text-right">$2,250.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Users Table</CardTitle>
            <CardDescription>Table with user data and action buttons</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-[50px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead class="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <For each={users}>
                  {(user) => (
                    <TableRow>
                      <TableCell class="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell class="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell class="text-right">
                        <div class="flex justify-end gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="ghost">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </For>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks Table</CardTitle>
            <CardDescription>Table showing task status and priority</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-[100px]">Task</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <For each={tasks}>
                  {(task) => (
                    <TableRow>
                      <TableCell class="font-medium">{task.id}</TableCell>
                      <TableCell class="max-w-[500px] truncate">{task.title}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(task.status)}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityVariant(task.priority)}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )}
                </For>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Striped Table</CardTitle>
            <CardDescription>Table with alternating row colors</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead class="text-right">Price</TableHead>
                  <TableHead class="text-right">Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow class="bg-muted/50">
                  <TableCell class="font-medium">Laptop Pro</TableCell>
                  <TableCell>Electronics</TableCell>
                  <TableCell class="text-right">$1,299.00</TableCell>
                  <TableCell class="text-right">45</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="font-medium">Wireless Mouse</TableCell>
                  <TableCell>Accessories</TableCell>
                  <TableCell class="text-right">$49.99</TableCell>
                  <TableCell class="text-right">120</TableCell>
                </TableRow>
                <TableRow class="bg-muted/50">
                  <TableCell class="font-medium">USB-C Hub</TableCell>
                  <TableCell>Accessories</TableCell>
                  <TableCell class="text-right">$79.99</TableCell>
                  <TableCell class="text-right">85</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="font-medium">4K Monitor</TableCell>
                  <TableCell>Electronics</TableCell>
                  <TableCell class="text-right">$599.00</TableCell>
                  <TableCell class="text-right">30</TableCell>
                </TableRow>
                <TableRow class="bg-muted/50">
                  <TableCell class="font-medium">Mechanical Keyboard</TableCell>
                  <TableCell>Accessories</TableCell>
                  <TableCell class="text-right">$149.99</TableCell>
                  <TableCell class="text-right">60</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
