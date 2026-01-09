'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SanityCompany } from '../../../types/sanity';
import { THEME_COLOR_FILTERS } from '../../../lib';
// import { urlForImage } from '@/lib/sanity/client';


/**
 * Custom hook to detect dark mode based on Tailwind's global 'dark' class.
 */
function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

export interface CompanyBrandProps {
  company: SanityCompany;
  className?: string;
  variant?: 'onLight' | 'onDark';
  logoType?: 'logotype' | 'icon' | 'auto';
  priority?: boolean;
  size?: 'sm' | 'smPlus' | 'md' | 'lg';
  forceColor?: 'white' | 'bright' | 'teal' | 'pink' | 'purple';
}

export const CompanyBrand: React.FC<CompanyBrandProps> = ({
  company,
  className,
  priority,
  size = 'md',
  variant,
  logoType = 'auto',
  forceColor,
}) => {
  const companyName = company?.name;
  const isDarkMode = useDarkMode();
  const finalVariant = variant ? variant : isDarkMode ? 'onDark' : 'onLight';

  // Map to actual field names in Sanity schema
  const logotype = finalVariant === 'onLight' ? company?.logoOnLight : company?.logoOnDark;
  const oppositeLogotype = finalVariant === 'onLight' ? company?.logoOnDark : company?.logoOnLight;
  const icon = finalVariant === 'onLight' ? company?.logomarkOnLight : company?.logomarkOnDark;
  const oppositeIcon = finalVariant === 'onLight' ? company?.logomarkOnDark : company?.logomarkOnLight;
  const legacyLogo = company?.logo;

  let logo;
  let applyColor = false;

  if (logoType === 'logotype') {
    logo = logotype;
  } else if (logoType === 'icon') {
    logo = icon;
  } else {
    logo = logotype || icon;
  }

  if (!logo) {
    if (logoType === 'logotype') {
      if (oppositeLogotype) {
        logo = oppositeLogotype;
        applyColor = true;
      }
    } else if (logoType === 'icon') {
      if (oppositeIcon) {
        logo = oppositeIcon;
        applyColor = true;
      }
    } else {
      if (oppositeLogotype) {
        logo = oppositeLogotype;
        applyColor = true;
      } else if (oppositeIcon) {
        logo = oppositeIcon;
        applyColor = true;
      }
    }
  }

  if (!logo) {
    logo = legacyLogo;
  }

  if (forceColor) {
    applyColor = true;
  }

  if (!logo) {
    return null;
  }

  const logoSizes = {
    sm: { width: 96, height: 29 },
    smPlus: { width: 96, height: 29 },
    md: { width: 120, height: 32 },
    lg: { width: 149, height: 40 },
  };
  const logoWidth = size ? logoSizes[size].width : 'auto';
  const logoHeight = size ? logoSizes[size].height : 'auto';

  // Get the appropriate color filter using our theme tokens
  const getColorFilter = (): string => {
    if (!applyColor) return 'none';
    
    if (forceColor === 'bright') {
      return THEME_COLOR_FILTERS.bright; // kiwi-500
    } else if (forceColor === 'teal') {
      return THEME_COLOR_FILTERS.teal; // teal-500 (dark green button color)
    } else if (forceColor === 'pink') {
      return THEME_COLOR_FILTERS.pink; // peach-200
    } else if (forceColor === 'purple') {
      return THEME_COLOR_FILTERS.purple; // lavender-300
    } else {
      return THEME_COLOR_FILTERS.white;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Image
        src={logo?.asset.url || ''}
        alt={logo.alt || `${companyName} logo`}
        width={logoWidth as number}
        height={logoHeight as number}
        priority={priority}
        className={className}
        style={{
          filter: getColorFilter(),
          objectFit: 'contain',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
    </div>
  );
};
