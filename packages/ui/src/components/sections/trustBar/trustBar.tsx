'use client';
import Marquee from 'react-fast-marquee';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';


import type { FC } from 'react';
import { SanityCompany, SanityPageContent } from '../../../types/sanity';
import { CompanyBrand } from '../../atoms';

interface LogoProps {
  company: SanityCompany;
  theme: 'light' | 'dark' | 'bright';
  noPadding?: boolean;
}
interface TrustBarRow {
  companies?: SanityCompany[];
}

interface TrustBarSection extends SanityPageContent {
  _type: 'trustBar';
  variants?: string;
  eyebrow?: string;
  rows?: TrustBarRow[];
}

const Logo: FC<LogoProps> = ({ company, theme, noPadding }) => {
  return (
    <div className={noPadding ? '' : 'px-4 sm:px-8'}>
      <div className="w-24 h-7 sm:w-36 sm:h-12 flex items-center justify-center">
        <CompanyBrand
          company={company}
          variant={theme === 'light' ? 'onLight' : 'onDark'}
          size="sm"
          className="max-h-full max-w-full object-contain"
          forceColor={theme === 'bright' ? 'white' : theme === 'light' ? 'teal' : 'pink'}
        />
      </div>
    </div>
  );
};

const eyebrowStyles = cva(['text-md font-semibold'], {
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

export const TrustBar: FC<TrustBarSection> = ({ eyebrow, rows, variants, theme, inline }) => {
  // For scroll variant, flatten all companies from all rows
  const allCompanies = rows?.flatMap(row => row.companies || []);
  
  return (
    <div className="flex w-full flex-col gap-4 items-center">
      {eyebrow && <h6 className={eyebrowStyles({theme})}>{eyebrow}</h6>}
      {rows && rows.length > 0 && (variants === 'scroll' ? (
        <Marquee
          autoFill
          speed={20}
          gradientWidth={200}
        >
          {allCompanies?.map(company => (
            <Logo key={company._id} company={company} theme={theme || 'light'} />
          ))}
        </Marquee>
      ) : (
        <div className="flex flex-col gap-8 sm:gap-12">
          {rows.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
            >
              {row.companies?.map(company => (
                <Logo key={company._id} company={company} theme={theme || 'light'} noPadding />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
