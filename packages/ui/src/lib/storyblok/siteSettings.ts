import { StoryblokSiteSettings } from '../../types/storyblok-site-settings';
import { storyblokApi } from './client';

/**
 * Fetch site settings from Storyblok
 */
export const getSiteSettings = async (isDraft: boolean = false): Promise<StoryblokSiteSettings | null> => {
  try {
    const response = await storyblokApi.getStory('site-settings', {
      version: isDraft ? 'draft' : 'published',
    });

    const story = response.data.story;
    if (!story) {
      return null;
    }
    
    return {
      ...story.content,
      _uid: story.uuid || story.id.toString(),
    };
  } catch (error) {
    console.error('Failed to fetch site settings from Storyblok:', error);
    return null;
  }
};

// Re-export the type for convenience
export type { StoryblokSiteSettings };
