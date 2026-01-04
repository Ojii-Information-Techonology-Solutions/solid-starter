import { createAsync } from "@solidjs/router";
import { For, Show, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import ProtectedRoute from "~/components/protected-route";
import { getInvoices, deleteInvoice } from "~/actions/invoice";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { toast } from "solid-sonner";

export default function InvoicesPage() {
  const invoices = createAsync(() => getInvoices());
  const [deleteDialogOpen, setDeleteDialogOpen] = createSignal(false);
  const [invoiceToDelete, setInvoiceToDelete] = createSignal<number | null>(null);

  const handleDelete = async () => {
    const id = invoiceToDelete();
    if (id) {
      await deleteInvoice(id);
      setDeleteDialogOpen(false);
      setInvoiceToDelete(null);
      toast.success("Invoice deleted successfully");
      window.location.reload();
    }
  };

  const openDeleteDialog = (id: number) => {
    setInvoiceToDelete(id);
    setDeleteDialogOpen(true);
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
      month: "short",
      day: "numeric",
    });
  };

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-4 p-4 md:p-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold tracking-tight">Invoices</h1>
            <p class="text-muted-foreground">Manage your invoices and billing</p>
          </div>
          <Button as={A} href="/invoices/new">
            Create Invoice
          </Button>
        </div>

        <div class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Show
                when={invoices() && invoices()!.length > 0}
                fallback={
                  <TableRow>
                    <TableCell colSpan={7} class="text-center h-24 text-muted-foreground">
                      No invoices found. Create your first invoice to get started.
                    </TableCell>
                  </TableRow>
                }
              >
                <For each={invoices()}>
                  {(invoice: any) => (
                    <TableRow>
                      <TableCell class="font-medium">
                        <A href={`/invoices/${invoice.id}`} class="hover:underline">
                          {invoice.invoice_number}
                        </A>
                      </TableCell>
                      <TableCell>{invoice.client_name}</TableCell>
                      <TableCell>{formatDate(invoice.issue_date)}</TableCell>
                      <TableCell>{formatDate(invoice.due_date)}</TableCell>
                      <TableCell>{formatCurrency(invoice.total)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell class="text-right">
                        <div class="flex justify-end gap-2">
                          <Button
                            as={A}
                            href={`/invoices/${invoice.id}`}
                            variant="ghost"
                            size="sm"
                          >
                            View
                          </Button>
                          <Button
                            as={A}
                            href={`/invoices/${invoice.id}/edit`}
                            variant="ghost"
                            size="sm"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteDialog(invoice.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </For>
              </Show>
            </TableBody>
          </Table>
        </div>

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
    </ProtectedRoute>
  );
}