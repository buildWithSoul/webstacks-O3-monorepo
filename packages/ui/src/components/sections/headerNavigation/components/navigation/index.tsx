'use client';

import { Content, Item, List, Link as RadLink, Root, Trigger, Viewport } from '@radix-ui/react-navigation-menu';
import { Fragment, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';


import type { FC } from 'react';
import { StoryblokNavigationMenuItem } from '../../../../../types/storyblok';
import DropDownMenu from '../dropDownMenu';

interface NavigationProps {
  menuItems?: StoryblokNavigationMenuItem[];
}

const MenuLink: FC<StoryblokNavigationMenuItem> = ({ link, label }) => {
  const href = link?.internalLink?.slug ? `/${link.internalLink.slug}` : '#';
  
  return (
    <RadLink asChild key={link?.label || label}>
      <a
        className="flex w-full items-center justify-center whitespace-nowrap transition-colors cursor-pointer outline-none sm:w-fit text-md text-nav-item font-medium hover:text-link-hover"
        href={href}
        target={link?.openInNewTab ? '_blank' : '_self'}
        rel={link?.openInNewTab ? 'noopener noreferrer' : ''}
      >
        {label || link?.label || ''}
      </a>
    </RadLink>
  );
};

const MenuDropdown: FC<StoryblokNavigationMenuItem> = ({ link, label }) => (
  <Trigger asChild>
    <button
      className="flex items-center text-nowrap gap-2 text-md text-nav-item font-medium hover:text-link-hover hover:outline-none bg-transparent border-0 cursor-pointer data-[state=open]:[&_svg]:rotate-180 [&_svg]:transition-transform [&_svg]:duration-150 [&_svg]:ease-in-out"
    >
      {label || link?.label}
      <svg className="size-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  </Trigger>
);

const Navigation: FC<NavigationProps> = ({ menuItems }) => {
  const [activeItem, setActiveItem] = useState("");

  // Reset the active menu item when the route changes
  const pathname = usePathname();

  useEffect(() => {
    // Reset active menu item on route change
    setActiveItem("");
  }, [pathname]);

  return (
    <Root
      className="w-fit"
      delayDuration={100}
      value={activeItem}
      onValueChange={setActiveItem}
    >
      <List className="hidden w-full items-center gap-4 xl:flex lg:gap-6 lg:justify-center">
        {menuItems &&
          menuItems.map(item => {
            const hasDropdown = item?.innerItems && item.innerItems.length > 0;
            const isSimpleDropdown = false; // Removed simple dropdown logic

            return (
              <Fragment key={item._uid}>
                <Item className="relative flex justify-center" value={item._uid}>
                  {hasDropdown && !isSimpleDropdown ? (
                    <>
                      <MenuDropdown {...item} />
                      <Content asChild>
                        <div className="hidden xl:flex">
                          <DropDownMenu {...item} />
                        </div>
                      </Content>
                    </>
                  ) : isSimpleDropdown ? (
                    <div className="relative group">
                      {/* Simple dropdown removed - structure flattened */}
                    </div>
                  ) : (
                    <MenuDropdown {...item} />
                  )}
                </Item>
              </Fragment>
            );
          })}
      </List>
      <Viewport className="absolute h-(--radix-navigation-menu-viewport-height) w-full left-0 top-full overflow-hidden z-50 origin-top [transform-style:preserve-3d] data-[state=open]:animate-[tiltIn_250ms_cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:animate-[tiltOut_200ms_cubic-bezier(0.4,0,0.2,1)]" />
    </Root>
  );
};

export default Navigation;
