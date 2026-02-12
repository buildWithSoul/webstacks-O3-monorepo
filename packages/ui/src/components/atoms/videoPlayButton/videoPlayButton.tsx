import { twMerge } from "tailwind-merge";

type VideoPlayButtonProps = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}
const PlayIcon = ({ disabled = false }: { disabled?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 30"
    fill="none"
    aria-hidden="true"
    className="
      w-[17px] h-[21px]
      lg:w-[24px] lg:h-[30px]
      transition-colors duration-200
    "
  >
    <path
      d="M3.9702 29.6055L23.2727 17.418C24.9945 16.334 25.0001 13.6622 23.2727 12.5782L3.9702 0.384824C2.40184 -0.605374 0 0.355527 0 2.80479V27.1856C0 29.3828 2.23186 30.707 3.9702 29.6055Z"
      fill={disabled ? "var(--stroke-disabled)" : "currentColor"}
    />
  </svg>
);

export const VideoPlayButton = ({ 
  className, 
  onClick,
  disabled = false 
}: VideoPlayButtonProps) => {
  const baseStyles = [
    "group",
    "relative",
    "w-(--component-80-56-56) h-(--component-80-56-56)",
    "bg-white rounded-sm",
    "shadow-[0px_1px_2px_rgba(18,14,34,0.06),0px_1px_3px_rgba(18,14,34,0.10)]",
    "outline outline-(--stroke-primary) -outline-offset-1",
    "flex items-center justify-center",
    "transition-all duration-200",
    "cursor-pointer",
    "text-(--stroke-primary)", 
  ];

  const hoverStyles = [
    "hover:bg-(--surface-secondary-button-hover)",
    "hover:outline-(--stroke-secondary-button-hover)",
    "hover:text-(--stroke-secondary-button-hover)", 
  ];

  const focusStyles = [
    "focus:outline-(--stroke-secondary-button-hover)",
    "focus:shadow-[0_0_0_4px_var(--color-navy-primary-900---p)]",
    "focus:outline-none",
    "focus:text-(--stroke-secondary-button-hover)", 
  ];

  const disabledStyles = [
    "disabled:bg-(--surface-disabled)",
    "disabled:outline-(--stroke-disabled)",
    "disabled:shadow-none",
    "disabled:cursor-not-allowed",
    "disabled:text-(--stroke-disabled)", 
    "disabled:hover:bg-(--surface-disabled)",
    "disabled:hover:outline-(--stroke-disabled)",
    "disabled:hover:text-(--stroke-disabled)", 
    "disabled:focus:text-(--stroke-disabled)", 
  ];

  return (
    <div className="inline-flex items-center gap-2.5 justify-center">
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
        aria-label="Play video"
        aria-disabled={disabled}
      >
        <div >
          <PlayIcon disabled={disabled} />
        </div>
      </button>
    </div>
  );
};