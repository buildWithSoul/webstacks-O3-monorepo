import { twMerge } from "tailwind-merge";
import { Icon } from "..";

type CarouselButtonProps = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  direction: 'left' | 'right';
  'aria-label'?: string;
};

export const CarouselButton = ({
  className,
  onClick,
  disabled = false,
  direction,
  'aria-label': ariaLabel,
}: CarouselButtonProps) => {
  const baseStyles = [
    "group",
    "relative",
    "w-10 h-10", 
    "rounded-(--border-radius-md)",
    "bg-(--surface-carousel)",
    "flex items-center justify-center",
    "transition-all duration-200",
    "cursor-pointer",
    "text-(--icon-primary)",
  ];

  const hoverStyles = [
    "hover:bg-(--surface-carousel-hover)",
    "hover:rounded-(--border-radius-md)",
  ];

  const focusStyles = [
    "focus:outline-(--stroke-secondary-button-hover)",
    "focus:shadow-[0_0_0_4px_var(--color-navy-primary-900---p)]",
    "focus:outline-none",
  ];

  const disabledStyles = [
    "disabled:bg-transparent",
    "disabled:border disabled:border-(--surface-disabled)",
    "disabled:rounded-(--border-radius-md)",
    "disabled:cursor-not-allowed",
    "disabled:text-(--stroke-disabled)",
    "disabled:hover:bg-transparent",
    "disabled:hover:border-(--surface-disabled)",
    "disabled:focus:shadow-none",
    "disabled:focus:bg-transparent",
  ];

  const defaultAriaLabel = direction === 'left' ? 'Previous slide' : 'Next slide';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        ...baseStyles,
        ...hoverStyles,
        ...focusStyles,
        ...disabledStyles,
        className
      )}
      aria-label={ariaLabel || defaultAriaLabel}
      aria-disabled={disabled}
    >
      <Icon
        icon={direction === 'left' ? 'arrow-left' : 'arrow-right'} 
        color="currentColor"
        className="w-5 h-5" 
      />
    </button>
  );
};