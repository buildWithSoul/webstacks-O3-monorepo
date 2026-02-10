import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  [
    "flex w-full items-center justify-center whitespace-nowrap transition-colors cursor-pointer outline-none",
  ],
  {
    // Note: Border radius is set via custom property in compound variants
    variants: {
      mode: {
        filled: [], // Base styles for filled mode, tone will determine specific styles
        stroke: [], // Base styles for stroke mode, tone will determine specific styles
        bleed: [
          // default - minimal styling, no border, minimal padding for better UX
          "bg-transparent border-0 font-semibold text-sm md:text-md cursor-pointer h-auto",
          // hover - very light background
          "hover:bg-emphasis",
          // disabled
          "disabled:cursor-not-allowed",
        ],
        link: [
          // default
          "font-semibold text-sm md:text-md h-auto",
          // disabled
          "disabled:cursor-not-allowed",
        ],
      },
      tone: {
        primary: [], // Base styles for primary tone, mode will determine specific styles
        secondary: [], // Base styles for secondary tone, mode will determine specific styles
      },
      // For backward compatibility
      variant: {
        primary: [],
        secondary: [],
        link: [],
        bleed: [],
      },
      fullWidth: {
        true: "",
        false: "sm:w-fit",
      },
      size: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
    },
    defaultVariants: {
      mode: "filled",
      tone: "primary",
      size: "md",
    },
    compoundVariants: [
      // Filled + Primary
      {
        mode: "filled",
        tone: "primary",
        className: [
          "bg-[var(--surface-button)] font-semibold text-[var(--text-button)] px-4 py-2", 
          "rounded-[4px]",
          "disabled:bg-[var(--surface-button)] disabled:opacity-70 disabled:text-white dark:disabled:bg-neutral-600 dark:disabled:text-neutral-400 disabled:cursor-not-allowed",
          "hover:bg-[var(--surface-button-hover)]",
        ],
      },
      // Filled + Secondary
      {
        mode: "filled",
        tone: "secondary",
        className: [
          "bg-button-secondary font-semibold border-button-secondary button-text-secondary dark:bg-white dark:text-black dark:border-white dark:hover:bg-neutral-100 px-6 md:px-8",
          "[border-radius:var(--Border-Radius-round,96px)]",
          "disabled:bg-white disabled:text-neutral-400 dark:disabled:bg-button-secondary dark:disabled:text-neutral-500 disabled:cursor-not-allowed",
        ],
      },
      // Stroke + Primary
      {
        mode: "stroke",
        tone: "primary",
        className: [
          "bg-transparent border-[1.5px] border-blue-700 text-blue-700 font-semibold hover:bg-blue-700/10 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400/10 px-6 md:px-8",
          "[border-radius:var(--Border-Radius-round,96px)]",
          "disabled:border-neutral-300 disabled:text-neutral-300 disabled:cursor-not-allowed",
        ],
      },
      // Stroke + Secondary
      {
        mode: "stroke",
        tone: "secondary",
        className: [
          "bg-transparent border-[1.5px] border-teal-500 text-teal-500 font-semibold dark:text-white dark:border-white px-6 md:px-8",
          "[border-radius:var(--Border-Radius-round,96px)]",
          "hover:bg-teal-500/10 dark:hover:bg-white/10",
          "disabled:border-neutral-300 disabled:text-neutral-300 disabled:cursor-not-allowed",
        ],
      },
      // Bleed + Primary
      {
        mode: "bleed",
        tone: "primary",
        className:
          "text-nav-item hover:text-link-hover group-hover:text-link-hover disabled:text-disabled",
      },
      // Bleed + Secondary
      {
        mode: "bleed",
        tone: "secondary",
        className:
          "text-heading hover:text-headline-hover disabled:text-disabled",
      },
      // Link + Primary
      {
        mode: "link",
        tone: "primary",
        className: "text-link hover:text-link-hover disabled:text-neutral-600",
      },
      // Link + Secondary
      {
        mode: "link",
        tone: "secondary",
        className: "text-link hover:text-link-hover disabled:text-neutral-600",
      },
      // Backward compatibility for variant='primary'
      {
        variant: "primary",
        className: [
          "bg-button-primary font-semibold text-button border-button-primary px-6 md:px-8",
          "[border-radius:var(--Border-Radius-round,96px)]",
          "disabled:bg-neutral-300 disabled:text-white dark:disabled:bg-neutral-600 dark:disabled:text-neutral-400 disabled:cursor-not-allowed",
        ],
      },
      // Backward compatibility for variant='secondary'
      {
        variant: "secondary",
        className: [
          "bg-button-secondary font-semibold button-text-secondary border-button-secondary px-6 md:px-8",
          "[border-radius:var(--Border-Radius-round,96px)]",
          "disabled:bg-white disabled:text-neutral-400 dark:disabled:bg-button-secondary dark:disabled:text-neutral-500 disabled:cursor-not-allowed",
        ],
      },
      // Backward compatibility for variant='link'
      {
        variant: "link",
        className: "text-link hover:text-link-hover disabled:text-neutral-600",
      },
      // Backward compatibility for variant='bleed'
      {
        variant: "bleed",
        className: "text-link hover:text-link-hover disabled:text-neutral-600",
      },
    ],
  }
);

export const textStyles = cva(
  ["flex size-full items-center justify-center gap-2"],
  {
    variants: {
      size: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// Hover styles are now applied directly in the buttonStyles
// This export is kept for backward compatibility but is no longer used
export const hoverStyles = cva("");
