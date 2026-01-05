import { createSignal } from "solid-js";
import ProtectedRoute from "~/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Autocomplete, type AutocompleteItem } from "~/components/ui/autocomplete";
import { searchTasks, searchUsers, searchInvoices, type TaskSearchResult, type UserSearchResult, type InvoiceSearchResult } from "~/actions/search";

// Static data examples
const fruits: AutocompleteItem[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "cherry", label: "Cherry" },
  { value: "grape", label: "Grape" },
  { value: "lemon", label: "Lemon" },
  { value: "mango", label: "Mango" },
  { value: "orange", label: "Orange" },
  { value: "peach", label: "Peach" },
  { value: "pineapple", label: "Pineapple" },
  { value: "strawberry", label: "Strawberry" },
  { value: "watermelon", label: "Watermelon" },
];

const countries: AutocompleteItem[] = [
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "ca", label: "Canada", flag: "🇨🇦" },
  { value: "au", label: "Australia", flag: "🇦🇺" },
  { value: "de", label: "Germany", flag: "🇩🇪" },
  { value: "fr", label: "France", flag: "🇫🇷" },
  { value: "jp", label: "Japan", flag: "🇯🇵" },
  { value: "kr", label: "South Korea", flag: "🇰🇷" },
  { value: "br", label: "Brazil", flag: "🇧🇷" },
  { value: "mx", label: "Mexico", flag: "🇲🇽" },
  { value: "in", label: "India", flag: "🇮🇳" },
  { value: "cn", label: "China", flag: "🇨🇳" },
];

const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case "high": return "error";
    case "medium": return "warning";
    case "low": return "secondary";
    default: return "outline";
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "done": return "success";
    case "in-progress": return "warning";
    case "review": return "secondary";
    default: return "outline";
  }
};

export default function AutocompleteDemo() {
  const [selectedFruit, setSelectedFruit] = createSignal<AutocompleteItem | null>(null);
  const [selectedCountry, setSelectedCountry] = createSignal<AutocompleteItem | null>(null);
  const [selectedTask, setSelectedTask] = createSignal<TaskSearchResult | null>(null);
  const [selectedUser, setSelectedUser] = createSignal<UserSearchResult | null>(null);
  const [selectedInvoice, setSelectedInvoice] = createSignal<InvoiceSearchResult | null>(null);

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Autocomplete Component</h1>
          <p class="text-muted-foreground">
            Search and select from static lists or async server data
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Static Data Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Static Data</CardTitle>
              <CardDescription>Autocomplete with a predefined list of options</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <Autocomplete
                options={fruits}
                label="Select a Fruit"
                placeholder="Type to search fruits..."
                description="Start typing to filter the list"
                onSelect={(item) => setSelectedFruit(item)}
              />

              {selectedFruit() && (
                <div class="p-3 rounded-lg bg-muted text-sm">
                  Selected: <strong>{selectedFruit()!.label}</strong> (value: {selectedFruit()!.value})
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Render</CardTitle>
              <CardDescription>Autocomplete with custom item rendering</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <Autocomplete
                options={countries}
                label="Select a Country"
                placeholder="Search countries..."
                onSelect={(item) => setSelectedCountry(item)}
                renderItem={(item) => (
                  <div class="flex items-center gap-2">
                    <span class="text-lg">{(item as any).flag}</span>
                    <span>{item.label}</span>
                  </div>
                )}
              />

              {selectedCountry() && (
                <div class="p-3 rounded-lg bg-muted text-sm flex items-center gap-2">
                  Selected: <span class="text-lg">{(selectedCountry() as any).flag}</span>
                  <strong>{selectedCountry()!.label}</strong>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Async Server Search Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Async Task Search</CardTitle>
              <CardDescription>Search tasks from the database via server action</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <Autocomplete<TaskSearchResult>
                label="Search Tasks"
                placeholder="Type to search tasks..."
                description="Searches task titles from the database"
                onSearch={searchTasks}
                onSelect={(item) => setSelectedTask(item)}
                debounce={300}
                minChars={1}
                renderItem={(item) => (
                  <div class="flex flex-col gap-1">
                    <div class="flex items-center justify-between">
                      <span class="font-medium">{item.label}</span>
                      <Badge variant={getPriorityVariant(item.priority)} class="text-xs">
                        {item.priority}
                      </Badge>
                    </div>
                    {item.description && (
                      <span class="text-xs text-muted-foreground truncate max-w-[250px]">
                        {item.description}
                      </span>
                    )}
                  </div>
                )}
              />

              {selectedTask() && (
                <div class="p-3 rounded-lg bg-muted text-sm space-y-2">
                  <div class="flex items-center justify-between">
                    <strong>{selectedTask()!.label}</strong>
                    <div class="flex gap-2">
                      <Badge variant={getPriorityVariant(selectedTask()!.priority)}>
                        {selectedTask()!.priority}
                      </Badge>
                      <Badge variant={getStatusVariant(selectedTask()!.status)}>
                        {selectedTask()!.status}
                      </Badge>
                    </div>
                  </div>
                  <p class="text-muted-foreground">{selectedTask()!.description || "No description"}</p>
                  <p class="text-xs">ID: {selectedTask()!.value}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Async User Search</CardTitle>
              <CardDescription>Search users by name or email</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <Autocomplete<UserSearchResult>
                label="Search Users"
                placeholder="Search by name or email..."
                onSearch={searchUsers}
                onSelect={(item) => setSelectedUser(item)}
                emptyMessage="No users found"
                renderItem={(item) => (
                  <div class="flex flex-col">
                    <span class="font-medium">{item.label}</span>
                    <span class="text-xs text-muted-foreground">{item.email}</span>
                  </div>
                )}
              />

              {selectedUser() && (
                <div class="p-3 rounded-lg bg-muted text-sm">
                  <p><strong>{selectedUser()!.label}</strong></p>
                  <p class="text-muted-foreground">{selectedUser()!.email}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Async Invoice Search</CardTitle>
              <CardDescription>Search invoices by number or client</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <Autocomplete<InvoiceSearchResult>
                label="Search Invoices"
                placeholder="Search by invoice # or client..."
                onSearch={searchInvoices}
                onSelect={(item) => setSelectedInvoice(item)}
                emptyMessage="No invoices found"
                renderItem={(item) => (
                  <div class="flex items-center justify-between w-full">
                    <div class="flex flex-col">
                      <span class="font-medium">{item.label}</span>
                      <span class="text-xs text-muted-foreground">{item.clientName}</span>
                    </div>
                    <div class="text-right">
                      <span class="font-medium">${item.total.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              />

              {selectedInvoice() && (
                <div class="p-3 rounded-lg bg-muted text-sm space-y-1">
                  <div class="flex justify-between">
                    <strong>{selectedInvoice()!.label}</strong>
                    <Badge variant={selectedInvoice()!.status === "paid" ? "success" : "warning"}>
                      {selectedInvoice()!.status}
                    </Badge>
                  </div>
                  <p class="text-muted-foreground">{selectedInvoice()!.clientName}</p>
                  <p class="font-medium">${selectedInvoice()!.total.toFixed(2)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Input States</CardTitle>
              <CardDescription>Disabled and error states</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <Autocomplete
                options={fruits}
                label="Disabled"
                placeholder="Cannot type here..."
                disabled
              />

              <Autocomplete
                options={fruits}
                label="With Error"
                placeholder="Type to search..."
                error="Please select a valid option"
              />

              <Autocomplete
                options={[]}
                label="Empty Options"
                placeholder="Type to search..."
                emptyMessage="No options available"
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usage Example</CardTitle>
            <CardDescription>How to use the Autocomplete component</CardDescription>
          </CardHeader>
          <CardContent>
            <pre class="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { Autocomplete, type AutocompleteItem } from "~/components/ui/autocomplete";
import { searchTasks } from "~/actions/search";

// Static data
const options: AutocompleteItem[] = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
];

// With static data
<Autocomplete
  options={options}
  label="Select Option"
  placeholder="Type to search..."
  onSelect={(item) => console.log("Selected:", item)}
/>

// With async server search
<Autocomplete
  label="Search Tasks"
  placeholder="Type to search..."
  onSearch={searchTasks}
  onSelect={(item) => console.log("Selected:", item)}
  debounce={300}
  minChars={2}
/>

// With custom rendering
<Autocomplete
  options={options}
  renderItem={(item) => (
    <div class="flex items-center gap-2">
      <span>{item.label}</span>
      <Badge>{item.value}</Badge>
    </div>
  )}
/>`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
