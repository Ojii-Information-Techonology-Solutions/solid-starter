import { createAsync, useParams, useNavigate, A } from "@solidjs/router";
import { createSignal, Show, For } from "solid-js";
import ProtectedRoute from "~/components/protected-route";
import { getInvoice, deleteInvoice } from "~/actions/invoice";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { toast } from "solid-sonner";

export default function InvoiceDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const invoice = createAsync(() => getInvoice(parseInt(params.id)));
  const [deleteDialogOpen, setDeleteDialogOpen] = createSignal(false);

  const handleDelete = async () => {
    await deleteInvoice(parseInt(params.id));
    setDeleteDialogOpen(false);
    toast.success("Invoice deleted successfully");
    navigate("/invoices");
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ProtectedRoute>
      <Show when={invoice()}>
        {(inv) => (
          <div class="flex flex-1 flex-col gap-4 p-4 md:p-8">
            <div class="flex items-center justify-between print:hidden">
              <div>
                <h1 class="text-3xl font-bold tracking-tight">Invoice Details</h1>
                <p class="text-muted-foreground">View and manage invoice</p>
              </div>
              <div class="flex gap-2">
                <Button variant="outline" onClick={handlePrint}>
                  Print
                </Button>
                <Button as={A} href={`/invoices/${params.id}/edit`} variant="outline">
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                  Delete
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <div class="flex items-start justify-between">
                  <div>
                    <CardTitle class="text-3xl">Invoice #{inv().invoice_number}</CardTitle>
                    <CardDescription>
                      Issued on {formatDate(inv().issue_date)}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusVariant(inv().status)} class="text-lg px-4 py-1">
                    {inv().status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 class="font-semibold text-lg mb-2">Bill To:</h3>
                    <div class="space-y-1 text-sm">
                      <p class="font-medium">{inv().client_name}</p>
                      <p class="text-muted-foreground">{inv().client_email}</p>
                      {inv().client_address && (
                        <p class="text-muted-foreground">{inv().client_address}</p>
                      )}
                    </div>
                  </div>

                  <div class="text-right md:text-right">
                    <h3 class="font-semibold text-lg mb-2">Invoice Details:</h3>
                    <div class="space-y-1 text-sm">
                      <p>
                        <span class="text-muted-foreground">Issue Date:</span>{" "}
                        <span class="font-medium">{formatDate(inv().issue_date)}</span>
                      </p>
                      <p>
                        <span class="text-muted-foreground">Due Date:</span>{" "}
                        <span class="font-medium">{formatDate(inv().due_date)}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 class="font-semibold text-lg mb-4">Items:</h3>
                  <div class="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead class="text-right">Quantity</TableHead>
                          <TableHead class="text-right">Rate</TableHead>
                          <TableHead class="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <For each={inv().items}>
                          {(item: any) => (
                            <TableRow>
                              <TableCell>{item.description}</TableCell>
                              <TableCell class="text-right">{item.quantity}</TableCell>
                              <TableCell class="text-right">{formatCurrency(item.rate)}</TableCell>
                              <TableCell class="text-right font-medium">
                                {formatCurrency(item.amount)}
                              </TableCell>
                            </TableRow>
                          )}
                        </For>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div class="flex justify-end">
                  <div class="w-full md:w-1/2 space-y-2">
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Subtotal:</span>
                      <span class="font-medium">{formatCurrency(inv().amount)}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Tax (10%):</span>
                      <span class="font-medium">{formatCurrency(inv().tax)}</span>
                    </div>
                    <Separator />
                    <div class="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span>{formatCurrency(inv().total)}</span>
                    </div>
                  </div>
                </div>

                {inv().notes && (
                  <>
                    <Separator />
                    <div>
                      <h3 class="font-semibold text-lg mb-2">Notes:</h3>
                      <p class="text-sm text-muted-foreground whitespace-pre-wrap">
                        {inv().notes}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Dialog open={deleteDialogOpen()} onOpenChange={setDeleteDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete the invoice.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </Show>
    </ProtectedRoute>
  );
}
