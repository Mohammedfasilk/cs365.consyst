import * as RadixTooltip from '@radix-ui/react-tooltip';
import React from 'react';

export const TooltipProvider = RadixTooltip.Provider;
export const Tooltip = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;
export const TooltipContent = React.forwardRef(({ children, className = '', ...props }, ref) => (
  <RadixTooltip.Content
    ref={ref}
    sideOffset={6}
    className={`z-50 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg min-w-max animate-fade-in ${className}`}
    {...props}
  >
    {children}
    <RadixTooltip.Arrow className="fill-gray-900" />
  </RadixTooltip.Content>
));

TooltipContent.displayName = 'TooltipContent'; 