import { renderRichText } from "@storyblok/react";
import { Heading, headingVariants } from "../components/atoms/heading";
import { Eyebrow } from "../components";
import { RichText } from "../components/molecules/richText/richText";

/**
 * Renders eyebrow content with proper styling
 */
export const renderEyebrow = (blok: any) => {
  if (!blok?.eyebrow) {
    return null;
  }

  return <Eyebrow {...blok} />;
};

/**
 * Renders heading content with proper styling and variants
 */
export const renderHeading = (heading: any) => {
  if (!heading) {
    return null;
  }

  return (
    <Heading
      as={heading.elementType || "h2"}
      headingSize={heading.headingSize || "4xl"}
      fontFamily={heading.fontFamily || "display"}
      heading={heading.heading}
    >
    </Heading>
  );
};
