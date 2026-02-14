import { twMerge } from 'tailwind-merge'
import { Icon } from '../../atoms'
import { ButtonHTMLAttributes } from 'react'

type TabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string
  active?: boolean
  size?: 's' | 'l'
  showIcon?: boolean
}

export function Tab({
  title,
  active = true,
  size = 'l',
  showIcon = false,
  className,
  ...props
}: TabProps) {
  return (
    <button
      type="button"
      className={twMerge( 
        'w-100 flex items-center',
        'border-b',
        'transition-colors',
        active
          ? 'text-(--text-headings) border-(--stroke-primary)'
          : 'text-(--text-disabled) border-(--stroke-card)',
        size === 'l'
          ? 'py-3 px-4'
          : '',
        showIcon 
        ? 'justify-between' 
         : 'justify-center',
        className,
      )}
      {...props}
    >
      <span className='text-center'>{title}</span>

      {showIcon && (
        <Icon
          icon={active ? 'chevron-up' : 'chevron-down'}
          className={twMerge(
            'shrink-0 transition-transform',
             'text-(--icon-primary)'
          )}
        />
      )}
    </button>
  )
}