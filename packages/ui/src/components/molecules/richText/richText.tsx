'use client';

import type { FC } from 'react';
import { StoryblokServerRichText } from '@storyblok/react/rsc';
import { RichTextContent } from '../../../types/storyblok';

export interface RichTextProps {
  doc?: RichTextContent;
  className?: string;
}

export const RichText: FC<RichTextProps> = ({ doc, className }) => {
  if (!doc) return null;

  return (
    <div className={className}>
      <StoryblokServerRichText doc={doc} />
    </div>
  );
};
