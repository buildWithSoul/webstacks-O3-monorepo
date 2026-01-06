import type { FC, HTMLAttributes } from 'react';

export interface TopicTagProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  variant?: 'default' | 'muted' | 'accent';
}

export const TopicTag: FC<TopicTagProps> = ({ 
  text, 
  variant = 'default',
  className, 
  ...props 
}) => {
  const variantClasses = {
    default: 'border-[var(--borderColor-default)] text-[var(--fgColor-onEmphasis)]',
    muted: 'border-[var(--borderColor-muted)] text-[var(--fgColor-muted)]',
    accent: 'border-[var(--borderColor-accent-muted)] text-[var(--fgColor-accent)]'
  };
  
  return (
    <span 
      className={`px-2 py-1 border rounded text-sm font-medium ${variantClasses[variant]} ${className || ''}`} 
      {...props}
    >
      {text}
    </span>
  );
};
