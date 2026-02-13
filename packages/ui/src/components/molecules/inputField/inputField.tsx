import { twMerge } from "tailwind-merge";
import { Icon } from "../../atoms";
import { InputHTMLAttributes, useId } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  variant?: "text" | "select";
};

export function InputField({
  label,
  hint,
  error,
  disabled,
  className,
  id,
  variant = "text",
  ...props
}: InputFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const isSelect = variant === "select";

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className={twMerge(
            "text-sm font-medium tracking-wide",
            error ? "text-(--text-error)" : "text-(--text-primary)"
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          disabled={disabled}
          readOnly={isSelect}
          className={twMerge(
            "flex shadow-xs w-full items-center justify-between rounded-none border py-(--padding-8-6-6) px-(--padding-12-8-8) pr-10 text-sm outline-none transition",
            "bg-(--surface-input) text-(--text-body) placeholder:text-(--text-placeholder)",

            error
              ? "border-(--stroke-error) bg-(--surface-error)"
              : "border-(--stroke-secondary) focus-primary",

            !disabled && !error && "focus-primary",
            !disabled && error && "focus-error",
            disabled && "input-disabled",

            className
          )}
          {...props}
        />

        {isSelect && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <Icon
              icon="chevron-down"
              className="h-5 w-5 text-(--icon-primary)"
            />
          </span>
        )}
      </div>

      {(hint || error) && (
        <p
          id={error ? errorId : hintId}
          className={twMerge(
            "text-xs",
            error ? "text-(--text-error)" : "text-(--text-body)"
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
