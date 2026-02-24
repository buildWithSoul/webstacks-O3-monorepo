import { storyblokEditable, SbBlokData } from "@storyblok/react";
import type { FC } from "react";


export interface EyebrowBlockProps extends SbBlokData {
  eyebrow: string;
  elementType?: "h6" | "div" | 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

export const Eyebrow: FC<EyebrowBlockProps> = ({
  eyebrow,
  elementType = "h6",
  ...blok
}) => {
  const Component = elementType;
  return (
    <span
      {...storyblokEditable(blok)}
      className={
        "text-mono-xs font-medium text-(--text-eyebrow) uppercase"}
    >
      <Component>{eyebrow}</Component>
    </span>
  );
};
