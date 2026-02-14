"use client";

import { useEffect, useRef, useState } from "react";

type RadioProps = {
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  id?: string;
  name?: string;
  value?: string;
  label?: string;
  labelClassName?: string;
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: {
    radio: "h-4 w-4",
    dot: "h-1 w-1",
    dotPosition: "top-1/2 left-2 -translate-x-1/2 -translate-y-1/2",
    label: "text-[length:var(--text-jumper-text-class-mono-xs)]",
  },
  md: {
    radio: "h-5 w-5",
    dot: "h-2 w-2",
    dotPosition: "top-1/2 left-2.5 -translate-x-1/2 -translate-y-1/2",
    label: "text-[length:var(--text-jumper-text-class-mono-sm)]",
  }
};

const baseClasses = {
  radio: "appearance-none rounded-full border accent-(--surface-card)",
  dot: "absolute rounded-full pointer-events-none",
  label: "transition-colors duration-150",
  container: "relative flex items-center gap-2",
  radioContainer: "relative flex items-center justify-center"
};

export const Radio = ({
  checked: controlledChecked,
  disabled = false,
  error = false,
  onChange,
  className = "",
  id,
  name,
  value,
  label,
  labelClassName = "",
  size = "sm",
}: RadioProps) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = () => {
    if (disabled) return;
    const newChecked = !checked;
    if (!isControlled) setInternalChecked(newChecked);
    onChange?.(newChecked);
  };

  const state = {
    disabled,
    error,
    checked
  };

  const getRadioClasses = () => {
    const { disabled, error, checked } = state;
    let classes = `${baseClasses.radio} ${sizeClasses[size].radio} peer`;

    if (disabled) {
      classes += " border-(--stroke-card) disabled:border-(--stroke-card) disabled:border disabled:bg-(--surface-disabled) disabled:cursor-not-allowed";
    } else {
      if (error) {
        classes += " border-(--color-error-500) hover:bg-(--surface-error) hover:border-(--color-error-500) focus:border-(--color-error-500) focus:shadow-[0_0_0_4px_var(--surface-error)] focus:outline-none";
      } else {
        classes += " border-(--stroke-primary) hover:bg-(--surface-checkmark-hover) hover:border-(--stroke-primary) focus:border-(--stroke-primary) focus:shadow-[0_0_0_4px_var(--color-navy-primary-900---p)] focus:outline-none";
      }
    }

    if (checked) {
      if (disabled) classes += " bg-(--surface-disabled)";
      else if (error) classes += " bg-(--surface-error)";
      else classes += " bg-(--surface-card)";
    }

    return classes;
  };

  const getDotClasses = () => {
    let classes = `${baseClasses.dot} ${sizeClasses[size].dot} ${sizeClasses[size].dotPosition}`;
    
    if (disabled) {
      classes += " bg-(--icon-disabled)";
    } else if (error) {
      classes += " bg-(--color-error-500)";
    } else {
      classes += " bg-(--stroke-primary)";
    }
    
    return classes;
  };

  const getLabelClasses = () => {
    let classes = `${baseClasses.label} ${sizeClasses[size].label}`;
    
    if (disabled) {
      classes += " text-(--text-link-disabled) cursor-not-allowed";
    } else {
      classes += " text-(--text-link) cursor-pointer";
      
      if (error) {
        classes += " !text-(--color-error-700)";
      }
      
      classes += " peer-hover:text-(--text-link-hover)";
      classes += " hover:text-(--text-link-hover)";
      classes += " peer-focus:text-(--text-link)";
    }
    
    return classes;
  };

  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={baseClasses.container}>
      <div className={baseClasses.radioContainer}>
        <input
          ref={inputRef}
          type="radio"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          id={radioId}
          name={name}
          value={value}
          className={`${getRadioClasses()} ${className}`}
        />

        {checked && <div className={getDotClasses()} />}
         {label && (
        <label
          htmlFor={radioId}
          className={`${getLabelClasses()} ${labelClassName} ml-2`}
        >
          {label}
        </label>
      )}
      </div>

     
    </div>
  );
};