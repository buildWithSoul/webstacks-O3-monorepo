import React, { forwardRef, Ref } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Valid heading tags
const HeadingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
type HeadingTag = typeof HeadingTags[number];

export const headingVariants = cva('relative font-medium text-(--text-headings-dark)', {
  variants: {
    size: {
      '2xs': 'text-display-2xs',
      xs: 'text-display-xs',
      sm: 'text-display-2xs sm:text-display-xs md:text-display-sm',
      md: 'text-display-xs sm:text-display-sm md:text-display-md',
      lg: 'text-display-sm sm:text-display-md md:text-display-lg',
      xl: 'text-display-sm sm:text-display-md lg:text-display-lg xl:text-display-xl',
      '2xl': 'text-display-md sm:text-display-lg lg:text-display-xl xl:text-display-2xl',
      '3xl': 'text-display-lg sm:text-display-xl lg:text-display-2xl xl:text-display-3xl',
      '4xl': 'text-display-xl sm:text-display-2xl lg:text-display-3xl xl:text-display-4xl',
      '5xl': 'text-display-2xl sm:text-display-3xl lg:text-display-4xl xl:text-display-5xl',
      '6xl': 'text-display-3xl sm:text-display-4xl lg:text-display-5xl xl:text-display-6xl',
      '7xl': 'text-display-4xl sm:text-display-5xl lg:text-display-6xl xl:text-display-7xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    fontFamily: {
      display: 'font-heading-display',
      accent: 'font-heading-accent',
      body: 'font-body=',
      eyebrow: 'font-eyebrow',
    },
    textTransform: {
      none: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    }
  },
  defaultVariants: {
    size: '2xl',
    weight: 'medium',
    fontFamily: 'display',
  },
});

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: HeadingTag;
  children: React.ReactNode;
  headingSize?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  fontFamily?: 'display' | 'accent' | 'body' | 'eyebrow';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as: HeadingComponent = 'h2',
      size,
      weight,
      headingSize,
      fontFamily,
      textTransform,
      className = '',
      children,
      ...rest
    },
    ref: Ref<HTMLHeadingElement>
  ) => {
    // Validate heading tag
    if (!HeadingTags.includes(HeadingComponent)) {
      console.error(`Heading: 'as' prop must be one of ${HeadingTags.join(', ')}`);
      return null;
    }
    // If headingSize is provided, use it as the size
    const finalSize = headingSize || size;
    
    return (
      <HeadingComponent
        className={`${headingVariants({ size: finalSize, weight, fontFamily })} ${className}`}
        ref={ref}
        {...rest}
      >
        {children}
      </HeadingComponent>
    );
  }
);

Heading.displayName = 'Heading';
