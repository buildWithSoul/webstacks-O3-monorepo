
import { storyblokApi } from "../client";

export const getMarketingPage = async (slug: string): Promise<any | null> => {
  try {
    const response = await storyblokApi.getStory(slug, {
      version: 'draft',
    });
    const story = response.data.story;
    if (!story) {
      return null;
    }
    
    return {
      ...story.content,
      _id: story.id.toString(),
      _type: story.content.component,
    };
  } catch (error) {
    console.error('Failed to fetch blog listing page from Storyblok:', error);
    return null;
  }
};