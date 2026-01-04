import { createSignal } from "solid-js";
import ProtectedRoute from "~/components/protected-route";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
  TextFieldTextArea,
  TextFieldDescription,
  TextFieldErrorMessage,
} from "~/components/ui/text-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function FormDemo() {
  const [email, setEmail] = createSignal("");
  const [emailError, setEmailError] = createSignal(false);

  const validateEmail = (value: string) => {
    setEmail(value);
    setEmailError(!value.includes("@") && value.length > 0);
  };

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Form Components</h1>
          <p class="text-muted-foreground">
            Form inputs, validation, and interactive controls
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Text Inputs</CardTitle>
              <CardDescription>Various text input types</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <TextField>
                <TextFieldLabel>Username</TextFieldLabel>
                <TextFieldInput placeholder="Enter your username" />
              </TextField>

              <TextField>
                <TextFieldLabel>Email</TextFieldLabel>
                <TextFieldInput type="email" placeholder="you@example.com" />
                <TextFieldDescription>We'll never share your email.</TextFieldDescription>
              </TextField>

              <TextField>
                <TextFieldLabel>Password</TextFieldLabel>
                <TextFieldInput type="password" placeholder="••••••••" />
              </TextField>

              <TextField>
                <TextFieldLabel>Phone</TextFieldLabel>
                <TextFieldInput type="tel" placeholder="+1 (555) 000-0000" />
              </TextField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Input States</CardTitle>
              <CardDescription>Disabled, readonly, and validation states</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <TextField disabled>
                <TextFieldLabel>Disabled Input</TextFieldLabel>
                <TextFieldInput placeholder="You cannot edit this" />
              </TextField>

              <TextField readOnly>
                <TextFieldLabel>Read Only</TextFieldLabel>
                <TextFieldInput value="This value is read only" />
              </TextField>

              <TextField validationState={emailError() ? "invalid" : "valid"}>
                <TextFieldLabel>Email with Validation</TextFieldLabel>
                <TextFieldInput
                  type="email"
                  placeholder="Enter a valid email"
                  value={email()}
                  onInput={(e) => validateEmail(e.currentTarget.value)}
                />
                <TextFieldErrorMessage>
                  Please enter a valid email address
                </TextFieldErrorMessage>
              </TextField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Textarea</CardTitle>
              <CardDescription>Multi-line text inputs</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <TextField>
                <TextFieldLabel>Bio</TextFieldLabel>
                <TextFieldTextArea placeholder="Tell us about yourself..." />
                <TextFieldDescription>Max 500 characters</TextFieldDescription>
              </TextField>

              <TextField>
                <TextFieldLabel>Notes</TextFieldLabel>
                <TextFieldTextArea placeholder="Add any additional notes..." class="min-h-[120px]" />
              </TextField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select</CardTitle>
              <CardDescription>Dropdown selection inputs</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Country</label>
                <Select
                  options={["United States", "Canada", "United Kingdom", "Australia", "Germany"]}
                  placeholder="Select a country"
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
                  options={["Low", "Medium", "High", "Critical"]}
                  placeholder="Select priority"
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
                <label class="text-sm font-medium">Status (Disabled)</label>
                <Select
                  options={["Active", "Inactive"]}
                  placeholder="Select status"
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checkboxes</CardTitle>
              <CardDescription>Toggle and multi-select controls</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label for="terms" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Accept terms and conditions
                </label>
              </div>

              <div class="flex items-center space-x-2">
                <Checkbox id="marketing" defaultChecked />
                <label for="marketing" class="text-sm font-medium leading-none">
                  Receive marketing emails
                </label>
              </div>

              <div class="flex items-center space-x-2">
                <Checkbox id="newsletter" />
                <label for="newsletter" class="text-sm font-medium leading-none">
                  Subscribe to newsletter
                </label>
              </div>

              <div class="flex items-center space-x-2">
                <Checkbox id="disabled" disabled />
                <label for="disabled" class="text-sm font-medium leading-none text-muted-foreground">
                  Disabled checkbox
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Date & Time</CardTitle>
              <CardDescription>Date and time inputs</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <TextField>
                <TextFieldLabel>Date</TextFieldLabel>
                <TextFieldInput type="date" />
              </TextField>

              <TextField>
                <TextFieldLabel>Time</TextFieldLabel>
                <TextFieldInput type="time" />
              </TextField>

              <TextField>
                <TextFieldLabel>Date & Time</TextFieldLabel>
                <TextFieldInput type="datetime-local" />
              </TextField>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Complete Form Example</CardTitle>
            <CardDescription>A full form with multiple input types</CardDescription>
          </CardHeader>
          <CardContent>
            <form class="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField>
                  <TextFieldLabel>First Name</TextFieldLabel>
                  <TextFieldInput placeholder="John" />
                </TextField>
                <TextField>
                  <TextFieldLabel>Last Name</TextFieldLabel>
                  <TextFieldInput placeholder="Doe" />
                </TextField>
              </div>

              <TextField>
                <TextFieldLabel>Email</TextFieldLabel>
                <TextFieldInput type="email" placeholder="john.doe@example.com" />
              </TextField>

              <div class="space-y-2">
                <label class="text-sm font-medium">Role</label>
                <Select
                  options={["Developer", "Designer", "Manager", "Other"]}
                  placeholder="Select your role"
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

              <TextField>
                <TextFieldLabel>Message</TextFieldLabel>
                <TextFieldTextArea placeholder="Your message..." />
              </TextField>

              <div class="flex items-center space-x-2">
                <Checkbox id="agree" />
                <label for="agree" class="text-sm">
                  I agree to the privacy policy and terms of service
                </label>
              </div>

              <div class="flex gap-4">
                <Button type="submit">Submit</Button>
                <Button type="button" variant="outline">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
