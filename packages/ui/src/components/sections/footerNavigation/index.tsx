'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import NextImage from 'next/image';
import { useStoryblokSiteSettings } from '../../../hooks/useStoryblokSiteSettings';
import { StoryblokFooterColumn, StoryblokFooterLegalLink, StoryblokFooterLink, StoryblokFooterLinkGroup, StoryblokFooterSocialLink, useStoryblokFooter } from '../../../hooks/useStoryblokFooter';
import { Icon, Link } from '../../atoms';
import HubSpotFormComponent from '../../molecules/hubspotForm';

// Define the props for the FooterNavigation component
export interface FooterNavigationProps {
  footerNavigation?: any | null; // Keep for backward compatibility, but not used
}

// Helper function to render Storyblok rich text
const renderStoryblokRichText = (content: any) => {
  if (!content) return null;
  
  if (Array.isArray(content)) {
    return content.map((block, index) => (
      <span key={index}>
        {block.content?.map((textNode: any, textIndex: number) => (
          <span key={textIndex}>{textNode.text}</span>
        ))}
      </span>
    ));
  }
  
  return <span>{content}</span>;
};

// Helper function to get link href from Storyblok link object
const getLinkHref = (link: any) => {
  if (!link) return '#';
  
  if (link.linkType === 'external' && link.externalUrl) {
    return link.externalUrl;
  }
  
  if (link.linkType === 'internal' && link.internalLink?.cached_url) {
    return `/${link.internalLink.cached_url}`;
  }
  
  return '#';
};

export const FooterNavigation: React.FC<FooterNavigationProps> = ({ footerNavigation }) => {
  const { siteSettings } = useStoryblokSiteSettings();
  const { footer: storyblokFooter } = useStoryblokFooter();
  
  // Use Storyblok footer if available, otherwise fall back to props
  const footerData = storyblokFooter || footerNavigation;
  const pathname = usePathname();
  const pathLang = pathname?.split('/')[1];
  const currentLang = pathLang === 'fr' || pathLang === 'de' ? pathLang : 'en';
  const homeHref = currentLang === 'en' ? '/' : `/${currentLang}`;

  // State to track hideFooterLinks setting
  const [hideFooterLinks, setHideFooterLinks] = useState(false);

  // Read footer visibility from body data attribute (set by PageWrapper)
  useEffect(() => {
    const hideFooter = document.body.getAttribute('data-hide-footer-links') === 'true';
    setHideFooterLinks(hideFooter);

    // Set up mutation observer to watch for changes to body attributes
    const observer = new MutationObserver(() => {
      const hideFooter = document.body.getAttribute('data-hide-footer-links') === 'true';
      setHideFooterLinks(hideFooter);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-hide-footer-links']
    });

    return () => observer.disconnect();
  }, []);

  return (
  <footer className="dark overflow-hidden relative bg-teal-700 text-teal-200 items-center">
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-16 xl:px-8 py-12 md:py-16">
      {!hideFooterLinks &&
        <nav className="w-full mb-16 lg:mb-20" aria-label="Global">
          <div className="grid w-full grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {footerData?.columns?.map((column: StoryblokFooterColumn) => (
              <div key={column._uid} className="flex flex-col gap-8">
                {column?.groups?.map((group: StoryblokFooterLinkGroup) => (
                  <div key={group._uid} className="flex flex-col gap-4">
                    {group.groupTitle && (
                      <h3 className="text-lg font-semibold text-white">
                        {group.groupTitle}
                      </h3>
                    )}
                    {group?.links?.map((link: StoryblokFooterLink) => (
                      <Link
                        key={link._uid}
                        href={getLinkHref(link.link)}
                        className="flex items-center gap-3 text-base text-heading hover:text-white transition-colors"
                      >
                        <span>{link?.label}</span>
                        {link.badge && <span className="bg-kiwi-500 px-2.5 py-0.5 rounded-3xl text-white text-xs font-semibold">{link.badge}</span>}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            {/* Email signup column */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Get monthly insights on AI adoption
                </h3>
                <HubSpotFormComponent
                  portalId="1907998"
                  formId="26f5878f-07e6-4400-8ff2-27c678abdbcf"
                  className="footer-newsletter-form"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Connect with us
                </h3>
                <div className="flex gap-4 items-center">
                  {footerData?.bottomSection?.[0]?.socialLinks?.map((item: StoryblokFooterSocialLink) => (
                    <Link key={item._uid} href={item.url} className="text-kiwi-400 hover:text-kiwi-200 transition-colors">
                      {item.platform && <Icon icon={item.platform} size={24} spriteType="ui" />}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>
      }

      {/* Divider */}
      <div className="w-full h-px bg-teal-600 mb-8"></div>

      {/* Bottom section */}
      <div className="flex gap-6 flex-row items-center justify-between">
        <div className="text-sm text-teal-200">
          {footerData?.bottomSection?.[0]?.copyrightText ? (
            renderStoryblokRichText(footerData.bottomSection[0].copyrightText)
          ) : (
            <span>© {new Date().getFullYear()} {siteSettings?.siteName || 'Modus Create, LLC'}</span>
          )}
        </div>
        <div className="flex gap-6 flex-wrap items-center">
          {footerData?.bottomSection?.[0]?.legalLinks?.map((link: StoryblokFooterLegalLink) => (
            <Link key={link._uid} href={getLinkHref(link.link)} className="text-sm text-heading hover:text-white transition-colors whitespace-nowrap">
              {link?.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
    {footerData?.footerImage?.filename && (
        <div className='flex h-full w-full object-cover justify-center items-center'>
          <NextImage
            src={footerData.footerImage.filename}
            alt={footerData.footerImage.alt || "Footer Background Image"}
            width={1280}
            height={241}
            className='w-full h-full top-1 md:top-2 lg:top-5 object-cover'
          />
        </div>
      )}
  </footer>
  );
};
