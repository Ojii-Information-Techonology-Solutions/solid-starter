import { createSignal } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import { Button } from "~/components/ui/button";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel
} from "~/components/ui/text-field";
import { Separator } from "~/components/ui/separator";
import { IconLoader, IconBrandApple, IconBrandGoogle } from "~/components/icons";
import { PasswordInput } from "~/components/password-input";
import { useSubmission } from "@solidjs/router";
import { Show } from "solid-js";
import { loginAction } from "~/lib/auth-actions";

export default  function LoginForm() {
  const [email, setEmail] = createSignal("demo@gmail.com");
  const [password, setPassword] = createSignal("password");
  
  const login =  useSubmission(loginAction);

  return (
    <div class="grid gap-6">
      <form action={loginAction} method="post" class="grid gap-6">
        <div class="grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" class="w-full gap-2 font-semibold">
            <IconBrandApple class="size-4" /> Apple
          </Button>
          <Button type="button" variant="outline" class="w-full gap-2 font-semibold">
            <IconBrandGoogle class="size-4" /> Google
          </Button>
        </div>

        <Separator label="Or continue with" />

        {/* --- Email Field --- */}
        <TextField class="grid gap-2 text-left">
          <TextFieldLabel for="email">Email</TextFieldLabel>
          <TextFieldInput
            id="email"
            name="email" // name is essential for FormData
            type="email"
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
            disabled={login.pending}
            autocomplete="email"
            required
          />
        </TextField>

        {/* --- Password Field --- */}
        <TextField class="grid gap-2 text-left">
          <div class="flex items-center justify-between">
            <TextFieldLabel for="password">Password</TextFieldLabel>
            <A
              href="/forgot-password"
              class="text-xs text-muted-foreground underline hover:text-primary transition-colors"
            >
              Forgot password?
            </A>
          </div>
          <PasswordInput
            id="password"
            name="password" // name is essential for FormData
            value={password()}
            onInput={(e) => setPassword(e.currentTarget.value)}
            disabled={login.pending}
            required
          />
        </TextField>

        <Button type="submit" class="w-full font-bold shadow-lg" disabled={login.pending}>
          <Show when={login.pending} fallback="Login">
            <IconLoader class="mr-2 size-4 animate-spin" />
            Authenticating...
          </Show>
        </Button>

        {/* --- Feedback State --- */}
        <Show when={login.result?.success === false}>
          <p class="text-sm text-destructive text-center font-medium">
            {login.result?.message}
          </p>
        </Show>
      </form>

      <div class="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <A href="/register" class="font-semibold text-foreground underline underline-offset-4 hover:text-primary transition-colors">
          Sign up
        </A>
      </div>
    </div>
  );
}