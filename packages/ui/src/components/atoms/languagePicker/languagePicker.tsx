'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '../icon';

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
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Compute current language from the pathname if not provided
  const pathLang = pathname?.split('/')[1];
  const effectiveCurrentLanguage = currentLanguageProp ?? (pathLang === 'fr' || pathLang === 'de' ? pathLang : 'en');

  const handleLanguageSelect = (languageCode: string) => {
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }

    // Determine the current path without any locale prefix
    let restPath = '/';
    if (pathname) {
      const parts = pathname.split('/'); // ['', 'fr', 'foo', 'bar'] or ['', 'foo', 'bar']
      if (parts[1] === 'fr' || parts[1] === 'de') {
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
    setIsOpen(false);
  };

  const currentLanguageName = languages.find(lang => lang.code === effectiveCurrentLanguage)?.name || 'English';

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center ${compact ? 'gap-0' : 'gap-2'} focus:outline-none ${className ?? 'text-white hover:text-purple-200'}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="sr-only">Select language</span>
        <Icon icon="globe-01" size={20} />
        {!compact && (
          <>
            <span className="text-xl">{currentLanguageName}</span>
            <Icon icon="chevron-down" size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {isOpen && (
        <div 
          className={`absolute left-0 ${dropdownPosition === 'above' ? 'bottom-full mb-2' : 'top-full mt-2'} w-48 rounded-md py-2 focus:outline-none z-[100] ring-1 ${dropdownClassName ?? 'bg-primary ring-border-subtle shadow-elevation'}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
        >
          <div className="py-1">
            {languages.map((language) => {
              const isActive = effectiveCurrentLanguage === language.code;
              return (
                <div key={language.code} className="group">
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm cursor-pointer rounded 
                      ${isActive ? 'text-primary-headline-emphasis bg-rest/50 font-medium' : 'text-body'} 
                      hover:bg-rest hover:text-headline-hover`}
                    onClick={() => handleLanguageSelect(language.code)}
                    role="menuitem"
                  >
                    <span className="flex items-center">
                      {isActive && (
                        <Icon icon="check" size={16} className="mr-2 text-primary-headline-emphasis" />
                      )}
                      <span className={isActive ? 'ml-5' : 'ml-7'}>
                        {language.name}
                      </span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguagePicker;
