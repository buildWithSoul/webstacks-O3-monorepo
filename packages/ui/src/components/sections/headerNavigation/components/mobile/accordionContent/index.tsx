
import { Content } from '@radix-ui/react-accordion';

import type { FC } from 'react';
import { StoryblokNavigationInnerItem, StoryblokNavigationMenuItem } from '../../../../../../types/storyblok';
import NavItem from '../../navItem';
import FeaturedCard from '../../featuredCard';

const AccordionContent: FC<StoryblokNavigationMenuItem> = ({ innerItems, spotlightCard, link, label }) => (
  <Content
    className="flex flex-col gap-4 overflow-hidden data-[state=closed]:animate-(--animate-accordion-slide-up) data-[state=open]:animate-(--animate-accordion-slide-down)"
    style={{
      background: 'var(--Surface-background, #FFFCF3)',
      borderLeft: '1px solid var(--borderColor-container-default, #EBEBEB)',
      borderRight: '1px solid var(--borderColor-container-default, #EBEBEB)',
      borderBottom: '1px solid var(--borderColor-container-default, #EBEBEB)'
    }}
  >
    <div className="flex flex-col gap-8 p-8 md:p-12">
      <div className="flex w-full flex-col sm:flex-wrap gap-4">
        {innerItems && innerItems.map((menuItem: StoryblokNavigationInnerItem) => (
          <NavItem key={menuItem._uid} {...menuItem} isMobile />
        ))}
      </div>
      {spotlightCard?.heading && (
        <FeaturedCard {...spotlightCard} />
      )}
    </div>

  </Content>
);

export default AccordionContent;
