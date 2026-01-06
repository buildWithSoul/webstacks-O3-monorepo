'use client';

import React, { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export interface DropdownItem {
  key: string;
  label: string;
  icon?: ReactNode;
  isActive?: boolean;
  onSelect: () => void;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
  contentClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  modal?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  side = 'bottom',
  align = 'start',
  sideOffset = 8,
  className,
  contentClassName,
  itemClassName,
  activeItemClassName,
  modal = false,
}) => {
  return (
    <DropdownMenu.Root modal={modal}>
      <DropdownMenu.Trigger asChild>
        {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`rounded-md py-2 z-[100] ring-1 will-change-[opacity,transform] ${contentClassName ?? 'bg-primary ring-border-subtle shadow-elevation w-48'}`}
          side={side}
          align={align}
          sideOffset={sideOffset}
          avoidCollisions={true}
          collisionPadding={8}
          sticky="always"
        >
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.key}
              className={`flex items-center px-4 py-2 text-sm cursor-pointer rounded outline-none
                ${item.isActive 
                  ? activeItemClassName ?? 'text-primary-headline-emphasis bg-rest/50 font-medium' 
                  : itemClassName ?? 'text-body'
                } 
                hover:bg-rest hover:text-headline-hover focus:bg-rest focus:text-headline-hover`}
              onSelect={item.onSelect}
            >
              {item.icon}
              <span className={item.icon ? '' : 'ml-7'}>
                {item.label}
              </span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
