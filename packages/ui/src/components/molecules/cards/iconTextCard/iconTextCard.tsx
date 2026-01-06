import React from 'react';
import { twMerge } from 'tailwind-merge';



import type { FC } from 'react';
import { Button, Icon } from '../../../atoms';

export interface IconTextCardProps {
  _key: string;
  icon?: string;
  heading?: string;
  body?: any; // Storyblok rich text data
  button?: any[]; // Storyblok button block
  theme?: 'light' | 'dark' | 'sugar' | 'bright';
}

export const IconTextCard: FC<IconTextCardProps> = ({ icon, heading, body, button, theme }) => {
  // Check if card has a button with label
  const hasButton = button && button[0] && button[0].label;

  const CardContent = (
    <div className={twMerge(
      'flex h-full w-full flex-col gap-8 p-6 bg-secondary-background rounded-2xl transition-all duration-200',
      hasButton && 'group hover:shadow-lg cursor-pointer',
      theme === 'sugar' && 'hover:bg-white'
    )}>
      {icon && (
        <div className="dark icon-primary">
          <Icon icon={icon} size={36} />
        </div>
      )}
      <div className="flex w-full flex-col gap-4">
        {heading && (
          <span className={`dark font-bold text-heading text-display-md transition-colors duration-200 ${hasButton ? 'group-hover:text-link-hover' : ''}`}>
            {heading}
          </span>
        )}
        {body && (
          <div className="dark text-body [&_ul]:marker:text-teal-500 [&_ol]:marker:text-teal-500 dark:[&_ul]:marker:text-sugar dark:[&_ol]:marker:text-sugar">
            {/* <RichText content={body} className="[&_p]:mb-0" /> */}
          </div>
        )}
      </div>
      {hasButton && (
        <div className="mt-auto flex justify-start">
          <Button
            {...button[0]}
            className='dark'
          />
        </div>
      )}
    </div>
  );

  return CardContent;
};
