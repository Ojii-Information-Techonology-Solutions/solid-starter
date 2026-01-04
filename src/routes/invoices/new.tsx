import { createSignal, Index } from "solid-js";
import { useNavigate } from "@solidjs/router";
import ProtectedRoute from "~/components/protected-route";
import { createInvoice } from "~/actions/invoice";
import { Button } from "~/components/ui/button";
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { toast } from "solid-sonner";

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
];

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export default function NewInvoicePage() {
  const navigate = useNavigate();

  const [invoiceNumber, setInvoiceNumber] = createSignal("");
  const [clientName, setClientName] = createSignal("");
  const [clientEmail, setClientEmail] = createSignal("");
  const [clientAddress, setClientAddress] = createSignal("");
  const [issueDate, setIssueDate] = createSignal(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = createSignal("");
  const [status, setStatus] = createSignal("draft");
  const [notes, setNotes] = createSignal("");
  const [items, setItems] = createSignal<InvoiceItem[]>([
    { id: "1", description: "", quantity: 1, rate: 0, amount: 0 },
  ]);

  const addItem = () => {
    setItems([
      ...items(),
      { id: Date.now().toString(), description: "", quantity: 1, rate: 0, amount: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    setItems(items().filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items().map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === "quantity" || field === "rate") {
            updated.amount = updated.quantity * updated.rate;
          }
          return updated;
        }
        return item;
      })
    );
  };

  const calculateSubtotal = () => {
    return items().reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!invoiceNumber() || !clientName() || !clientEmail() || !dueDate()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (items().length === 0 || items().some((item) => !item.description)) {
      toast.error("Please add at least one item with a description");
      return;
    }

    try {
      await createInvoice({
        invoice_number: invoiceNumber(),
        client_name: clientName(),
        client_email: clientEmail(),
        client_address: clientAddress(),
        amount: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal(),
        status: status(),
        issue_date: issueDate(),
        due_date: dueDate(),
        notes: notes(),
        items: items(),
      });

      toast.success("Invoice created successfully");
      navigate("/invoices");
    } catch (error) {
      toast.error("Failed to create invoice");
      console.error(error);
    }
  };

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-4 p-4 md:p-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold tracking-tight">Create Invoice</h1>
            <p class="text-muted-foreground">Fill in the details to create a new invoice</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} class="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>Basic information about the invoice</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField>
                  <TextFieldLabel>Invoice Number *</TextFieldLabel>
                  <TextFieldInput
                    type="text"
                    value={invoiceNumber()}
                    onInput={(e) => setInvoiceNumber(e.currentTarget.value)}
                    placeholder="INV-001"
                    required
                  />
                </TextField>

                <div class="space-y-2">
                  <label class="text-sm font-medium leading-none">Status</label>
                  <Select
                    value={STATUS_OPTIONS.find(o => o.value === status())}
                    onChange={(option) => option && setStatus(option.value)}
                    options={STATUS_OPTIONS}
                    optionValue="value"
                    optionTextValue="label"
                    placeholder="Select status"
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
                    )}
                  >
                    <SelectTrigger>
                      <SelectValue<typeof STATUS_OPTIONS[0]>>
                        {(state) => state.selectedOption()?.label ?? "Select status"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </div>

                <TextField>
                  <TextFieldLabel>Issue Date *</TextFieldLabel>
                  <TextFieldInput
                    type="date"
                    value={issueDate()}
                    onInput={(e) => setIssueDate(e.currentTarget.value)}
                    required
                  />
                </TextField>

                <TextField>
                  <TextFieldLabel>Due Date *</TextFieldLabel>
                  <TextFieldInput
                    type="date"
                    value={dueDate()}
                    onInput={(e) => setDueDate(e.currentTarget.value)}
                    required
                  />
                </TextField>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
              <CardDescription>Details about the client</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <TextField>
                <TextFieldLabel>Client Name *</TextFieldLabel>
                <TextFieldInput
                  type="text"
                  value={clientName()}
                  onInput={(e) => setClientName(e.currentTarget.value)}
                  placeholder="Acme Corporation"
                  required
                />
              </TextField>

              <TextField>
                <TextFieldLabel>Client Email *</TextFieldLabel>
                <TextFieldInput
                  type="email"
                  value={clientEmail()}
                  onInput={(e) => setClientEmail(e.currentTarget.value)}
                  placeholder="client@example.com"
                  required
                />
              </TextField>

              <TextField>
                <TextFieldLabel>Client Address</TextFieldLabel>
                <TextFieldInput
                  type="text"
                  value={clientAddress()}
                  onInput={(e) => setClientAddress(e.currentTarget.value)}
                  placeholder="123 Main St, City, State, ZIP"
                />
              </TextField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoice Items</CardTitle>
              <CardDescription>Add items to the invoice</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <Index each={items()}>
                {(item) => (
                  <div class="grid grid-cols-12 gap-4 items-end">
                    <div class="col-span-12 md:col-span-5">
                      <TextField>
                        <TextFieldLabel>Description</TextFieldLabel>
                        <TextFieldInput
                          type="text"
                          value={item().description}
                          onInput={(e) =>
                            updateItem(item().id, "description", e.currentTarget.value)
                          }
                          placeholder="Service or product description"
                        />
                      </TextField>
                    </div>

                    <div class="col-span-4 md:col-span-2">
                      <TextField>
                        <TextFieldLabel>Quantity</TextFieldLabel>
                        <TextFieldInput
                          type="number"
                          value={item().quantity}
                          onInput={(e) =>
                            updateItem(item().id, "quantity", parseFloat(e.currentTarget.value) || 0)
                          }
                          min="1"
                        />
                      </TextField>
                    </div>

                    <div class="col-span-4 md:col-span-2">
                      <TextField>
                        <TextFieldLabel>Rate</TextFieldLabel>
                        <TextFieldInput
                          type="number"
                          value={item().rate}
                          onInput={(e) =>
                            updateItem(item().id, "rate", parseFloat(e.currentTarget.value) || 0)
                          }
                          min="0"
                          step="0.01"
                        />
                      </TextField>
                    </div>

                    <div class="col-span-3 md:col-span-2">
                      <TextField>
                        <TextFieldLabel>Amount</TextFieldLabel>
                        <TextFieldInput
                          type="number"
                          value={item().amount.toFixed(2)}
                          disabled
                        />
                      </TextField>
                    </div>

                    <div class="col-span-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item().id)}
                        disabled={items().length === 1}
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                )}
              </Index>

              <Button type="button" variant="outline" onClick={addItem}>
                Add Item
              </Button>

              <div class="border-t pt-4 space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>Tax (10%):</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Additional notes for the invoice</CardDescription>
            </CardHeader>
            <CardContent>
              <TextField>
                <TextFieldLabel>Notes</TextFieldLabel>
                <textarea
                  class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={notes()}
                  onInput={(e) => setNotes(e.currentTarget.value)}
                  placeholder="Payment terms, thank you note, etc."
                />
              </TextField>
            </CardContent>
          </Card>

          <div class="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/invoices")}>
              Cancel
            </Button>
            <Button type="submit">Create Invoice</Button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
