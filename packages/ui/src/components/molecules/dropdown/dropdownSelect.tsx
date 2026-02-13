"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";


export function DropdownSelect({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        sideOffset={6}
        align="start"
        className="
          z-50
          w-(--radix-popper-anchor-width)
          max-w-(--radix-popper-anchor-width)
          overflow-hidden
          flex
          flex-col
          gap-1
          border
          py-2.5
          px-3
          shadow-md
          bg-(--surface-card)
          border-(--stroke-secondary)
        "
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}
