'use client';

import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import React from 'react';


import type { FC } from 'react';
import type { SbBlokData } from '@storyblok/react';
import { Button } from '../../atoms';

export interface CTABarProps extends SbBlokData {
  buttons?: any[];
  className?: string;
}

const CTABar: FC<CTABarProps> = ({ buttons, className = '', ...blok }) => {
  // Extract data from nested structure that StoryblokComponent provides
  const actualBlok = (blok as any)?.blok || blok;
  const actualButtons = buttons || actualBlok?.buttons;
  
  // Default alignment classes - use justify-center to respect parent centering
  const defaultClasses = 'flex flex-wrap gap-4 justify-center [&_a]:w-fit';
  
  return (
    <div {...storyblokEditable(actualBlok)} className={`${defaultClasses} ${className}`}>
      {actualButtons?.map((button: any) => (
        <Button
          key={button._uid}
          {...button}
          // Pass the entire button object so Button component can extract Storyblok data
        />
      ))}
    </div>
  );
};

export default CTABar;