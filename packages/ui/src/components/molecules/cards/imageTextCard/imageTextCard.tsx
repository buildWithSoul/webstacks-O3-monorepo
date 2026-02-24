import type { FC } from "react";

import { getLinkData, Link, LinkFragment } from "../../../atoms/link";
import { RichTextContent } from "../../../../types/storyblok";
import { twMerge } from "tailwind-merge";
import { RichText } from "../../richText/richText";
import Image from "../../image";

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
  button?: any[];
  theme?: "light" | "dark";
}

export const ImageTextCard: FC<ImageTextCardProps> = ({
  image,
  heading,
  body,
  link,
  button,
}) => {
  const url = getLinkData(link);
  const linkData = link as any;
  const hasLink = link && linkData.label && url !== "";

  const CardContent = (
    <div className="relative w-full h-[430px] overflow-hidden ">
      {image && (
        <div
          className="absolute inset-0 w-full h-full bg-center bg-cover transition-transform duration-300"
          style={{ backgroundImage: `url(${image.filename})` }}
        />
      )}

      <div className="absolute w-full flex flex-col justify-end bg-(--color-navy-primary-900---p) h-fit bottom-0 p-(--padding-24-18-18)">
        {heading && (
          <span
            className={twMerge(
              "text-(--color-base-white)! text-display-2xl",
              "transition-colors duration-200 group-hover:text-link-hover"
            )}
          >
            {heading}
          </span>
        )}

        {body && (
          <div
            className="
      max-h-0
      overflow-hidden
      transition-[max-height]
      duration-300
      ease-out
      group-hover:max-h-[200px]
    "
          >
            <div className="pt-4 opacity-0 transition-opacity duration-200 delay-150 group-hover:opacity-100">
              <RichText
                doc={body}
                className="text-(--color-base-white)! text-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const wrapperClasses =
    "group w-full block   transition-[max-width] duration-300 ease-in-out will-change-[max-width]";

  if (hasLink) {
    return (
      <Link href={link} className={wrapperClasses}>
        <div className="dark flex h-full flex-col cursor-pointer hover:shadow-lg transition-shadow duration-300">
          {CardContent}
        </div>
      </Link>
    );
  }

  return (
    <div className={wrapperClasses}>
      <div className="dark flex h-full flex-col">{CardContent}</div>
    </div>
  );
};
