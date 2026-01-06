// Storyblok header navigation query types

export interface StoryblokFeaturedCard {
  _uid: string;
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
}

export interface StoryblokMediaCard {
  _uid: string;
  component: 'mediaCard';
  image?: {
    id: string;
    filename: string;
    alt?: string;
  };
  title?: string;
  subtitle?: string;
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
}
