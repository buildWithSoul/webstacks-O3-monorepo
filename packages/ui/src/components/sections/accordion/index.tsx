import { storyblokEditable } from "@storyblok/react";
import type { FC } from "react";
import type { SbBlokData } from "@storyblok/react";

import { renderEyebrow, renderHeading } from "../../../utils/headingUtils";
import { RichText } from "../../molecules/richText/richText";
import { getFaqSchema } from "./utils/getFaqSchema";
import { containerStyle, headingContainerStyle } from "./styles";
import { CTABar } from "../../molecules";
import { AccordionItem } from "../../organisms";
import type { AccordionItem as AccordionItemProps} from "../../organisms/accordion/accordion";

export interface AccordionProps extends SbBlokData {
  component: "accordion";
  heading?: any[];
  eyebrow?: any[];
  body?: any;
  ctaBar?: any;
  items?: AccordionItemProps[];
  layout?: "stack" | "split";
}

export const Accordion: FC<AccordionProps> = ({
  heading,
  eyebrow,
  body,
  ctaBar,
  items,
  layout,
  ...blok
}) => {
  const renderHeadingContent = () => {
    if (!heading?.length) return null;

    return (
      <div {...storyblokEditable(heading[0])} className="w-full">
        {renderHeading(heading[0])}
      </div>
    );
  };

  const renderEyebrowContent = () => {
    if (!eyebrow?.length) return null;

    return (
      <div {...storyblokEditable(eyebrow[0])} className="w-full">
        {renderEyebrow(eyebrow[0])}
      </div>
    );
  };

  const renderBody = () => {
    if (!body) return null;

    return (
      <div
        {...storyblokEditable(blok)}
        data-blok-field="body"
        className="w-full"
      >
        <RichText doc={body} />
      </div>
    );
  };

  const renderAccordionItems = () => {
    if (!items?.length) return null;

    return (
      <div
        {...storyblokEditable(blok)}
        data-blok-field="items"
        className="w-full lg:flex-1"
      >
        <AccordionItem items={items} />
      </div>
    );
  };
  

  const faqSchema =
    items?.length &&
    getFaqSchema(
      items.map((item: any) => ({
        _uid:item._uid,
        title: item.label,
        content: item.content,
      }))
    );

  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-(--surface-background) max-w-(--widths-1440-834-375) mx-auto  section-padding-xl"
    >
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}

      <div className={containerStyle({ layout })}>
  

        {(heading || eyebrow || body) && (
          <div className={headingContainerStyle({ layout })}>
            {renderEyebrowContent()}
            {renderHeadingContent()}
            {renderBody()}

            {!body && ctaBar?.buttons && (
              <CTABar
                buttons={ctaBar.buttons}
                className="justify-center mt-6"
              />
            )}
          </div>
        )}

        {renderAccordionItems()}
      </div>
    </section>
  );
};
