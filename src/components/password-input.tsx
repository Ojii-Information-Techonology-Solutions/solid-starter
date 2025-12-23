// src/components/password-input.tsx
import { createSignal } from "solid-js";
import { TextFieldInput } from "~/components/ui/text-field";
import { Button } from "~/components/ui/button";
import { IconEyeOn, IconEyeOff } from "~/components/icons"; 

export function PasswordInput(props: any) {
  const [show, setShow] = createSignal(false);

  return (
    <div class="relative">
      <TextFieldInput
        {...props}
        type={show() ? "text" : "password"}
        class="pr-10"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShow(!show())}
      >
        {show() ? <IconEyeOff class="size-4" /> : <IconEyeOn class="size-4" />}
      </Button>
    </div>
  );
}