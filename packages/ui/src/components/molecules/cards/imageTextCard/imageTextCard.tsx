import React from "react";
import Image from "next/image";

import type { FC } from "react";

import type { PortableTextBlock } from "@portabletext/types";
import { getLinkData, Link, LinkFragment } from "../../../atoms/link";
import { RichTextContent } from "../../../../types/storyblok";
import { twMerge } from "tailwind-merge";
import { RichText } from "../../richText/richText";

interface StoryblokImage {
  id: string;
  filename: string;
  alt?: string;
}

export interface ImageTextCardProps {
  _key: string;
  image?: StoryblokImage;
  heading?: string;
  body?: RichTextContent;
  link?: LinkFragment;
  button?: any[]; // Storyblok button block
  theme?: "light" | "dark";
}

export const ImageTextCard: FC<ImageTextCardProps> = ({
  image,
  heading,
  body,
  link,
  button,
  theme,
}) => {
  const url = getLinkData(link);
  const linkData = link as any; // Type assertion for union type
  const hasLink = link && linkData.label && url !== "";

  // Check if card has buttons
  const hasButtons = button && button.length > 0;

  const CardContent = (
    <>
      {image && (
        <div className="relative w-full lg:aspect-3/3 aspect-video overflow-hidden shrink-0">
          <Image
            src={image.filename}
            alt={image.alt || ""}
            width={592}
            height={475}
            className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      )}
      <div className="flex w-full flex-col gap-4 grow p-(--padding-24-18-18) bg-(--surface-image-card)">
        <div className="w-full flex flex-col">
          {heading && (
            <span
              className={twMerge(
                "text-(--color-base-white)! text-display-2xl",
                (hasLink || hasButtons) &&
                  "group-hover:text-link-hover transition-colors duration-200"
              )}
            >
              {heading}
            </span>
          )}

          {body && (
            <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 group-hover:mt-4 group-hover:max-h-96 opacity-0 group-hover:opacity-100 will-change-[max-height,opacity]">
              <RichText doc={body} className="text-(--color-base-white)! text-lg" />
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Common wrapper classes with group - optimized transitions
  const wrapperClasses = "group w-full block max-w-[343px] lg:max-w-[309px] hover:max-w-[378px] lg:hover:max-w-[667px] transition-all duration-300 ease-in-out will-change-[max-width]";

  // If there's a link, make the entire card clickable (regardless of buttons)
  if (hasLink) {
    return (
      <Link 
        href={link} 
        className={wrapperClasses}
      >
        <div className="dark flex size-full flex-col transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer will-change-[box-shadow]">
          {CardContent}
        </div>
      </Link>
    );
  }

  // If no link, just return the card content
  return (
    <div className={wrapperClasses}>
      <div className="dark flex size-full flex-col">
        {CardContent}
      </div>
    </div>
  );
};