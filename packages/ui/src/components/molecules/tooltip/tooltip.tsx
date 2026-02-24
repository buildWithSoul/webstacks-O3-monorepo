"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { twMerge } from "tailwind-merge";

type TooltipProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Root
> & {
  label: string;
  supportingText?: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  delayDuration?: number;
  className?: string;
};

export function Tooltip({
  label,
  supportingText,
  children,
  side = "top",
  sideOffset = 4,
  delayDuration = 0,
  className,
  ...props
}: TooltipProps) {
  const isTextTrigger = typeof children === "string";

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root {...props}>
        <TooltipPrimitive.Trigger asChild>
          {isTextTrigger ? (
            <span className="cursor-help underline decoration-dotted underline-offset-4">
              {children}
            </span>
          ) : (
            children
          )}
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Content
          side={side}
          sideOffset={sideOffset}
          className={twMerge(
            "z-50 overflow-hidden rounded-xs bg-(--surface-secondary-background) px-3 py-2  shadow-md max-w-81.25",
            "animate-in fade-in-0 zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=top]:slide-in-from-bottom-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            className
          )}
        >
          <p className="text-2xs text-(--text-headings-dark) font-medium">
            {label}
          </p>
          {supportingText && (
            <p className="text-2xs text-(--text-body-dark) mt-1">
              {supportingText}
            </p>
          )}
          <TooltipPrimitive.Arrow asChild     className="-translate-y-0.5 filter drop-shadow-md"
>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="9"
              viewBox="0 0 15 9"
              fill="none"
              className="filter drop-shadow-md"
            >
              <path
                d="M13.1441 3.0825e-07C14.035 3.0825e-07 14.4812 1.07714 13.8512 1.70711L7.78017 7.77818C7.38965 8.16871 6.75648 8.16871 6.36596 7.77818L0.294897 1.70711C-0.335067 1.07714 0.1111 7.29718e-07 1.002 7.29718e-07L13.1441 3.0825e-07Z"
                className="
        fill-(--surface-secondary-background)
      "
              />
            </svg>
          </TooltipPrimitive.Arrow>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
