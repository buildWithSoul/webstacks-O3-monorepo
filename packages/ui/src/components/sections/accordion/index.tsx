
import { storyblokEditable } from '@storyblok/react';



import type { FC } from 'react';
import type { SbBlokData } from '@storyblok/react';
import { AccordionItemProps } from '@radix-ui/react-accordion';
import { renderEyebrow, renderHeading } from '../../../utils/headingUtils';
import { RichText } from '../../molecules/richText/richText';
import { generateHeadingTag } from '../headingBlock/headingBlock';
import { Eyebrow } from '../../atoms';
import AccordionOrganism from '../../molecules/accordion';
import { getFaqSchema } from './utils/getFaqSchema';
import { containerStyle, headingContainerStyle } from './styles';
import { CTABar } from '../../molecules';

// Storyblok-native props interface
export interface AccordionProps extends SbBlokData {
  component: 'accordion';
  heading?: any;
  eyebrow?: any;
  body?: any;
  ctaBar?: any;
  items?: AccordionItemProps[] | any[]; // Support both Sanity and Storyblok items
  layout?: 'stack' | 'split';
}

export const Accordion: FC<AccordionProps> = ({ heading, eyebrow, body, ctaBar, items, layout, ...blok }) => {
  // Helper function to render heading for both Sanity and Storyblok
  const renderHeadingContent = () => {
    if (!heading) return null;
    
    // Check if it's Storyblok data (array of bloks) or Sanity data (object)
   
      // Storyblok heading blok - use the same utility as headingBlock
      return (
        <div {...storyblokEditable(heading[0])} className="w-full">
          {renderHeading(heading[0])}
        </div>
      );
    


  };

  // Helper function to render eyebrow for both Sanity and Storyblok
  const renderEyebrowContent = () => {
    if (!eyebrow) return null;
    
    // Check if it's Storyblok data (array of bloks) or Sanity data (object)
    if (Array.isArray(eyebrow) && eyebrow.length > 0) {
      // Storyblok eyebrow blok - use the same utility as headingBlock
      return (
        <div {...storyblokEditable(eyebrow[0])} className="w-full">
          {renderEyebrow(eyebrow[0])}
        </div>
      );
    } else {
      // Sanity eyebrow data
      return (
        <Eyebrow
          text={eyebrow.eyebrow}
          as={(eyebrow.elementType || 'h6') as 'h6' | 'span' | 'div'}
        />
      );
    }
  };

  // Helper function to render body for both Sanity and Storyblok
  const renderBody = () => {
    if (!body) return null;
    
    // Check if it's Storyblok data (has type property) or Sanity data (array)
    if (body && typeof body === 'object' && 'type' in body) {
      // Storyblok rich text data (includes embedded CTA bar)
      return (
        <div {...storyblokEditable(blok)} data-blok-field="body" className="w-full">
          <RichText doc={body} />
        </div>
      );
    } else {
      // Sanity PortableText data
      return <RichText doc={body} />;
    }
  };

  // Helper function to render accordion items for both Sanity and Storyblok
  const renderAccordionItems = () => {
    if (!items) return null;
    
    // Check if it's Storyblok data (array of bloks) or Sanity data
    if (Array.isArray(items) && items.length > 0 && items[0] && typeof items[0] === 'object' && 'component' in items[0]) {
      // Storyblok accordion items
      const storyblokItems = items.map((item: any) => ({
        _type: 'accordionItem',
        _key: item._uid, // Storyblok uses _uid for unique ID
        label: item.label,
        content: item.content // Storyblok rich text content
      }));
      return (
        <div {...storyblokEditable(blok)} data-blok-field="items" className="w-full lg:flex-1">
          <AccordionOrganism items={storyblokItems} />
        </div>
      );
    } else {
      // Sanity accordion items
      return <AccordionOrganism items={items} />;
    }
  };

  // Generate FAQ schema for both data types
  const itemsForSchema = Array.isArray(items) && items.length > 0 && items[0] && typeof items[0] === 'object' && 'component' in items[0]
    ? items.map((item: any) => ({ label: item.label, content: item.content }))
    : items;
  
  const faqSchema = itemsForSchema && getFaqSchema(itemsForSchema);

  return (
    <div {...storyblokEditable(blok)} className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      {faqSchema && Object.keys(faqSchema).length && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
      <div className={containerStyle({layout})}>
        {(heading || eyebrow || body) &&
          <div className={headingContainerStyle({layout})}>
            {renderEyebrowContent()}
            {renderHeadingContent()}
            {renderBody()}
            {/* Note: CTA bar is now embedded in the body rich text for Storyblok */}
            {ctaBar?.buttons && !body && (
              <CTABar buttons={ctaBar.buttons} className="justify-center mt-6" />
            )}
          </div>}
        {renderAccordionItems()}
      </div>
    </div>
  );
};

