'use client';

import React, { ReactNode, useState, useRef, useEffect } from 'react';
import * as Select from '@radix-ui/react-select';
import * as Popover from '@radix-ui/react-popover';
import { Icon } from '../../atoms';

export interface SelectItem {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface BaseSelectProps {
  items: SelectItem[];
  placeholder?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  side?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  disabled?: boolean;
}

interface SingleSelectProps extends BaseSelectProps {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
}

interface MultiSelectProps extends BaseSelectProps {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange: (value: string[]) => void;
}

type SelectProps = SingleSelectProps | MultiSelectProps;

export const SelectComponent: React.FC<SelectProps> = (props) => {
  const {
    items,
    placeholder = 'Select an option',
    triggerClassName,
    contentClassName,
    itemClassName,
    activeItemClassName,
    side = 'bottom',
    align = 'start',
    sideOffset = 8,
    disabled = false,
  } = props;

  // Multi-select implementation
  if (props.multiple) {
    const [open, setOpen] = useState(false);
    const selectedValues = props.value || props.defaultValue || [];

    const toggleValue = (itemValue: string) => {
      const newValues = selectedValues.includes(itemValue)
        ? selectedValues.filter(v => v !== itemValue)
        : [...selectedValues, itemValue];
      props.onValueChange(newValues);
    };

    const clearAll = () => {
      props.onValueChange([]);
    };

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            className={`flex items-center justify-between gap-2 focus:outline-none cursor-pointer min-w-[180px] ${triggerClassName ?? 'w-full rounded border border-secondary px-[14px] py-[10px] text-body bg-input shadow-xs'}`}
            disabled={disabled}
          >
            {selectedValues.length > 0 ? (
              <div className="flex gap-2 flex-wrap overflow-auto">
                {selectedValues.map(val => {
                  const item = items.find(i => i.value === val);
                  return (
                    <span
                      key={val}
                      className="text-xs font-semibold flex items-center gap-1 py-0.5 px-2 rounded-full bg-lavender-100 border border-lavender-300"
                    >
                      {item?.label || val}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleValue(val);
                        }}
                      >
                        <Icon icon="x-close" size={14} />
                      </button>
                    </span>
                  );
                })}
              </div>
            ) : (
              <span className="text-placeholder">{placeholder}</span>
            )}
            <Icon
              icon="chevron-down"
              size={16}
              className={`icon-primary transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className={`z-[100] will-change-[opacity,transform] ${contentClassName ?? 'min-w-full rounded border border-secondary bg-input shadow-xs overflow-auto max-h-[300px]'}`}
            side={side}
            align={align}
            sideOffset={sideOffset}
          >
            <div className="flex justify-between items-center border-b border-neutral-200 p-4">
              <span className="text-sm font-medium">{placeholder}</span>
              {selectedValues.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-sm font-bold text-lavender-700"
                >
                  Clear all
                </button>
              )}
            </div>
            <ul className="py-3 px-4 flex flex-col gap-3">
              {items.map((item) => {
                const isSelected = selectedValues.includes(item.value);
                return (
                  <li key={item.value}>
                    <label className="relative flex gap-3 items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleValue(item.value)}
                        className="sr-only"
                      />
                      <span
                        className={`size-4 rounded border flex items-center justify-center ${
                          isSelected
                            ? 'bg-lavender-700 border-lavender-700 text-white'
                            : 'border-neutral-200'
                        }`}
                      >
                        {isSelected && <Icon icon="check" size={14} />}
                      </span>
                      <span className="text-md text-heading font-medium">
                        {item.label}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }

  // Single-select implementation
  return (
    <Select.Root 
      value={props.value} 
      defaultValue={props.defaultValue} 
      onValueChange={props.onValueChange} 
      disabled={disabled}
    >
      <Select.Trigger
        className={`flex items-center justify-between gap-2 focus:outline-none cursor-pointer ${triggerClassName ?? 'text-heading hover:text-headline-hover'}`}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <Icon icon="chevron-down" size={16} className="icon-primary transition-transform" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={`rounded py-2 z-[100] will-change-[opacity,transform] ${contentClassName ?? 'bg-input border border-secondary shadow-xs w-48'}`}
          side={side}
          align={align}
          sideOffset={sideOffset}
          position="popper"
        >
          <Select.Viewport>
            {items.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                className={`flex items-center px-4 py-2 text-sm cursor-pointer rounded outline-none relative
                  ${itemClassName ?? 'text-body'} 
                  hover:bg-rest hover:text-headline-hover focus:bg-rest focus:text-headline-hover
                  data-[state=checked]:${activeItemClassName ?? 'text-primary-headline-emphasis bg-rest/50 font-medium'}`}
              >
                <Select.ItemText>
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                </Select.ItemText>
                <Select.ItemIndicator className="absolute left-2">
                  <Icon icon="check" size={16} className="text-primary-headline-emphasis" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectComponent;
