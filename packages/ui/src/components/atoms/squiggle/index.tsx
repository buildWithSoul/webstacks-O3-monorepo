'use client';
import NextImage from 'next/image';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import type { FC, CSSProperties} from 'react';

interface SquiggleProps {
  alignment?: 'left' | 'right';
}

const Squiggle: FC<SquiggleProps> = ({
  alignment,
}) => {
  const imageRef = useRef(null);
  // Hardcoded positions to prevent layout shift
  const startPos = -10;
  const endPos = -10;

  return (
    <NextImage
      ref={imageRef}
      src={`/background/squig-0${alignment === 'left' ? '1' : '2'}.gif`}
      width="196"
      height="400"
      alt=""
      className={
        twMerge(
          'hidden absolute w-9 -top-8 filter-pattern transition-opacity sm:block opacity-100',
          alignment === 'left' ? 'rotate-[26deg] left-(--start-pos)' : '-rotate-[40deg] right-(--end-pos)'
        )
      }
      style={{
        '--start-pos': `${startPos}px`,
        '--end-pos': `${endPos}px`,
      } as CSSProperties}
    />
  );
}

export default Squiggle;
