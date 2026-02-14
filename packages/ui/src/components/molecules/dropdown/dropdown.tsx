"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { InputField } from "../inputField";
import { DropdownSelect } from "./dropdownSelect";
import { DropdownSelectItem } from "./dropdownSelectItem";

type DropdownOption = {
  value: string;
  label: string;
  description?: string;
};

type DropdownProps = {
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  multiple?: boolean;
  value?: string | string[];
  options: DropdownOption[];
  placeholder?: string;
  onChange: (value: string | string[]) => void;
};

export function Dropdown({
  label,
  hint,
  error,
  disabled,
  multiple,
  value,
  options,
  placeholder = "Select option",
  onChange,
}: DropdownProps) {
  const isSelected = (val: string) =>
    multiple ? Array.isArray(value) && value.includes(val) : value === val;

  const handleSelect = (val: string) => {
    if (!multiple) {
      onChange(val);
      return;
    }

    const current = Array.isArray(value) ? value : [];
    onChange(
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );
  };

  const displayValue = Array.isArray(value)
    ? value.join(", ")
    : value ?? "";
    

  return (
   <div className="relative">
     <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild disabled={disabled}>
        <div>
          <InputField
            label={label}
            hint={hint}
            error={error}
            disabled={disabled}
            variant="select"
            readOnly
            value={displayValue}
            placeholder={placeholder}
            aria-haspopup="listbox"
          />
        </div>
      </DropdownMenu.Trigger>

      <DropdownSelect>
        {options.map((option) => (
          <DropdownSelectItem
            key={option.value}
            label={option.label}
            description={option.description}
            multiple={multiple}
            selected={isSelected(option.value)}
            onSelect={() => handleSelect(option.value)}
          />
        ))}
      </DropdownSelect>
    </DropdownMenu.Root>
   </div>
  );
}
