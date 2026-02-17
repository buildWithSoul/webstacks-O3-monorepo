import { storyblokEditable, SbBlokData } from "@storyblok/react";
import { RichText } from "../../molecules/richText/richText";
import { twMerge } from "tailwind-merge";
import { Eyebrow, Heading, Button } from "../../atoms";
import { RichTextContent } from "../../../types/storyblok";

interface ContentBlockProps extends SbBlokData {
  blok: {
    _uid: string;
    component: string;
    eyebrow?: string;
    headline?: string;
    content?: RichTextContent;
    subheading?: string;
    buttons?: {
      _uid: string;
      label: string;
      href?: string;
      variant?: "primary" | "secondary";
      target?: string;
    }[];
    layout?: "stacked" | "leading" | "split";
  };
}

export function ContentBlock({ blok }: ContentBlockProps) {
  const { eyebrow, headline, content, buttons, subheading, layout = "stacked" } = blok;

  const layoutClasses = {
    stacked: "max-w-3xl mx-auto text-center",
    leading: "max-w-4xl",
    split: "grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center max-w-6xl mx-auto",
  };

  const buttonContainerClasses = {
    stacked: "flex flex-wrap gap-4 justify-center items-center w-full",
    leading: "flex flex-wrap gap-4 justify-start items-center w-full",
    split: "flex flex-wrap gap-4 justify-start items-center w-full",
  };

  return (
    <section {...storyblokEditable(blok)}>
      <div className={twMerge(layoutClasses[layout])}>
        <div>
          {eyebrow && <Eyebrow text={eyebrow} />}

          {headline && (
            <Heading as="h1" className="text-display-5xl mb-4">
              {headline}
            </Heading>
          )}

          {layout !== "split" && subheading && (
            <p className="text-sm mb-4 text-(--text-body-dark)">
              {subheading}
            </p>
          )}
        </div>

        <div>
          {layout === "split" && subheading && (
            <p className="text-sm mb-4 text-(--text-body-dark)">
              {subheading}
            </p>
          )}

          {content && (
            <RichText
              doc={content}
              className={twMerge(
                layout === "stacked" &&
                  "[&_ul]:w-fit [&_ul]:mx-auto [&_ul]:pl-0"
              )}
            />
          )}

          {buttons && buttons.length > 0 && (
            <div className={twMerge(buttonContainerClasses[layout])}>
              {buttons.map((button, idx) => (
                <Button
                  key={button._uid}
                  href={button.href}
                  mode={"filled"}
                  tone={idx == 0 ? "primary" : "secondary"}
                  target={button.target}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}