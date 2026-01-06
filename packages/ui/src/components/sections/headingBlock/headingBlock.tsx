import { cva } from 'class-variance-authority';
import React from 'react';

import { storyblokEditable, renderRichText, StoryblokComponent } from '@storyblok/react';
// import RichText from '@/components/molecules/richText/richText';

import type { FC } from 'react';
import type { SbBlokData } from '@storyblok/react';
import { renderEyebrow, renderHeading } from '../../../utils/headingUtils';

// Legacy function for backward compatibility with other components
export const generateHeadingTag = (
  heading: any,
  style?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | null,
) => [{ ...heading[0], style: style || 'h2' }];

export const containerStyle = cva(['container flex w-full flex-col gap-8 mx-auto'], {
  variants: {
    alignment: {
      center: 'items-center justify-center text-center',
      left: 'justify-start text-start',
    },
  },
  defaultVariants: {
    alignment: 'center',
  },
});

export interface HeadingBlockProps extends SbBlokData {
  eyebrow?: {
    eyebrow?: string;
    elementType?: string;
    icon?: string;
    customIcon?: any;
  };
  heading?: {
    heading?: string;
    elementType?: string;
    fontFamily?: string;
    headingSize?: string;
  };
  body?: string; // Rich text content
  variant?: 'stacked' | 'split' | 'leading';
  alignment?: 'center' | 'left';
  theme?: string;
  responsivePadding?: any;
  backgroundImage?: any;
  minHeight?: string;
  bgGradient?: string;
  htmlId?: string;
}

export const HeadingBlock: FC<HeadingBlockProps> = ({ variant, eyebrow, heading, body, alignment='center', ...blok }) => {
  
  // Render body
  const renderBody = (bodyAlignment?: string) => {
    if (!body) {
      return null;
    }
    
    // Use the unified RichText component for both Sanity and Storyblok
    // Pass alignment to control CTABar alignment
    const alignmentClass = bodyAlignment === 'left' ? 'justify-start' : 'justify-center';
    return  ''
    //  <RichText content={body} className="w-full" ctaAlignment={bodyAlignment} />;
  };

  const eyebrowBlok = Array.isArray(eyebrow) && eyebrow.length > 0 ? eyebrow[0] : undefined;
  const headingBlok = Array.isArray(heading) && heading.length > 0 ? heading[0] : undefined;

  if (variant === 'split') {
    return (heading?.heading || eyebrow?.eyebrow || body) && (
      <div {...storyblokEditable(blok)} className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="container flex w-full flex-col gap-8 mx-auto justify-start text-start">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left column - heading content */}
          <div className="flex flex-col gap-4">
            {eyebrowBlok ? (
              <div {...storyblokEditable(eyebrowBlok)}>
                {renderEyebrow(eyebrowBlok)}
              </div>
            ) : (
              renderEyebrow(eyebrow)
            )}
            {headingBlok ? (
              <div {...storyblokEditable(headingBlok)}>
                {renderHeading(heading)}
              </div>
            ) : (
              renderHeading(heading)
            )}
          </div>
          
          <div {...storyblokEditable(blok)} data-blok-field="body" className="flex flex-col justify-center">
            {renderBody('left')}
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  // Leading variant (left-aligned stacked)
  if (variant === 'leading') {
    return (heading?.heading || eyebrow?.eyebrow || body) && (
      <div {...storyblokEditable(blok)} className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex w-full flex-col gap-8 xl:max-w-[1008px] 2xl:max-w-[1008px]">
        <div className="flex flex-col items-start text-start gap-4">
          {eyebrowBlok ? (
            <div {...storyblokEditable(eyebrowBlok)}>
              {renderEyebrow(eyebrowBlok)}
            </div>
          ) : (
            renderEyebrow(eyebrow)
          )}
          {headingBlok ? (
            <div {...storyblokEditable(headingBlok)}>
              {renderHeading(heading)}
            </div>
          ) : (
            renderHeading(heading)
          )}
          <div className="mt-6">
            <div {...storyblokEditable(blok)} data-blok-field="body">
              {renderBody('left')}
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  // Stacked variant (default)
  return (heading?.heading || eyebrow?.eyebrow || body) && (
    <div {...storyblokEditable(blok)} className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`flex w-full flex-col gap-8 mx-auto ${alignment === 'center' ? 'items-center' : 'items-start'}`}>
        {/* Eyebrow and Heading - 794px max width on desktop */}
        <div className={`flex flex-col gap-4 w-full max-w-[794px] ${alignment === 'center' ? 'text-center items-center' : 'text-start items-start'}`}>
          {eyebrowBlok ? (
            <div {...storyblokEditable(eyebrowBlok)}>
              {renderEyebrow(eyebrowBlok)}
            </div>
          ) : (
            renderEyebrow(eyebrow)
          )}
          {headingBlok ? (
            <div {...storyblokEditable(headingBlok)}>
              {renderHeading(heading)}
            </div>
          ) : (
            renderHeading(heading)
          )}
        </div>
        
        {/* Body - 600px max width */}
        <div {...storyblokEditable(blok)} data-blok-field="body" className={`w-full max-w-[600px] ${alignment === 'center' ? 'text-center flex flex-col items-center' : 'text-start'}`}>
          {renderBody()}
        </div>
      </div>
    </div>
  );
};
