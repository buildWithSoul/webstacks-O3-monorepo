import type { FC, HTMLAttributes } from 'react';

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  as?: 'h6' | 'span' | 'div';
}

export const Eyebrow: FC<EyebrowProps> = ({ 
  text, 
  as = 'h6', 
  className, 
  ...props 
}) => {
  const Component = as;
  
  return (
    <span className={`text-mono-xs font-semibold text-eyebrow  uppercase ${className || ''}`} {...props}>
      <Component className="">{text}</Component>
    </span>
  );
};
