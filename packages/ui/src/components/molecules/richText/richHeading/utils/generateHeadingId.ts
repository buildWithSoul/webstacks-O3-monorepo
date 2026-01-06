

import type { ReactNode } from 'react';
import reactNodeToString from '../../../../../utils/strings/reactNodeToString';
import { generateSlug } from '../../../../../utils/slugs';

export const generateHeadingId = (children: ReactNode) => {
  const headingText = reactNodeToString(children);
  if (!headingText) return '';
  
  const slug = generateSlug(headingText);
  // Add toc- prefix to match TableOfContents expectations
  return `toc-${slug}`;
};
