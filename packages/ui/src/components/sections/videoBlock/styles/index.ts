import { cva } from 'class-variance-authority';

export const containerStyle = cva(
  'w-full max-w-[1200px] mx-auto',
  {
    variants: {
      alignment: {
        center: 'flex flex-col items-center',
        left: 'flex flex-col items-start',
      },
    },
    defaultVariants: {
      alignment: 'center',
    },
  }
);


