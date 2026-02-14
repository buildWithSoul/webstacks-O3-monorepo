import { twMerge } from 'tailwind-merge';
import type { ComponentPropsWithoutRef, ElementType, FC, ReactNode } from 'react';

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  /**
   * An optional alternative HTML element type to render the section with.
   */
  as?: ElementType;
  /**
   * A unique identifier for the section.
   */
  id?: string;
  /**
   * The content to be rendered inside the section.
   */
  children: ReactNode;
}

export const Section: FC<SectionProps> = ({
  as,
  id,
  children,
  className,
  ...rest
}) => {
  const Component = as || 'section';

  return (
    <Component
      id={id}
      className={twMerge(
        "w-(--widths-1440-834-375) p-(--padding-top-down-sectional-96-72-48-xl) flex flex-col gap-12 items-center bg-(--surface-background)" ,
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};