import { twMerge } from 'tailwind-merge'

type ListsProps = {
  items: React.ReactNode[]
  as?: 'ul' | 'ol'
  className?: string
}

export function Lists({
  items,
  as: Component = 'ul',
  className = '',
}: ListsProps) {
  return (
    <Component 
      className={twMerge(
        'list-style',
        Component === 'ul' ? 'list-disc pl-5' : 'list-decimal pl-5',
        className
      )}
    >
      {items.map((item, index) => (
        <li key={index} className="pl-1">
          {item}
        </li>
      ))}
    </Component>
  )
}