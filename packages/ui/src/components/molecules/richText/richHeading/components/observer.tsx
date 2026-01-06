'use client';

import type { FC, ReactNode } from 'react';

interface HeadingObserverProps {
  headingId: string;
  children: ReactNode;
}

/**
 * HeadingObserver is a simple wrapper component.
 * The TableOfContents component handles scroll tracking internally,
 * so this component just passes through children without additional observation logic.
 */
const HeadingObserver: FC<HeadingObserverProps> = ({ headingId, children }) => {
  return <>{children}</>;
};

export default HeadingObserver;
