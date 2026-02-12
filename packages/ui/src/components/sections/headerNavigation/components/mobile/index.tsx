'use client';

import { Item, Root, Trigger } from '@radix-ui/react-accordion';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';


import type { FC } from 'react';
import { StoryblokNavigationMenuItem } from '../../../../../types/storyblok';
import { Button, Icon, Link } from '../../../../atoms';
import AccordionContent from './accordionContent';
import { closeMobileMenu, toggleMobileMenu } from '../../store';
import MainMobileAccordion from './mainMobileAccordion';

interface MobileNavigationProps {
  menuItems?: StoryblokNavigationMenuItem[];
}

interface MobileNavAccordionProps {
  item: StoryblokNavigationMenuItem;
}

const MobileNavAccordion: FC<MobileNavAccordionProps> = ({ item }) =>
  item?.innerItems && item.innerItems.length > 0 ? (
    <div className="relative w-full">
      <Trigger className="group flex w-full cursor-pointer items-center justify-between gap-2 border-b border-neutral-200 px-8 py-6 text-heading transition-colors hover:text-headline-hover sm:px-10">
        <span className="text-xl font-semibold">{item?.label || item?.link?.label}</span>
        <Icon icon="chevron-down" size={22} className="transition-transform group-data-[state=open]:rotate-180" />
      </Trigger>
      <AccordionContent {...item} />
    </div>
  ) : (
    <Link
      href={item.link as any}
      onClick={() => toggleMobileMenu()}
      className="flex w-full items-center justify-between border-b border-neutral-200 px-8 py-6 text-xl font-semibold text-heading transition-colors hover:text-headline-hover sm:px-10"
    >
      <span>{item?.label || item?.link?.label}</span>
    </Link>
  );

const MobileNavigation: FC<MobileNavigationProps> = ({ menuItems }) => {
  // Close mobile menu on route change
  const pathname = usePathname();

  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  return (
  <MainMobileAccordion>
    <Root type="single" collapsible className="w-full">
      <div className="flex flex-col gap-24">
        <div className="flex flex-col bg-white">
          {menuItems &&
            menuItems.map(mainItem => (
              <Item key={mainItem._uid} value={mainItem?.label || mainItem?.link?.label || ''} className="relative w-full">
                <MobileNavAccordion item={mainItem} />
              </Item>
            ))}
        </div>
        <div className="flex w-full flex-col gap-4 px-8 py-6 pb-24 sm:hidden">
          {/* <div className="flex justify-center">
            <LanguagePicker
              className="text-heading hover:text-headline-hover"
              dropdownClassName="bg-white ring-border-default shadow-elevation"
            />
          </div> */}
          <Button label="Sign in" tone="secondary" mode="filled" size="sm" className="h-12 sm:w-full" />
          <Button label="Book a demo" tone="primary" mode="filled" size="sm" className="h-12 sm:w-full" link="/demo/" />
        </div>
      </div>
    </Root>
  </MainMobileAccordion>
  );
};

export default MobileNavigation;
