/**
 * Site Configuration
 * 
 * Central place to manage site-wide constants like branding, URLs, and metadata.
 * Update these values to rebrand the entire application.
 */
export const SITE_CONFIG = {
  // Brand Information
  brand: {
    name: 'Modus Create',
    shortName: 'Modus Create',
    tagline: 'AI-powered analytics platform',
    description: 'Advanced AI analytics and insights platform for modern businesses',
  },

  // URLs and Domains
  urls: {
    // Primary domain (used for canonical URLs, sitemaps, etc.)
    domain: 'https://www.moduscreate.com',
    // Fallback domain for development/staging
    fallbackDomain: 'https://www.moduscreate.com',
  },

  // Contact Information
  contact: {
    email: 'hello@moduscreate.com',
    phone: '+1 (555) 123-4567',
  },

  // Social Media
  social: {
    twitter: '@moduscreate',
    linkedin: 'company/modus-create',
    github: 'modus-create',
  },

  // SEO Defaults
  seo: {
    defaultTitle: 'Modus Create - AI-powered analytics platform',
    titleTemplate: '%s | Modus Create',
    defaultDescription: 'Advanced AI analytics and insights platform for modern businesses',
    defaultImage: '/open-graph-logo.png',
    twitterHandle: '@moduscreate',
  },

  // Theme Configuration
  theme: {
    primaryColor: '#235FF6',
    tileColor: '#235FF6',
  },
} as const;

/**
 * Page types in the Sanity schema
 * This matches the document types defined in the studio
 */
export const PAGE_TYPES = {
  WEBSITE_PAGE: 'websitePage'
};

/**
 * Listing document types
 * These pages have listing sections that are never at the top (sandwiched between hero and footer)
 */
export const LISTING_DOCUMENT_TYPES = [
  'blogListing',
  'caseStudyListing'
] as const;

/**
 * Check if a document type is a listing page
 */
export function isListingDocument(documentType: string): boolean {
  return LISTING_DOCUMENT_TYPES.includes(documentType as any);
}

/**
 * Section types by category for page content
 * These correspond to the content blocks that can be added to pages
 */
export const SECTION_TYPES = {
  HEROS: {
    title: 'Heros',
    types: ['hero']
  },
  HEADINGS: {
    title: 'Headings',
    types: ['headingBlock']
  },
  MEDIA: {
    title: 'Media',
    types: ['imageBlock', 'videoBlock', 'imageCardDeck']
  },
  SOCIAL_PROOF: {
    title: 'Social Proof',
    types: ['logoCloud', 'trustBar', 'statisticsPanel']
  },
  MISC: {
    title: 'Misc',
    types: ['sharedSection']
  }
};

export const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.urls.domain 
export const PAGE_SIZE = 2;

/**
 * Resource Route Configuration
 * Central mapping of Sanity resource types to their URL prefixes
 * This ensures consistent routing across all resource cards
 */
export const RESOURCE_ROUTES = {
  blogPost: '/blog',
  caseStudy: '/work',
} as const;

/**
 * Resource Types
 * Sanity document types for different content resources
 */
export const RESOURCE_TYPES = {
  BLOG_POST: 'blogPost',
  CASE_STUDY: 'caseStudy',
} as const;

/**
 * Resource Type Labels
 * Human-readable labels for resource types
 */
export const RESOURCE_TYPE_LABELS: Record<string, string> = {
  blogPost: 'Blog',
  caseStudy: 'Case Study',
} as const;

/**
 * Content Filter Types
 * Used for filtering resources by category/topic
 */
export const CONTENT_FILTERS = {
  BLOG: {
    TOPICS: 'blogTopics',
    TAGS: 'blogTags',
  },
  CASE_STUDY: {
    INDUSTRIES: 'industries',
    WORK_TYPES: 'workTypes',
  },
} as const;

/**
 * Resource Taxonomy Mapping
 * Maps resource types to their associated taxonomies
 */
export const RESOURCE_TAXONOMIES = {
  [RESOURCE_TYPES.BLOG_POST]: {
    topics: CONTENT_FILTERS.BLOG.TOPICS,
    tags: CONTENT_FILTERS.BLOG.TAGS,
  },
  [RESOURCE_TYPES.CASE_STUDY]: {
    industries: CONTENT_FILTERS.CASE_STUDY.INDUSTRIES,
    workTypes: CONTENT_FILTERS.CASE_STUDY.WORK_TYPES,
  },
} as const;

/**
 * Get taxonomies for a given resource type
 * @param resourceType - The Sanity document type (_type field)
 * @returns The taxonomy types for that resource
 */
export function getResourceTaxonomies(resourceType: string) {
  return RESOURCE_TAXONOMIES[resourceType as keyof typeof RESOURCE_TAXONOMIES];
}

/**
 * Get the route prefix for a given resource type
 * @param resourceType - The Sanity document type (_type field)
 * @returns The URL prefix for that resource type
 */
export function getResourceRoute(resourceType: string): string {
  return RESOURCE_ROUTES[resourceType as keyof typeof RESOURCE_ROUTES] || '/';
}

export const SCRIBBLE_SIZE = [
  { w: 134, h: 128, className: 'rotate-[74deg] right-10 top-8' },
  { w: 200, h: 70.5, className: 'rotate-[10deg] right-4 top-12' },
  { w: 264.5, h: 100, className: 'rotate-30 -right-10 top-14' },
  { w: 143, h: 116, className: 'rotate-[210deg] right-8 top-2' },
  { w: 95, h: 210, className: 'rotate-[-40deg] right-12 -top-6' },
  { w: 134, h: 119.5, className: 'top-5 right-2' },
  { w: 191, h: 124, className: 'rotate-[4deg] top-4 -right-7' },
  { w: 127.5, h: 120.5, className: 'top-6 left-6' },
];

export const spacingMap: Record<number, string[]> = {
  0: [
    'pt-0',
    'pb-0',
    'sm:pt-0',
    'sm:pb-0',
    'md:pt-0',
    'md:pb-0',
    'lg:pt-0',
    'lg:pb-0',
    'xl:pt-0',
    'xl:pb-0',
    '2xl:pt-0',
    '2xl:pb-0',
  ],
  24: [
    'pt-6',
    'pb-6',
    'sm:pt-6',
    'sm:pb-6',
    'md:pt-6',
    'md:pb-6',
    'lg:pt-6',
    'lg:pb-6',
    'xl:pt-6',
    'xl:pb-6',
    '2xl:pt-6',
    '2xl:pb-6',
  ],
  32: [
    'pt-8',
    'pb-8',
    'sm:pt-8',
    'sm:pb-8',
    'md:pt-8',
    'md:pb-8',
    'lg:pt-8',
    'lg:pb-8',
    'xl:pt-8',
    'xl:pb-8',
    '2xl:pt-8',
    '2xl:pb-8',
  ],
  36: [
    'pt-9',
    'pb-9',
    'sm:pt-9',
    'sm:pb-9',
    'md:pt-9',
    'md:pb-9',
    'lg:pt-9',
    'lg:pb-9',
    'xl:pt-9',
    'xl:pb-9',
    '2xl:pt-9',
    '2xl:pb-9',
  ],
  40: [
    'pt-10',
    'pb-10',
    'sm:pt-10',
    'sm:pb-10',
    'md:pt-10',
    'md:pb-10',
    'lg:pt-10',
    'lg:pb-10',
    'xl:pt-10',
    'xl:pb-10',
    '2xl:pt-10',
    '2xl:pb-10',
  ],
  48: [
    'pt-12',
    'pb-12',
    'sm:pt-12',
    'sm:pb-12',
    'md:pt-12',
    'md:pb-12',
    'lg:pt-12',
    'lg:pb-12',
    'xl:pt-12',
    'xl:pb-12',
    '2xl:pt-12',
    '2xl:pb-12',
  ],
  56: [
    'pt-14',
    'pb-14',
    'sm:pt-14',
    'sm:pb-14',
    'md:pt-14',
    'md:pb-14',
    'lg:pt-14',
    'lg:pb-14',
    'xl:pt-14',
    'xl:pb-14',
    '2xl:pt-14',
    '2xl:pb-14',
  ],
  64: [
    'pt-16',
    'pb-16',
    'sm:pt-16',
    'sm:pb-16',
    'md:pt-16',
    'md:pb-16',
    'lg:pt-16',
    'lg:pb-16',
    'xl:pt-16',
    'xl:pb-16',
    '2xl:pt-16',
    '2xl:pb-16',
  ],
  72: [
    'pt-18',
    'pb-18',
    'sm:pt-18',
    'sm:pb-18',
    'md:pt-18',
    'md:pb-18',
    'lg:pt-18',
    'lg:pb-18',
    'xl:pt-18',
    'xl:pb-18',
    '2xl:pt-18',
    '2xl:pb-18',
  ],
  80: [
    'pt-20',
    'pb-20',
    'sm:pt-20',
    'sm:pb-20',
    'md:pt-20',
    'md:pb-20',
    'lg:pt-20',
    'lg:pb-20',
    'xl:pt-20',
    'xl:pb-20',
    '2xl:pt-20',
    '2xl:pb-20',
  ],
  96: [
    'pt-24',
    'pb-24',
    'sm:pt-24',
    'sm:pb-24',
    'md:pt-24',
    'md:pb-24',
    'lg:pt-24',
    'lg:pb-24',
    'xl:pt-24',
    'xl:pb-24',
    '2xl:pt-24',
    '2xl:pb-24',
  ],
  112: [
    'pt-28',
    'pb-28',
    'sm:pt-28',
    'sm:pb-28',
    'md:pt-28',
    'md:pb-28',
    'lg:pt-28',
    'lg:pb-28',
    'xl:pt-28',
    'xl:pb-28',
    '2xl:pt-28',
    '2xl:pb-28',
  ],
  128: [
    'pt-32',
    'pb-32',
    'sm:pt-32',
    'sm:pb-32',
    'md:pt-32',
    'md:pb-32',
    'lg:pt-32',
    'lg:pb-32',
    'xl:pt-32',
    'xl:pb-32',
    '2xl:pt-32',
    '2xl:pb-32',
  ],
  144: [
    'pt-36',
    'pb-36',
    'sm:pt-36',
    'sm:pb-36',
    'md:pt-36',
    'md:pb-36',
    'lg:pt-36',
    'lg:pb-36',
    'xl:pt-36',
    'xl:pb-36',
    '2xl:pt-36',
    '2xl:pb-36',
  ],
  160: [
    'pt-40',
    'pb-40',
    'sm:pt-40',
    'sm:pb-40',
    'md:pt-40',
    'md:pb-40',
    'lg:pt-40',
    'lg:pb-40',
    'xl:pt-40',
    'xl:pb-40',
    '2xl:pt-40',
    '2xl:pb-40',
  ],
  176: [
    'pt-44',
    'pb-44',
    'sm:pt-44',
    'sm:pb-44',
    'md:pt-44',
    'md:pb-44',
    'lg:pt-44',
    'lg:pb-44',
    'xl:pt-44',
    'xl:pb-44',
    '2xl:pt-44',
    '2xl:pb-44',
  ],
  192: [
    'pt-48',
    'pb-48',
    'sm:pt-48',
    'sm:pb-48',
    'md:pt-48',
    'md:pb-48',
    'lg:pt-48',
    'lg:pb-48',
    'xl:pt-48',
    'xl:pb-48',
    '2xl:pt-48',
    '2xl:pb-48',
  ],
};
