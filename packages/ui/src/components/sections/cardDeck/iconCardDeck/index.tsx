
import { storyblokEditable } from '@storyblok/react';

import type { FC } from 'react';
import type { SbBlokData } from '@storyblok/react';
import { IconTextCard, IconTextCardProps } from '../../../molecules';
import { Eyebrow } from '../../../atoms';
import { RichText } from '../../../molecules/richText/richText';
import { renderEyebrow, renderHeading } from '../../../../utils/headingUtils';

interface IconCardRow {
  cardsPerRow?: string;
  cards?: IconTextCardProps[];
}

// Storyblok-native props interface
export interface IconCardDeckProps extends SbBlokData {
  component: 'iconCardDeck';
  heading?: any;
  eyebrow?: any;
  body?: any;
  rows?: IconCardRow[];
  theme?: 'light' | 'dark';
  responsivePadding?: any;
  htmlId?: string;
  backgroundImage?: any;
  minHeight?: 'none' | 'sm' | 'md' | 'lg';
}

export const IconCardDeck: FC<IconCardDeckProps> = ({ heading, eyebrow, body, rows, theme, ...blok }) => {
  return (
    <div {...storyblokEditable(blok)} className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col gap-12 sm:gap-16">
      {(heading?.heading || eyebrow?.eyebrow || (body && body.length > 0)) &&
        <div className="max-w-[1008px] mx-auto">
          <div className="flex flex-col items-center gap-4">
            {Array.isArray(eyebrow) && eyebrow.length > 0 ? (
              <div {...storyblokEditable(eyebrow[0])}>{renderEyebrow(eyebrow[0])}</div>
            ) : (
              eyebrow?.eyebrow && (
                <Eyebrow
                  text={eyebrow.eyebrow} 
                  as={(eyebrow.elementType || 'h6') as 'h6' | 'span' | 'div'}
                />
              )
            )}
            {Array.isArray(heading) && heading.length > 0 ? (
              <div {...storyblokEditable(heading[0])}>{renderHeading(heading)}</div>
            ) : (
              heading?.heading && renderHeading(heading)
            )}
            {body && (
              <div {...storyblokEditable(blok)} data-blok-field="body">
                <RichText doc={body}/>
              </div>
            )}
          </div>
        </div>
      }
      {rows && (
        <div {...storyblokEditable(blok)} data-blok-field="rows" className="flex flex-col gap-8">
          {rows.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              className={`grid w-full grid-cols-1 gap-8 justify-items-center ${
                row.cardsPerRow === '2' ? 'sm:grid-cols-2' :
                row.cardsPerRow === '3' ? 'sm:grid-cols-2 lg:grid-cols-3' :
                'sm:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {row.cards?.map((item, i) => {
                const key = (item as any)?._uid || (item as any)?._key || i;
                const card = <IconTextCard {...(item as any)} theme={theme} />;
                return ((item as any) && typeof item === 'object' && 'component' in (item as any)) ? (
                  <div key={key} {...storyblokEditable(item as any)} className="w-full h-full">
                    {card}
                  </div>
                ) : (
                  <div key={key} className="w-full h-full">{card}</div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

