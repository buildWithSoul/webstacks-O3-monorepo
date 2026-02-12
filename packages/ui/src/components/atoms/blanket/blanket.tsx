'use client';

import type { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type BlanketProps = PropsWithChildren<{
  className?: string;
}>;

export const Blanket: FC<BlanketProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={twMerge(
        `
          w-full h-full
          opacity-60
          bg-(--color-alphas-dark-navy)
        `,
        className
      )}
    >
      {children}
    </div>
  );
};
