import { storyblokApi } from './client';

// Define interfaces for the Storyblok blog data structure
export interface StoryblokBlogListingPage {
  eyebrow?: any;
  heading?: any;
  body?: any;
  featuredPosts?: any[];
  sectionsAboveListing?: any[];
  sectionsBelowListing?: any[];
  seo?: any;
  _id?: string;
  _type?: string;
}

export interface StoryblokBlogPost {
  _id: string;
  _type: string;
  title: string;
  publishedDate: string;
  excerpt: string;
  featuredImage?: any;
  author?: any;
  topics?: any[];
  tags?: any[];
  body?: any;
  seo?: any;
  content?: any;
}

/**
 * Fetch the blog listing page from Storyblok
 */
export const getBlogListingPage = async (): Promise<StoryblokBlogListingPage | null> => {
  try {
    const response = await storyblokApi.getStory('blog', {
      version: 'draft',
      resolve_relations: 'featuredPosts,author', // Resolve featured posts and author relations
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

/**
 * Fetch all blog posts from Storyblok
 */
export const getAllBlogPosts = async (): Promise<StoryblokBlogPost[] | null> => {
  try {
    const response = await storyblokApi.getStories({
      content_type: 'blogPost',
      per_page: 100,
      version: 'draft',
      resolve_relations: 'author', // Resolve author relations
    });

    console.log('Storyblok response:', response.data);

    // Check if stories exist
    if (!response.data || !response.data.stories) {
      console.log('No stories found in response');
      return [];
    }

    const stories = response.data.stories;

    // Sort by publishedDate client-side to avoid API issues
    const sortedStories = stories.sort((a: any, b: any) => {
      const dateA = new Date(a.content.publishedDate).getTime();
      const dateB = new Date(b.content.publishedDate).getTime();
      return dateB - dateA; // Descending order
    });

    return sortedStories.map((story: any) => ({
      _id: story.id.toString(),
      _type: story.content.component,
      title: story.content.title,
      publishedDate: story.content.publishedDate,
      excerpt: story.content.excerpt,
      featuredImage: story.content.featuredImage,
      author: story.content.author,
      topics: story.content.topics || [],
      tags: story.content.tags || [],
      body: story.content.body,
      seo: story.content.seo,
      content: story.content,
    }));
  } catch (error) {
    console.error('Failed to fetch all blog posts from Storyblok:', error);
    return null;
  }
};

/**
 * Fetch blog topics from Storyblok (if implemented as a content type)
 */
export const getBlogTopics = async (): Promise<any[] | null> => {
  try {
    // For now, return empty array as topics might be handled differently in Storyblok
    // This can be implemented later if topics are created as a separate content type
    return [];
  } catch (error) {
    console.error('Failed to fetch blog topics from Storyblok:', error);
    return null;
  }
};

/**
 * Fetch blog tags from Storyblok (if implemented as a content type)
 */
export const getBlogTags = async (): Promise<any[] | null> => {
  try {
    // For now, return empty array as tags might be handled differently in Storyblok
    // This can be implemented later if tags are created as a separate content type
    return [];
  } catch (error) {
    console.error('Failed to fetch blog tags from Storyblok:', error);
    return null;
  }
};

/**
 * Fetch a single blog post by slug
 */
export const getBlogPostBySlug = async (slug: string): Promise<StoryblokBlogPost | null> => {
  try {
    const response = await storyblokApi.getStory(slug, {
      version: 'draft',
      resolve_relations: 'author',
    });

    const story = response.data.story;
    if (!story) {
      return null;
    }
    
    return {
      _id: story.id.toString(),
      _type: story.content.component,
      title: story.content.title,
      publishedDate: story.content.publishedDate,
      excerpt: story.content.excerpt,
      featuredImage: story.content.featuredImage,
      author: story.content.author,
      topics: story.content.topics || [],
      tags: story.content.tags || [],
      body: story.content.body,
      seo: story.content.seo,
      content: story.content,
    };
  } catch (error) {
    console.error(`Failed to fetch blog post ${slug} from Storyblok:`, error);
    return null;
  }
};

/**
 * Get all blog post slugs for static generation
 */
export const getAllBlogPostSlugs = async (): Promise<string[]> => {
  try {
    const response = await storyblokApi.getStories({
      content_type: 'blogPost',
      per_page: 100,
      version: 'draft',
    });

    return response.data.stories.map((story: any) => story.slug);
  } catch (error) {
    console.error('Failed to fetch blog post slugs from Storyblok:', error);
    return [];
  }
};
