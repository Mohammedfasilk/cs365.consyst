import React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-[var(--input)] bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...rest}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
