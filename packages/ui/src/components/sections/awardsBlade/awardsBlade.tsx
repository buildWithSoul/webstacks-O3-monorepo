import Marquee from 'react-fast-marquee';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import { storyblokEditable } from '@storyblok/react';

import type { FC } from 'react';
import { RichText } from '../../molecules/richText/richText';

// Storyblok data types
interface StoryblokAward {
  _uid: string;
  image: {
    id: string;
    filename: string;
    alt?: string;
  };
  alt: string;
  title?: string;
  body?: any;
}

interface StoryblokAwardRow {
  _uid: string;
  cardsPerRow: string;
  awards: StoryblokAward[];
}

interface StoryblokAwardsBlade {
  _uid: string;
  component: string;
  rows?: StoryblokAwardRow[];
}

interface AwardImageProps {
  award: any;
  theme: 'light' | 'dark' | 'bright';
  noPadding?: boolean;
}

const AwardImage: FC<AwardImageProps> = ({ award, theme, noPadding }) => {
  const isDarkTheme = theme === 'dark' || theme === 'bright';
  const hasContent = award.title || award.body;
  
  // Handle image rendering for both Sanity and Storyblok
  const renderAwardImage = () => {
    // Check if it's Storyblok image format (has filename property)
    if ('filename' in award.image) {
      const storyblokImage = award.image as any;
      const filename = storyblokImage.filename || '';
      
      // Extract dimensions from filename if available
      const dimensionMatch = filename.match(/\/(\d+)x(\d+)\//);
      const width = dimensionMatch ? parseInt(dimensionMatch[1]) : 224;
      const height = dimensionMatch ? parseInt(dimensionMatch[2]) : 160;
      
      return (
        <Image
          src={filename}
          alt={award.alt}
          width={width}
          height={height}
          className={twMerge(
            'max-h-full max-w-full object-contain',
            isDarkTheme && 'invert brightness-0'
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      );
    }
    
    // Otherwise, treat as Sanity image format
    return (
      <img
        src={award.image.asset?.url}
        alt={award.alt}
        className={twMerge(
          'max-h-full max-w-full object-contain',
          isDarkTheme && 'invert brightness-0'
        )}
      />
    );
  };
  
  return (
    <div className={twMerge(
      'flex flex-col items-center',
      noPadding ? '' : 'px-4 sm:px-8'
    )}>
      <div className="w-48 h-32 sm:w-56 sm:h-40 flex items-center justify-center">
        {renderAwardImage()}
      </div>
      {hasContent && (
        <div className="mt-4 text-center w-full">
          {award.title && (
            <h4 className={twMerge(
              'text-lg font-semibold mb-2',
              isDarkTheme ? 'text-white' : 'text-heading'
            )}>
              {award.title}
            </h4>
          )}
          {award.body && (
            <div className={twMerge(
              'text-sm',
              isDarkTheme ? 'text-white/80' : 'text-body'
            )}>
              <RichText doc={award.body} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const eyebrowStyles = cva(['text-md font-semibold uppercase tracking-wide'], {
  variants: {
    theme: {
      light: 'text-purple-300',
      dark: 'text-pink-200',
      bright: 'text-white',
    }
  },
  defaultVariants: {
    theme: 'light',
  }
})

const headingStyles = cva(['text-2xl sm:text-3xl font-bold'], {
  variants: {
    theme: {
      light: 'text-heading',
      dark: 'text-white',
      bright: 'text-white',
    }
  },
  defaultVariants: {
    theme: 'light',
  }
})

// Helper function to detect if data is from Storyblok
const isStoryblokData = (data: any): boolean => {
  return data && typeof data === 'object' && '_uid' in data && 'component' in data;
};

// Helper function to transform Storyblok award to Sanity format
const transformStoryblokAward = (storyblokAward: StoryblokAward): any => {
  return {
    image: {
      asset: {
        url: storyblokAward.image.filename
      }
    },
    alt: storyblokAward.alt,
    title: storyblokAward.title,
    body: storyblokAward.body
  } as any;
};

// Helper function to transform Storyblok rows to Sanity format
const transformStoryblokRows = (storyblokRows: StoryblokAwardRow[]): StoryblokAwardRow[] => {
  return storyblokRows.map((row): any => ({
    cardsPerRow: row.cardsPerRow,
    awards: row.awards?.map(transformStoryblokAward) || []
  }));
};

export const AwardsBlade: FC<StoryblokAwardsBlade> = (props) => {
  // Detect if this is Storyblok data and transform if needed
  const isStoryblok = isStoryblokData(props);
  
  let eyebrow: string | undefined,
      heading: string | undefined,
      rows: StoryblokAwardRow[] | undefined,
      variant: 'grid' | 'scroll' | undefined,
      theme: 'light' | 'dark' | 'bright' | undefined,
      inline: boolean | undefined;
  
  if (isStoryblok) {
    // Extract and transform Storyblok data
    const storyblokData = props as StoryblokAwardsBlade;
    eyebrow = undefined; // Not in Storyblok schema
    heading = undefined; // Not in Storyblok schema
    variant = 'grid'; // Default since variant was removed
    theme = (props as any).theme;
    inline = (props as any).inline;
    // Keep raw Storyblok rows for editable overlays
    rows = storyblokData.rows ? transformStoryblokRows(storyblokData.rows) : undefined;
    const rawRows: StoryblokAwardRow[] | undefined = storyblokData.rows;
    const variantSB: 'grid' | 'scroll' = (typeof (props as any).variant === 'string' && (props as any).variant === 'scroll') ? 'scroll' : 'grid';
    // Flatten all awards for marquee using raw Storyblok rows when available
    const allAwards = (rawRows?.flatMap(r => r.awards || []) || []);

    return (
      <div {...(isStoryblok ? storyblokEditable(props as any) : {})} className="flex w-full flex-col gap-6 items-center">
        {(eyebrow || heading) && (
          <div className="flex flex-col gap-2 items-center text-center">
            {eyebrow && <h6 className={eyebrowStyles({theme})}>{eyebrow}</h6>}
            {heading && <h2 className={headingStyles({theme})}>{heading}</h2>}
          </div>
        )}
        {rawRows && (variantSB === 'scroll' ? (
          <div {...{ ...storyblokEditable(props as any), 'data-blok-field': 'rows' }}>
            <Marquee autoFill speed={20} gradientWidth={200}>
              {allAwards.map((award: any, index: number) => (
                <div key={`${award._uid || index}`} {...storyblokEditable(award)} className="inline-block">
                  <AwardImage award={award} theme={theme || 'light'} />
                </div>
              ))}
            </Marquee>
          </div>
        ) : (
          <div {...{ ...storyblokEditable(props as any), 'data-blok-field': 'rows' }} className={twMerge(
            'flex flex-col gap-8 w-full',
            inline ? '' : 'max-w-[1280px] mx-auto'
          )}>
            {rawRows.map((row: any, rowIndex: number) => (
              <div key={row._uid || rowIndex} className="-mx-4">
                <div className="flex flex-wrap w-full justify-center gap-y-8">
                  {row.awards?.map((award: any, index: number) => (
                    <div
                      key={`${award._uid || index}`}
                      className={twMerge(
                        'w-full px-4 grow-0 shrink-0',
                        row.cardsPerRow === '3' ? 'sm:w-1/3 sm:basis-1/3' : 'sm:w-1/2 sm:basis-1/2',
                        row.cardsPerRow === '4' && 'lg:w-1/4 lg:basis-1/4',
                        row.cardsPerRow === '5' && 'lg:w-1/5 lg:basis-1/5',
                        row.cardsPerRow === '6' && 'lg:w-1/6 lg:basis-1/6'
                      )}
                    >
                      <div {...storyblokEditable(award)} className="w-full h-full">
                        <AwardImage award={award} theme={theme || 'light'} noPadding />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  } else {
    // Use Sanity data as-is
    // const sanityData = props as AwardsBladeSection;
    // eyebrow = sanityData.eyebrow;
    // heading = sanityData.heading;
    // variant = sanityData.variant || 'grid';
    // theme = sanityData.theme;
    // inline = sanityData.inline as boolean | undefined;
    // rows = sanityData.rows;
  }
  
  // Sanity rendering path
  const allAwards = rows?.flatMap(row => row.awards || []) || [];
  return (
    <div className="flex w-full flex-col gap-6 items-center">
      {(eyebrow || heading) && (
        <div className="flex flex-col gap-2 items-center text-center">
          {eyebrow && <h6 className={eyebrowStyles({theme})}>{eyebrow}</h6>}
          {heading && <h2 className={headingStyles({theme})}>{heading}</h2>}
        </div>
      )}
      {rows && (variant === 'scroll' ? (
        <Marquee autoFill speed={20} gradientWidth={200}>
          {allAwards.map((award, index) => (
            <AwardImage key={`${index}`} award={award} theme={theme || 'light'} />
          ))}
        </Marquee>
      ) : (
        <div className={twMerge(
          'flex flex-col gap-8 w-full',
          inline ? '' : 'max-w-[1280px] mx-auto'
        )}>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="-mx-4">
              <div className="flex flex-wrap w-full justify-center gap-y-8">
                {row.awards?.map((award, index) => (
                  <div
                    key={index}
                    className={twMerge(
                      'w-full px-4 grow-0 shrink-0',
                      row.cardsPerRow === '3' ? 'sm:w-1/3 sm:basis-1/3' : 'sm:w-1/2 sm:basis-1/2',
                      row.cardsPerRow === '4' && 'lg:w-1/4 lg:basis-1/4',
                      row.cardsPerRow === '5' && 'lg:w-1/5 lg:basis-1/5',
                      row.cardsPerRow === '6' && 'lg:w-1/6 lg:basis-1/6'
                    )}
                  >
                    <AwardImage award={award} theme={theme || 'light'} noPadding />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
