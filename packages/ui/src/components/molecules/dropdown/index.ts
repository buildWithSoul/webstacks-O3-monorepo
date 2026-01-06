// New Radix UI Dropdown component
export { default, Dropdown } from './dropdown';
export type { DropdownItem } from './dropdown';

// Legacy dropdown styles for backwards compatibility with blogListing
// TODO: Migrate blogListing to use a proper multi-select component
import { cva } from 'class-variance-authority';

export const inputStyles = cva([
  'w-full',
  'min-w-[180px]',
  'flex',
  'items-center',
  'justify-between',
  'rounded-[50px]',
  'border',
  'border-neutral-200',
  'px-[14px]',
  'py-[10px]',
  'text-body',
  'focus:outline-none',
  'text-md',
], {
  variants: {
    disabled: {
      true: ['bg-[#F2F4F7]'],
      false: ['bg-white'],
    },
  },
});

export const dropdownStyles = cva([
  'absolute',
  'left-0',
  'z-50',
  'min-w-full',
  'rounded-lg',
  'border',
  'border-neutral-200',
  'bg-white',
  'shadow-xl',
  'overflow-auto',
  'mt-1',
  'max-h-[300px]'
]);
