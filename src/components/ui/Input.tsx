import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-[var(--card-border)] bg-white px-3 py-1 text-sm shadow-sm outline-none transition-colors focus-visible:border-[var(--brand-green)]",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
