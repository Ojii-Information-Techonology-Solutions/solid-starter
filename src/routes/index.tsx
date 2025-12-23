import LoginForm from "~/components/login-form";
import { action, useAction } from "@solidjs/router";




export default function MainIndex() {

  return (
    <div class="flex min-h-[80vh] items-center justify-center px-4">
      <div class="w-full max-w-md space-y-8 rounded-xl border bg-card p-8 shadow-lg">
        <div class="text-center">
          <h2 class="text-2xl font-bold tracking-tight text-foreground">Welcome back</h2>
          <p class="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        
        {/* The component we just converted from Vue */}
        <LoginForm />
      </div>
      <div>
        {/* <button onClick={() => likePost()}>Like</button>; */}
      </div>
    </div>
  );
}