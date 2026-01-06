import { renderRichText as storyblokRenderRichText, type StoryblokRichTextNode } from '@storyblok/react';
import React from 'react';

// Custom renderRichText function that returns HTML string with component placeholders
export const renderRichText = (data: StoryblokRichTextNode | null | undefined, options?: any) => {
  if (!data) return '';
  
  return storyblokRenderRichText(data, {
    ...options,
    // Add any custom options here if needed
  });
};

// Render rich text with React components (for when you need actual React components)
export const renderRichTextWithComponents = (data: StoryblokRichTextNode | null | undefined) => {
  if (!data) return null;
  
  const html = storyblokRenderRichText(data) || '';
  
  // For now, return as HTML. In the future, you could parse this and replace
  // component placeholders with actual React components
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default renderRichText;
