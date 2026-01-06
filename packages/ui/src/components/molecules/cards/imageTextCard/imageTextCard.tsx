import React from 'react';
import Image from 'next/image';



import type { FC } from 'react';

import type { PortableTextBlock } from '@portabletext/types';
import { getLinkData, Link, LinkFragment } from '../../../atoms/link';
import { Button, Icon } from '../../../atoms';

interface StoryblokImage {
  id: string;
  filename: string;
  alt?: string;
}

export interface ImageTextCardProps {
  _key: string;
  image?: StoryblokImage;
  heading?: string;
  body?: PortableTextBlock[];
  link?: LinkFragment;
  button?: any[]; // Storyblok button block
  theme?: 'light' | 'dark' | 'sugar' | 'bright';
}

export const ImageTextCard: FC<ImageTextCardProps> = ({ image, heading, body, link, button, theme }) => {
  const url = getLinkData(link);
  const linkData = link as any; // Type assertion for union type
  const hasLink = link && linkData.label && url !== '';
  
  // Check if card has a button with label
  const hasButton = button && button[0] && button[0].label;
  
  const CardContent = (
    <div className={`dark flex size-full flex-col gap-2 bg-secondary-background rounded-2xl ${
      (hasLink || hasButton) ? 'group transition-all duration-200 hover:shadow-lg cursor-pointer' : ''
    }`}>
      {image && (
        <div className="relative w-full aspect-video overflow-hidden shrink-0 rounded-t-2xl">
          <Image
            src={image.filename}
            alt={image.alt || ''}
            width={592}
            height={475}
            className="absolute inset-0 size-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      )}
      <div className="flex w-full flex-col gap-4 grow p-6">
        <div className="w-full flex flex-col gap-4">
          {heading && (
            <span className={`font-bold text-heading text-display-md ${
              (hasLink || hasButton) ? 'group-hover:text-link-hover transition-colors duration-200' : ''
            }`}>
              {heading}
            </span>
          )}
          {body && (
            <div className="text-body">
              {/* <RichText blocks={body} /> */}
            </div>
          )}
        </div>
        
        {/* Render button if available */}
        {hasButton && (
          <div className="mt-auto">
            <Button {...button[0]} />
          </div>
        )}
        
        {/* Fallback to link if no button */}
        {linkData?.label && !hasButton && (
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-lg font-semibold text-link group-hover:text-link-hover transition-colors duration-200">
              {linkData.label}
            </span>
            {url !== '' &&
              <Icon 
                icon="arrow-right-alt" 
                size={20} 
                strokeWidth={0} 
                className="icon-link group-hover:icon-link-hover transition-colors duration-200" 
              />}
          </div>
        )}
      </div>
    </div>
  );

  // If there's a link and no button, make the entire card clickable
  if (hasLink && !hasButton) {
    return (
      <Link href={link} className="block w-full">
        {CardContent}
      </Link>
    );
  }

  // If no link or has button, just return the card content
  return CardContent;
};
