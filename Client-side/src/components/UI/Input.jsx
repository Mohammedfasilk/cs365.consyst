import React from "react";
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn("flex h-9 w-full rounded-md border border-[var(--input)] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };