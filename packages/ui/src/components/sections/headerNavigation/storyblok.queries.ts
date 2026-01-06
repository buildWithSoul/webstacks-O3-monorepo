// Storyblok header navigation query types

export interface StoryblokMenuItem {
  _uid: string;
  component: 'menuItem';
  label: string;
  link?: {
    component: 'button';
    label: string;
    linkType: 'internal' | 'external';
    internalLink?: {
      id: string;
      url: string;
      linktype: 'story';
      fieldtype: 'multilink';
      cached_url: string;
    };
    externalUrl: string;
    openInNewTab: boolean;
  };
  innerItems?: StoryblokMenuItem[];
  spotlightCard?: {
    component: 'featuredCard';
    featuredImage?: {
      id: string;
      filename: string;
      alt?: string;
    };
    heading?: string;
    description?: string;
    link?: {
      component: 'button';
      label: string;
      linkType: 'internal' | 'external';
      internalLink?: {
        id: string;
        url: string;
        linktype: 'story';
        fieldtype: 'multilink';
        cached_url: string;
      };
      externalUrl: string;
      openInNewTab: boolean;
    };
  };
}

export interface StoryblokNavigation {
  component: 'navigation';
  items: StoryblokMenuItem[];
}
