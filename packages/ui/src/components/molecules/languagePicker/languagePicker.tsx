'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '../../atoms';
import Dropdown, { DropdownItem } from '../dropdown';


interface Language {
  code: string;
  name: string;
}

interface LanguagePickerProps {
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
  className?: string;
  dropdownPosition?: 'above' | 'below';
  compact?: boolean; // when true, show only the icon in the trigger
  dropdownClassName?: string; // customize panel theming (bg, ring, shadow) to match megamenu tokens
}

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  currentLanguage: currentLanguageProp,
  onLanguageChange,
  className,
  dropdownPosition = 'above',
  compact = false,
  dropdownClassName,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
  ];

  // Compute current language from the pathname if not provided
  const pathLang = pathname?.split('/')[1];
  const effectiveCurrentLanguage = currentLanguageProp ?? (pathLang === 'fr' ? pathLang : 'en');

  const handleLanguageSelect = (languageCode: string) => {
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }

    // Determine the current path without any locale prefix
    let restPath = '/';
    if (pathname) {
      const parts = pathname.split('/'); // ['', 'fr', 'foo', 'bar'] or ['', 'foo', 'bar']
      if (parts[1] === 'fr') {
        const remainder = parts.slice(2).join('/');
        restPath = '/' + (remainder || '');
      } else {
        restPath = pathname;
      }
    }

    // Preserve search and hash if available on client
    let suffix = '';
    if (typeof window !== 'undefined') {
      const search = window.location.search || '';
      const hash = window.location.hash || '';
      suffix = `${search}${hash}`;
    }

    // Build target relative path
    const targetPath = languageCode === 'en' ? restPath : `/${languageCode}${restPath === '/' ? '' : restPath}`;

    // Client-side navigation
    router.push(`${targetPath}${suffix}`);
  };

  const currentLanguageName = languages.find(lang => lang.code === effectiveCurrentLanguage)?.name || 'English';

  const dropdownItems: DropdownItem[] = languages.map((language) => {
    const isActive = effectiveCurrentLanguage === language.code;
    return {
      key: language.code,
      label: language.name,
      icon: isActive ? <Icon icon="check" size={16} className="mr-2 text-primary-headline-emphasis" /> : undefined,
      isActive,
      onSelect: () => handleLanguageSelect(language.code),
    };
  });

  const trigger = (
    <button
      className={`flex items-center ${compact ? 'gap-0' : 'gap-2'} focus:outline-none cursor-pointer ${className ?? 'text-white hover:text-purple-200'}`}
    >
      <span className="sr-only">Select language</span>
      <Icon icon="globe-01" size={20} />
      {!compact && (
        <>
          <span className="text-xl">{currentLanguageName}</span>
          <Icon icon="chevron-down" size={16} className="transition-transform" />
        </>
      )}
    </button>
  );

  return (
    <Dropdown
      trigger={trigger}
      items={dropdownItems}
      side={dropdownPosition === 'above' ? 'top' : 'bottom'}
      align="start"
      sideOffset={8}
      contentClassName={`w-48 ${dropdownClassName ?? 'bg-primary ring-border-subtle shadow-elevation'}`}
      modal={false}
    />
  );
};

export default LanguagePicker;
