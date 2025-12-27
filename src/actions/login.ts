import { action, redirect } from "@solidjs/router";
import { useAuthSession } from "~/lib/session";

export const loginAction = action(async (formData: FormData) => {
  "use server";
  
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  // Mock Logic
  if (email === "demo@gmail.com" && password === "password") {
    const session = await useAuthSession();
    
    // Update the encrypted cookie data
    await session.update({
      userId: "user_12345",
      email: email
    });

    // console.log("session", session.data);

    return redirect("/dashboard");
  }

  return { success: false, message: "Invalid credentials" };
}, "login-action");