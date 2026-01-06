'use client';


import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { StoryblokGlobalNavigation } from '../../../types/storyblok';
import { useStoryblokSiteSettings } from '../../../hooks/useStoryblokSiteSettings';
import useWindowScrolledPast from '../../../lib/utils/hooks/useWindowScrolledPast';
import { closeDesktopMenu, closeMobileMenu } from './store';
import { AnnouncementBar } from './components/announcementBar';
import { Link } from '../../atoms';
import { SITE_CONFIG } from '../../../lib/constants';
import { Brand } from '../../atoms/brand';
import Navigation from './components/navigation';
import CTABar from '../../molecules/ctaBar';
import Hamburger from './components/hamburger';
import MobileNavigation from './components/mobile';


// Define the props for the HeaderNavigation component
interface HeaderNavigationProps {
  headerNavigation: StoryblokGlobalNavigation | null;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ headerNavigation }) => {
  const { siteSettings } = useStoryblokSiteSettings();
  const isScrolled = useWindowScrolledPast(10);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [hideAnnouncementBar, setHideAnnouncementBar] = useState(false);
  const [hideNavigation, setHideNavigation] = useState(false);

  // Close menus on route change
  const pathname = usePathname();
  const pathLang = pathname?.split('/')[1];
  const currentLang = pathLang === 'fr' || pathLang === 'de' ? pathLang : 'en';
  const homeHref = currentLang === 'en' ? '/' : `/${currentLang}`;

  useEffect(() => {
    closeMobileMenu();
    closeDesktopMenu();
  }, [pathname]);


  useEffect(() => {
    const detectDarkSection = () => {
      // Get the first section element inside <main> (skips wrapper divs)
      const firstSection = document.querySelector('main section');
      if (!firstSection) return;

      // Check if the section has dark-related classes or data attributes
      const classList = firstSection.classList;
      const hasDataTheme = firstSection.getAttribute('data-theme');

      const isDark = classList.contains('dark') ||
                    classList.contains('bg-purple-900') ||
                    classList.contains('bg-gray-900') ||
                    classList.contains('bg-black') ||
                    hasDataTheme === 'dark' ||
                    firstSection.hasAttribute('data-dark');

      setIsDarkSection(isDark);
    };

    const syncPageSettings = () => {
      const hideAnn = document.body.getAttribute('data-hide-announcement-bar') === 'true';
      const hideNav = document.body.getAttribute('data-hide-navigation') === 'true';
      setHideAnnouncementBar(hideAnn);
      setHideNavigation(hideNav);
    };

    // Initial detection
    detectDarkSection();
    syncPageSettings();

    // Re-detect when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      detectDarkSection();
      syncPageSettings();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'data-dark', 'data-hide-announcement-bar', 'data-hide-navigation']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
      <header
        className={`
          w-full z-50 fixed top-0 transition-all duration-300 ease-in-out
          ${isDarkSection && !isScrolled ? 'dark' : ''}
        `}
        style={{
          borderRadius: 0,
          backdropFilter: isDarkSection && !isScrolled ? 'none' : 'blur(8px)',
          WebkitBackdropFilter: isDarkSection && !isScrolled ? 'none' : 'blur(8px)',
          backgroundColor: isDarkSection && !isScrolled ? 'transparent' : 'rgba(255, 252, 243, 0.95)'
        }}
      >
        {/* Top utility bar: Announcement left, Language + Sign in right */}
        {headerNavigation?.announcement && !hideAnnouncementBar && (
          <AnnouncementBar
            announcement={headerNavigation.announcement}
            announcementLink={headerNavigation.announcementLink?.[0]} // Get first button from array
            announcementIcon={headerNavigation.announcementIcon}
            signInLink={undefined} // TODO: Add to Storyblok schema if needed
            showUtilityBar={true}
            theme={headerNavigation.announcementTheme as 'subtle' | 'high-contrast'}
            isDarkSection={isDarkSection}
            isScrolled={isScrolled}
          />
        )}
        <nav
          className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 xl:gap-8 transition-all duration-300 ease-in-out
            ${isScrolled ? 'py-4' : 'py-6'}
          `}
          aria-label="Global"
        >
          <div className="h-full lg:basis-auto lg:shrink-0 lg:grow-0">
            <Link href={homeHref}>
              <span className="sr-only">{SITE_CONFIG.brand.name}</span>
              <Brand
                siteSettings={siteSettings}
                variant={isDarkSection && !isScrolled ? "dark" : "light"}
                width={419}
                height={146}
                priority
                className={`h-full w-[92px] sm:w-[188px] transition-all duration-300 ${isDarkSection && !isScrolled ? 'brightness-0 invert' : ''}`}
              />
            </Link>
          </div>

          {headerNavigation?.menuItems && !hideNavigation && (
            <div className={`hidden transition-colors duration-300 ease-in-out text flex-1 xl:flex justify-center`}>
              <Navigation menuItems={headerNavigation.menuItems} />
            </div>
          )}
          <div className="flex flex-row items-center gap-4">
            {headerNavigation?.ctaBar?.[0]?.buttons && !hideNavigation && (
              <div className={`flex gap-4 xl:gap-6 items-center justify-end`}>
                <CTABar
                  buttons={headerNavigation.ctaBar[0].buttons}
                  className="flex gap-4"
                />
                {/* <LanguagePicker
                  currentLanguage={currentLang}
                  compact={true}
                  dropdownPosition="below"
                  className="text-heading hover:text-headline-hover"
                  dropdownClassName="bg-primary ring-border-subtle shadow-elevation"
                /> */}
              </div>
            )}

            {/* Mobile hamburger */}
            {!hideNavigation && (
              <div className={`ml-4 transition-colors duration-300 ease-in-out text-heading xl:hidden`}>
                <Hamburger />
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        {headerNavigation?.menuItems && !hideNavigation && <MobileNavigation menuItems={headerNavigation.menuItems} />}
      </header>
  );
};
