import { cva } from 'class-variance-authority';

export const badgeVariations = {
  lightBlue: {
    badge: 'bg-purple-100 text-purple-900',
    iconContainer: '',
  },
  royalBlue: {
    badge: 'bg-purple-500 text-white',
    iconContainer: '',
  },
  navy: {
    badge: 'bg-purple-800 text-white',
    iconContainer: '',
  },
  gray: {
    badge: 'bg-neutral-300 text-purple-900',
    iconContainer: '',
  },
};

export const badgeStyles = cva('flex w-fit gap-1 rounded-3xl py-1 px-2.5 text-sm font-semibold backdrop-blur-md border border-white/20', {
  variants: {
    tone: {
      primary: 'bg-badge-primary text-badge-primary',
      secondary: 'bg-badge-secondary text-badge-secondary',
    },
    iconPosition: {
      start: 'pl-1',
      end: 'pr-1',
    },
  },
  defaultVariants: {
    tone: 'primary',
  },
});

