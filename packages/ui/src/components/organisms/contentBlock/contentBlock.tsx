import { storyblokEditable, SbBlokData } from "@storyblok/react";
import { RichText } from "../../molecules/richText/richText";
import { twMerge } from "tailwind-merge";
import { Eyebrow, Heading, Button, EyebrowBlockProps } from "../../atoms";
import { RichTextContent } from "../../../types/storyblok";
import { ButtonProps } from "../../atoms/button";

interface ContentBlockProps extends SbBlokData {
  blok: {
    eyebrow?: EyebrowBlockProps[];
    heading?:string;
    content?: RichTextContent;
    subheading?: string;
    buttons?: ButtonProps[];
    layout?: "stacked" | "leading" | "split";
  };
}

export function ContentBlock({ blok }: ContentBlockProps) {
  const {
    eyebrow,
    heading,
    content,
    buttons,
    subheading,
    layout = "stacked",
  } = blok;

  const layoutClasses = {
    stacked: "mx-auto text-center",
    leading: "",
    split:
      "grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center",
  };

  const buttonContainerClasses = {
    stacked: "flex flex-wrap gap-4 justify-center items-center w-full",
    leading: "flex flex-wrap gap-4 justify-start items-center w-full",
    split: "flex flex-wrap gap-4 justify-start items-center w-full",
  };

  return (
    <div {...storyblokEditable(blok)}>
      <div className={twMerge(layoutClasses[layout], 'max-w-(--widths-1280-704-343) mx-auto')}>
        <div>
          {eyebrow && eyebrow.length > 0 && <Eyebrow {...eyebrow[0]} />}

          {heading && (
            <Heading as="h1" heading={heading} className="text-display-5xl mb-4"/>
             
          )}

          {layout !== "split" && subheading && (
            <p className="text-sm mb-4 text-(--text-body-dark)">{subheading}</p>
          )}
        </div>

        <div>
          {layout === "split" && subheading && (
            <p className="text-sm mb-4 text-(--text-body-dark)">{subheading}</p>
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
    </div>
  );
}
