import { cva } from 'class-variance-authority';
import React from 'react';
import Image from 'next/image';
import { storyblokEditable } from '@storyblok/react';

import type { FC } from 'react';
import type { SbBlokData } from '@storyblok/react';

// Storyblok-native props interface
export interface ImageBlockProps extends SbBlokData {
  component: 'imageBlock';
  image?: any; // Support both Sanity and Storyblok image data
  size?: 'full' | 'large' | 'medium' | 'small';
  theme?: 'light' | 'dark';
  responsivePadding?: any;
  htmlId?: string;
  backgroundImage?: any;
  minHeight?: 'none' | 'sm' | 'md' | 'lg';
}

const imageWrapperStyle = cva(['w-full', 'mx-auto'], {
  variants: {
    size: {
      full: '',
      large: 'max-w-[1008px]',
      medium: 'max-w-[768px]',
      small: 'max-w-[576px]',
    },
  },
  defaultVariants: {
    size: 'full',
  },
});

export const ImageBlock: FC<ImageBlockProps> = ({ image, size, ...blok }) => {
  // Helper function to render image for both Sanity and Storyblok (following switchback pattern)
  const renderImage = () => {
    if (!image) return null;
    
    // Check if it's Storyblok data (has filename property) or Sanity data
    if (image && typeof image === 'object' && 'filename' in image) {
      // Storyblok image data (following switchback pattern)
      const filename = image.filename || image.url || '';
      const dimensionMatch = filename.match(/\/(\d+)x(\d+)\//);
      
      const width = dimensionMatch ? parseInt(dimensionMatch[1]) : 1200;
      const height = dimensionMatch ? parseInt(dimensionMatch[2]) : 800;
      
      return (
        <Image
          src={filename}
          alt={image.alt || ''}
          width={width}
          height={height}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          priority={false}
        />
      );
    } else {
      // Sanity image data (existing logic)
      return (
        <Image
          src={image.src}
          alt={image.alt || ''}
          width={image.width || 1200}
          height={image.height || 800}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          priority={false}
        />
      );
    }
  };

  return (
    <div {...storyblokEditable(blok)} className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className={imageWrapperStyle({size})}>
        {renderImage()}
      </div>
    </div>
  );
};