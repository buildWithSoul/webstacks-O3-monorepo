import { cva } from 'class-variance-authority';

export const mediaContainerStyle = cva('relative flex h-full items-center w-full lg:flex-1', {
  variants: {
    reverse: {
      true: 'lg:order-first',
      false: 'lg:order-last',
    },
  },
  defaultVariants: {
    reverse: false,
  },
});

export const headingContainerStyle = cva('flex h-full items-center w-full lg:w-[600px] shrink-0', {
  variants: {
    reverse: {
      true: 'lg:order-last',
      false: 'lg:order-first',
    },
  },
  defaultVariants: {
    reverse: false,
  },
});
