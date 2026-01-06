
import type { FC } from 'react';
import { StoryblokNavigationInnerItem, StoryblokNavigationMenuItem } from '../../../../../types/storyblok';
import NavItem from '../navItem';
import FeaturedCard from '../featuredCard';

const DropDownMenu: FC<StoryblokNavigationMenuItem> = ({ innerItems, spotlightCard, link, label }) => {
  // Check if there are dropdown items
  const hasItems = innerItems && innerItems.length > 0;
  const hasSpotlight = spotlightCard;
  
  return (
  <div
    className="light w-full max-w-[1280px] mx-auto overflow-hidden shadow-lg flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_auto] gap-4 lg:gap-6"
    style={{
      borderRadius: 'var(--Border-Radius-lg, 8px)',
      border: '1px solid var(--borderColor-container-default, #EBEBEB)',
      background: 'var(--Surface-background, #FFFCF3)'
    }}
  >
    <div className="flex flex-col min-w-0 xl:min-w-[720px] gap-6 lg:gap-8 p-6 sm:p-8 xl:p-12">
      <div className={`grid grid-cols-1 gap-6 lg:gap-8 min-w-0 ${hasSpotlight ? 'md:grid-cols-2 xl:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
        {innerItems && innerItems.map((menuItem: StoryblokNavigationInnerItem) => (
          <NavItem key={menuItem._uid} {...menuItem} />
        ))}
      </div>
    </div>
    {hasSpotlight && spotlightCard && (
      <div className="lg:col-start-2 lg:p-6 xl:p-8 xl:pl-10 xl:border-l xl:border-secondary min-w-0 self-stretch h-full flex">
        <div className="h-full w-full">
          <FeaturedCard {...spotlightCard} />
        </div>
      </div>
    )}
  </div>
  );
};

export default DropDownMenu;
