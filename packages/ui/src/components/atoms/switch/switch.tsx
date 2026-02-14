import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes } from 'react';

type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export function Switch({ 
  checked = false,
  onCheckedChange,
  className,
  disabled,
  ...props 
}: SwitchProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(event.target.checked);
  };

  return (
    <label className={twMerge('inline-flex items-center', !disabled && 'cursor-pointer')}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      <div
        className={twMerge(
          'relative w-25 h-12.5 rounded-full transition-colors duration-200',
          'bg-(--surface-secondary-background) border border-(--stroke-secondary)',
          'peer-checked:bg-(--surface-accent-background)',
          'peer-disabled:bg-(--surface-disabled) peer-disabled:cursor-not-allowed',
          className
        )}
      >
        <div
          className={twMerge(
            'absolute top-1 left-2 w-10 h-10 rounded-full  transition-transform duration-200',
            'bg-(--icon-primary)',
            checked && 'translate-x-10.5',
            disabled && 'bg-(--icon-disabled)'

          )}
        />
      </div>
    </label>
  );
}