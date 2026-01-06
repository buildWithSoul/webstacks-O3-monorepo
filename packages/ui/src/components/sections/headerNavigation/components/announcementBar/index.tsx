import { cva } from 'class-variance-authority';



import type { FC } from 'react';
import { Icon, Link } from '../../../../atoms';

// Define the HeaderNavigationData interface
interface AnnouncementProps {
  announcement?: string;
  announcementLink?: any; // Storyblok button object
  announcementIcon?: string;
  signInLink?: any;
  showUtilityBar?: boolean;
  theme?: 'subtle' | 'high-contrast';
  isDarkSection?: boolean;
  isScrolled?: boolean;
}

const styles = cva('hidden w-full overflow-visible transition-[max-height,opacity,background-color,border-color,color] duration-300 ease-in-out lg:block', {
  variants: {
    variant: {
      'subtle-light': 'bg-sugar border-b border-secondary',
      'subtle-dark': 'bg-teal-500 border-b border-secondary',
      'high-contrast-light': 'bg-teal-500 border-b border-primary',
      'high-contrast-dark': 'bg-kiwi-500 border-b border-primary',
    },
  },
  defaultVariants: {
    variant: 'subtle-light',
  }
})


export const AnnouncementBar: FC<AnnouncementProps> = ({ announcement, announcementLink, showUtilityBar, announcementIcon, signInLink, theme = 'subtle', isDarkSection = false, isScrolled = false }) => {
  // When scrolled, header becomes light, so treat as light section
  const effectiveDarkSection = isDarkSection && !isScrolled;
  
  // Determine the actual variant to use
  const variant = theme === 'subtle' 
    ? (effectiveDarkSection ? 'subtle-dark' : 'subtle-light')
    : (effectiveDarkSection ? 'high-contrast-dark' : 'high-contrast-light');

  // Determine if we're using a dark background (teal bg needs white text)
  // high-contrast-dark (kiwi bg) needs dark text, so isDarkBg should be false
  const isDarkBg = variant === 'high-contrast-light' || variant === 'subtle-dark';

  return (
  <div
    id="announcementBar"
    className={`${styles({ variant })} ${isDarkBg ? 'dark' : ''}`}
    aria-hidden={!showUtilityBar}
  >
    <div
      className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:items-center sm:justify-between gap-6 sm:flex-row`}
    >
      <div className="min-w-0 text-base leading-6">
        <div className="flex flex-col sm:items-center gap-4 sm:flex-row">
          {announcementIcon &&
            <div className="sm:w-6 sm:basis-6 sm:shrink-0">
              <Icon
                icon={announcementIcon} 
                size={24}
                spriteType={announcementIcon.startsWith('brand-') ? 'brand' : 'ui'}
              />
            </div>}
          <div className="flex flex-wrap gap-y-2 gap-x-6">
            {announcement && (
              <p className={`[&_p]:m-0 [&_a]:underline text-sm ${isDarkBg ? 'text-heading' : 'text-teal-900'}`}>
                {announcement}
              </p>
            )}
            {announcementLink?.label && (
              <Link 
                href={announcementLink.internalLink?.cached_url || announcementLink.externalUrl || '#'}
                className={`group flex items-center gap-2 transition-colors duration-200 ${isDarkBg ? 'text-link hover:text-link-hover' : 'text-teal-500 hover:text-teal-800'}`}
                target={announcementLink.openInNewTab ? '_blank' : '_self'}
              >
                <span className="text-sm font-semibold whitespace-nowrap">
                  {announcementLink.label}
                </span>
                <Icon 
                  icon="arrow-right-alt" 
                  size={16} 
                  strokeWidth={0} 
                  className="text-current transition-colors duration-200" 
                />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="items-center gap-4 text-base hidden lg:flex">
        {/* <LanguagePicker
          className="text-heading hover:text-link-hover"
          dropdownPosition="below"
          compact
        /> */}
        {signInLink?.label && (
          <Link 
            href={signInLink} 
            className={`transition-colors duration-300 ease-in-out whitespace-nowrap ${isDarkBg ? 'text-heading hover:text-link-hover' : 'text-teal-900 hover:text-teal-800'}`}
          >
            {signInLink.label}
          </Link>
        )}
      </div>
    </div>
  </div>
  );
};
