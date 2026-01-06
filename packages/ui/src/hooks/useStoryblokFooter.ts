import { useEffect, useState } from 'react';
import { getStoryblokApi } from '@storyblok/react';
import { storyblokFetch } from '../lib/storyblok/client';


// Define Storyblok footer types (you may want to move these to a separate types file)
export interface StoryblokFooterLink {
  _uid: string;
  component: 'footerLink';
  label: string;
  badge?: string;
  link: {
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

export interface StoryblokFooterLinkGroup {
  _uid: string;
  component: 'footerLinkGroup';
  groupTitle: string;
  links: StoryblokFooterLink[];
}

export interface StoryblokFooterColumn {
  _uid: string;
  component: 'footerColumn';
  groups: StoryblokFooterLinkGroup[];
}

export interface StoryblokFooterSocialLink {
  _uid: string;
  component: 'footerSocialLink';
  platform: string;
  url: string;
}

export interface StoryblokFooterLegalLink {
  _uid: string;
  component: 'footerLegalLink';
  label: string;
  link: {
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

export interface StoryblokFooterBottomSection {
  component: 'footerBottomSection';
  copyrightText: any; // Rich text
  socialLinks: StoryblokFooterSocialLink[];
  legalLinks: StoryblokFooterLegalLink[];
}

export interface StoryblokGlobalFooter {
  component: 'globalFooter';
  title: string;
  footerImage?: {
    id: number;
    filename: string;
    alt: string;
    name: string;
    title: string;
    focus: string;
    copyright: string;
    fieldtype: 'asset';
    meta_data: Record<string, any>;
  };
  columns: StoryblokFooterColumn[];
  bottomSection: StoryblokFooterBottomSection[];
}

export function useStoryblokFooter() {
  console.log('useStoryblokFooter hook called');
  const [footer, setFooter] = useState<StoryblokGlobalFooter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useStoryblokFooter useEffect running');
    async function fetchFooter() {
      try {
        console.log('Fetching footer from Storyblok...');
        let content: StoryblokGlobalFooter | null = null;

        // Try SDK first (works when storyblokInit has run on client)
        try {
          const storyblokApi = getStoryblokApi();
          console.log('Got Storyblok API:', !!storyblokApi);
          if (storyblokApi && typeof storyblokApi.get === 'function') {
            const response = await storyblokApi.get('cdn/stories/global-footer', {
              version: 'published'
            });
            console.log('Storyblok footer response:', response.data);
            content = response.data?.story?.content as StoryblokGlobalFooter;
          }
        } catch (sdkErr) {
          console.warn('Storyblok SDK not available, falling back to storyblokFetch:', sdkErr);
        }

        // Fallback to direct fetch using public token
        if (!content) {
          console.log('Falling back to storyblokFetch(public, published) for global-footer');
          const story = await storyblokFetch<any>('global-footer', { version: 'published' });
          content = (story?.content as StoryblokGlobalFooter) || null;
        }

        if (!content) {
          throw new Error('Footer not found');
        }
        console.log('Storyblok footer content:', content);
        setFooter(content);
      } catch (err) {
        console.error('Failed to fetch footer:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchFooter();
  }, []);

  console.log('useStoryblokFooter returning:', { footer, loading, error });
  return { footer, loading, error };
}
