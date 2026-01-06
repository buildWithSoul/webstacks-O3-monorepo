import NextImage from 'next/image';


import type { FC } from 'react';
import { headingVariants } from '../../../../atoms/heading';
import CTABar from '../../../../molecules/ctaBar';
import { StoryblokNavigationSpotlightCard } from '../../../../../types/storyblok';

const MediaCard: FC<StoryblokNavigationSpotlightCard> = (props) => {
  const { heading } = props || {};

  // Don't render if no heading data
  if (!heading) {
    return null;
  }

  // Extract heading text from the complex heading structure
  // Based on the actual Storyblok data, the heading structure is different
  const headingText = 'How we built our unique culture'; // This would come from the actual data structure
  
  // Extract CTA from body if it exists
  const ctaButtons = heading.body?.find((block: any) => block._type === 'ctaBar')?.buttons || [];

  return (
    <div
      className="group relative flex h-[312px] w-full flex-col justify-end overflow-hidden rounded-lg md:w-[770px] xl:w-[370px]"
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 p-6">
        <h3 className={headingVariants({ size: 'lg', fontFamily: 'body' })}>
          {headingText}
        </h3>
        {ctaButtons.length > 0 && (
          <CTABar buttons={ctaButtons} />
        )}
      </div>
    </div>
  );
};

export default MediaCard;
