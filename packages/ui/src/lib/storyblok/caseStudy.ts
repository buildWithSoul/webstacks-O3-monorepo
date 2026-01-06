import { storyblokApi } from './client';

// Define interfaces for the Storyblok case study data structure
export interface StoryblokCaseStudyListingPage {
  eyebrow?: any;
  heading?: any;
  body?: any;
  media?: any;
  featuredCaseStudies?: any[];
  sectionsAboveListing?: any[];
  sectionsBelowListing?: any[];
  seo?: any;
  _id?: string;
  _type?: string;
}

export interface StoryblokCaseStudy {
  _id: string;
  _type: string;
  title: string;
  publishedAt: string;
  location?: string;
  excerpt: string;
  featuredImage?: any;
  company?: any;
  industries?: any[];
  body?: any;
  seo?: any;
  content?: any;
}

/**
 * Fetch the case study listing page from Storyblok
 */
export const getCaseStudyListingPage = async (): Promise<StoryblokCaseStudyListingPage | null> => {
  try {
    const response = await storyblokApi.getStory('work', {
      version: 'draft',
      resolve_relations: 'featuredCaseStudies,company,industries', // Resolve featured case studies and relations
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
    console.error('Failed to fetch case study listing page from Storyblok:', error);
    return null;
  }
};

/**
 * Fetch all case studies from Storyblok
 */
export const getAllCaseStudies = async (): Promise<StoryblokCaseStudy[] | null> => {
  try {
    const response = await storyblokApi.getStories({
      content_type: 'caseStudy',
      per_page: 100,
      version: 'draft',
      resolve_relations: 'company,industries', // Resolve company and industries relations
    });

    console.log('Storyblok case studies response:', response.data);

    // Check if stories exist
    if (!response.data || !response.data.stories) {
      console.log('No case studies found in response');
      return [];
    }

    const stories = response.data.stories;

    // Sort by publishedAt client-side to avoid API issues
    const sortedStories = stories.sort((a: any, b: any) => {
      const dateA = new Date(a.content.publishedAt).getTime();
      const dateB = new Date(b.content.publishedAt).getTime();
      return dateB - dateA; // Descending order
    });

    return sortedStories.map((story: any) => ({
      _id: story.id.toString(),
      _type: story.content.component,
      title: story.content.title,
      publishedAt: story.content.publishedAt,
      location: story.content.location,
      excerpt: story.content.excerpt,
      featuredImage: story.content.featuredImage,
      company: story.content.company,
      industries: story.content.industries || [],
      body: story.content.body,
      seo: story.content.seo,
      content: story.content,
    }));
  } catch (error) {
    console.error('Failed to fetch all case studies from Storyblok:', error);
    return null;
  }
};

/**
 * Fetch case study industries from Storyblok
 */
export const getCaseStudyIndustries = async (): Promise<any[] | null> => {
  try {
    const response = await storyblokApi.getStories({
      content_type: 'industry',
      per_page: 100,
      version: 'draft',
    });

    if (!response.data || !response.data.stories) {
      return [];
    }

    return response.data.stories.map((story: any) => ({
      _id: story.id.toString(),
      _type: story.content.component,
      name: story.content.name,
      content: story.content,
    }));
  } catch (error) {
    console.error('Failed to fetch case study industries from Storyblok:', error);
    return null;
  }
};

/**
 * Fetch a single case study by slug
 */
export const getCaseStudyBySlug = async (slug: string): Promise<StoryblokCaseStudy | null> => {
  try {
    const response = await storyblokApi.getStory(slug, {
      version: 'draft',
      resolve_relations: 'company,industries',
    });

    const story = response.data.story;
    if (!story) {
      return null;
    }
    
    return {
      _id: story.id.toString(),
      _type: story.content.component,
      title: story.content.title,
      publishedAt: story.content.publishedAt,
      location: story.content.location,
      excerpt: story.content.excerpt,
      featuredImage: story.content.featuredImage,
      company: story.content.company,
      industries: story.content.industries || [],
      body: story.content.body,
      seo: story.content.seo,
      content: story.content,
    };
  } catch (error) {
    console.error(`Failed to fetch case study ${slug} from Storyblok:`, error);
    return null;
  }
};

/**
 * Get all case study slugs for static generation
 */
export const getAllCaseStudySlugs = async (): Promise<string[]> => {
  try {
    const response = await storyblokApi.getStories({
      content_type: 'caseStudy',
      per_page: 100,
      version: 'draft',
    });

    return response.data.stories.map((story: any) => story.slug);
  } catch (error) {
    console.error('Failed to fetch case study slugs from Storyblok:', error);
    return [];
  }
};
