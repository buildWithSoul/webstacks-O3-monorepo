import { cva } from 'class-variance-authority';

export const tableHeaderStyle = cva(
  'border-t border-b border-neutrals-200 bg-purple-700 px-2 py-3 text-left text-md leading-normal font-medium dark:bg-black',
  {
    variants: {
      isFirst: {
        true: 'rounded-l-lg border-l',
        false: '',
      },
      isLast: {
        true: 'rounded-r-lg border-r',
        false: '',
      },
      alignment: {
        left: '',
        center: 'text-center'
      }
    },
    defaultVariants: {
      isFirst: false,
      isLast: false,
      alignment: 'left',
    },
  },
);
