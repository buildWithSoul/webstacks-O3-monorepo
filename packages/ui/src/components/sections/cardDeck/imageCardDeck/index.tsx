import { storyblokEditable } from "@storyblok/react";
import type { FC } from "react";
import type { SbBlokData } from "@storyblok/react";

import { ImageTextCard, ImageTextCardProps } from "../../../molecules";
import { renderEyebrow, renderHeading } from "../../../../utils/headingUtils";
import { RichText } from "../../../molecules/richText/richText";

interface ImageCardRow {
  cardsPerRow?: string;
  cards?: ImageTextCardProps[];
}

export interface ImageCardDeckProps extends SbBlokData {
  component: "imageCardDeck";
  heading?: any[];
  eyebrow?: any[];
  body?: any;
  rows?: ImageCardRow[];
  theme?: "light" | "dark" | "sugar" | "bright";
  responsivePadding?: any;
  htmlId?: string;
  backgroundImage?: any;
  minHeight?: "none" | "sm" | "md" | "lg";
}

export const ImageCardDeck: FC<ImageCardDeckProps> = ({
  heading,
  eyebrow,
  body,
  rows,
  theme,
  ...blok
}) => {
  const hasHeaderContent =
    heading?.length || eyebrow?.length || body;

  return (
    <div
      {...storyblokEditable(blok)}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-12 sm:gap-16">
        {hasHeaderContent && (
          <div className="max-w-252 mx-auto">
            <div className="flex flex-col items-center gap-4 text-center">
              {eyebrow?.[0] && (
                <div {...storyblokEditable(eyebrow[0])}>
                  {renderEyebrow(eyebrow[0])}
                </div>
              )}

              {heading?.[0] && (
                <div {...storyblokEditable(heading[0])}>
                  {renderHeading(heading[0])}
                </div>
              )}

              {body && (
                <div
                  {...storyblokEditable(blok)}
                  data-blok-field="body"
                  className="max-w-180"
                >
                  <RichText doc={body} />
                </div>
              )}
            </div>
          </div>
        )}

        {rows && (
          <div
            {...storyblokEditable(blok)}
            data-blok-field="rows"
            className="flex flex-col gap-8"
          >
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid w-full gap-8 justify-items-center
                  grid-cols-1
                  sm:grid-cols-2
                  ${
                    row.cardsPerRow === "3"
                      ? "lg:grid-cols-3"
                      : row.cardsPerRow === "4"
                      ? "lg:grid-cols-4"
                      : ""
                  }
                `}
              >
                {row.cards?.map((item, i) => {
                  const key =
                    (item as any)?._uid ||
                    (item as any)?._key ||
                    i;

                  const card = (
                    <ImageTextCard
                      {...(item as any)}
                      theme={theme}
                    />
                  );

                  return (item as any)?.component ? (
                    <div
                      key={key}
                      {...storyblokEditable(item as any)}
                      className="w-full h-full"
                    >
                      {card}
                    </div>
                  ) : (
                    <div key={key} className="w-full h-full">
                      {card}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
