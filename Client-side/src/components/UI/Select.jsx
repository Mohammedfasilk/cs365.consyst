import React from "react"
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select"

import { cn } from "../../lib/utils"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-[var(--input)] bg-white px-3 py-2 text-sm shadow-sm ring-offset-[var(--background)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )}
      {...rest}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <CaretSortIcon className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})

const SelectScrollUpButton = React.forwardRef((props, ref) => {
  const { className, ...rest } = props
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...rest}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  )
})

const SelectScrollDownButton = React.forwardRef((props, ref) => {
  const { className, ...rest } = props
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...rest}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  )
})

const SelectContent = React.forwardRef((props, ref) => {
  const { className, children, position = "popper", ...rest } = props
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...rest}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})

const SelectLabel = React.forwardRef((props, ref) => {
  const { className, ...rest } = props
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold text-[var(--foreground)]", className)}
      {...rest}
    />
  )
})

const SelectItem = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm text-[var(--foreground)] outline-none focus:bg-[var(--csblue)] focus:text-[var(--accent-foreground)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...rest}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})

const SelectSeparator = React.forwardRef((props, ref) => {
  const { className, ...rest } = props
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn("my-1 h-px bg-[var(--muted)]", className)}
      {...rest}
    />
  )
})

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
