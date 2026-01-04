import { createSignal } from "solid-js";
import ProtectedRoute from "~/components/protected-route";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function SelectDemo() {
  const [selectedFruit, setSelectedFruit] = createSignal<string>("");
  const [selectedTimezone, setSelectedTimezone] = createSignal<string>("");

  const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple", "Orange", "Mango"];
  const countries = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan"];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const statuses = ["Pending", "In Progress", "Completed", "Cancelled"];

  const timezones = [
    "Pacific/Honolulu (HST)",
    "America/Los_Angeles (PST)",
    "America/Denver (MST)",
    "America/Chicago (CST)",
    "America/New_York (EST)",
    "Europe/London (GMT)",
    "Europe/Paris (CET)",
    "Asia/Tokyo (JST)",
  ];

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Select Component</h1>
          <p class="text-muted-foreground">
            Dropdown selection controls for choosing from options
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Select</CardTitle>
              <CardDescription>Simple dropdown selection</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Favorite Fruit</label>
                <Select
                  options={fruits}
                  placeholder="Select a fruit..."
                  value={selectedFruit()}
                  onChange={setSelectedFruit}
                  itemComponent={(props) => (
                    <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                  )}
                >
                  <SelectTrigger>
                    <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </div>

              <div class="rounded-lg border p-4 bg-muted/50">
                <p class="text-sm">
                  Selected: <strong>{selectedFruit() || "None"}</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select States</CardTitle>
              <CardDescription>Different select states</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Normal</label>
                <Select
                  options={countries}
                  placeholder="Select a country..."
                  itemComponent={(props) => (
                    <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                  )}
                >
                  <SelectTrigger>
                    <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-muted-foreground">Disabled</label>
                <Select
                  options={countries}
                  placeholder="Select a country..."
                  disabled
                  itemComponent={(props) => (
                    <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                  )}
                >
                  <SelectTrigger>
                    <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium">With Default Value</label>
                <Select
                  options={priorities}
                  defaultValue="Medium"
                  itemComponent={(props) => (
                    <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                  )}
                >
                  <SelectTrigger>
                    <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Selection</CardTitle>
              <CardDescription>Select with contextual options</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Task Status</label>
                <Select
                  options={statuses}
                  placeholder="Select status..."
                  itemComponent={(props) => (
                    <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                  )}
                >
                  <SelectTrigger>
                    <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium">Priority Level</label>
                <Select
                  options={priorities}
                  placeholder="Select priority..."
                  itemComponent={(props) => (
                    <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                  )}
                >
                  <SelectTrigger>
                    <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timezone Select</CardTitle>
              <CardDescription>Select with longer options</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Your Timezone</label>
                <Select
                  options={timezones}
                  placeholder="Select timezone..."
                  value={selectedTimezone()}
                  onChange={setSelectedTimezone}
                  itemComponent={(props) => (
                    <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                  )}
                >
                  <SelectTrigger class="w-full">
                    <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </div>

              <div class="rounded-lg border p-4 bg-muted/50">
                <p class="text-sm">
                  Selected timezone: <strong>{selectedTimezone() || "Not selected"}</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Example</CardTitle>
            <CardDescription>Select components in a form context</CardDescription>
          </CardHeader>
          <CardContent>
            <form class="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium">Country</label>
                  <Select
                    options={countries}
                    placeholder="Select country..."
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                    )}
                  >
                    <SelectTrigger>
                      <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium">Priority</label>
                  <Select
                    options={priorities}
                    placeholder="Select priority..."
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                    )}
                  >
                    <SelectTrigger>
                      <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium">Status</label>
                  <Select
                    options={statuses}
                    placeholder="Select status..."
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                    )}
                  >
                    <SelectTrigger>
                      <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </div>
              </div>

              <div class="flex gap-4">
                <Button type="submit">Save</Button>
                <Button type="button" variant="outline">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
