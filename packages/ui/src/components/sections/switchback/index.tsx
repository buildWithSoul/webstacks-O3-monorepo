import Image from "next/image";

import { storyblokEditable } from "@storyblok/react";

import type { FC } from "react";
import type { SbBlokData } from "@storyblok/react";
import { getMedia } from "../../../utils/getMedia";
import { headingContainerStyle, mediaContainerStyle } from "./styles";
import { renderEyebrow, renderHeading } from "../../../utils/headingUtils";
import { StoryblokServerRichText } from "@storyblok/react/rsc";
import { SanityVideo } from "../../../types/sanity";

export interface SwitchbackProps extends SbBlokData {
  heading?: any;
  eyebrow?: any;
  body?: any;
  reverse?: boolean;
  pixelAccent?: boolean;
  mediaType?: "image" | "video";
  image?: any;
  video?: SanityVideo;
  imageAlt?: string;
}

export const Switchback: FC<SwitchbackProps> = ({
  heading,
  eyebrow,
  body,
  reverse = false,
  pixelAccent,
  mediaType,
  image,
  video,
  imageAlt,
  ...blok
}) => {
  // Handle media for Storyblok
  const renderMedia = () => {
    if (mediaType === "image" && image) {
      // Extract dimensions from filename if available (e.g., 4320x2163 from URL)
      const filename = image.filename || image.url || "";
      const dimensionMatch = filename.match(/\/(\d+)x(\d+)\//);

      const width = dimensionMatch ? parseInt(dimensionMatch[1]) : 592;
      const height = dimensionMatch ? parseInt(dimensionMatch[2]) : 475;

      return (
        <Image
          src={filename}
          alt={imageAlt || image.alt || ""}
          width={width}
          height={height}
          className="w-full h-auto rounded-lg object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      );
    }

    if (mediaType === "video" && video) {
      return getMedia({
        mediaType: "video",
        media: video as any,
        aspectRatio: "aspect-[592/475]",
        hasShadow: false,
        playButtonPosition: "bottom-left",
      });
    }

    return null;
  };

  return (
    <div
      {...storyblokEditable(blok)}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className={mediaContainerStyle({ reverse })}>
          <div className="relative">
            {pixelAccent && (
              <img
                src="/images/pixel-image-accent.png"
                alt=""
                className="absolute -bottom-8 -right-8 pointer-events-none -z-10 scale-[1.15]"
              />
            )}
            {renderMedia()}
          </div>
        </div>
        <div className={headingContainerStyle({ reverse })}>
          <div className="flex flex-col gap-4">
            {renderEyebrow(eyebrow)}
            {renderHeading(heading)}
            {body && <StoryblokServerRichText doc={body} />}
          </div>
        </div>
      </div>
    </div>
  );
};
