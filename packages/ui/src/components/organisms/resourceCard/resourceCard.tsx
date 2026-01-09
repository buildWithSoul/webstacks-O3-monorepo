


import type { FC } from 'react';
import { getResourceRoute, RESOURCE_TYPE_LABELS } from '../../../lib';
import { Heading, Link } from '../../atoms';
import Image from '../../molecules/image';

// Universal resource type that handles blogs, case studies, webinars, and press releases
interface ResourceCardProps {
  _id: string;
  _type: 'blogPost' | 'caseStudy' | 'webinar' | 'pressRelease';
  title: string;
  excerpt?: string;
  body?: any[];
  featuredImage?: any; // all resource types use featuredImage
  seo?: {
    slug?: {
      current?: string;
    };
  };
  slug?: { // case studies use slug directly
    current?: string;
  };
  publishedDate?: string;
  publishedAt?: string; // case studies and press releases use publishedAt
  readTime?: number;
  author?: any;
  topics?: Array<{name: string}>;
  companyName?: string; // case studies have companyName
  location?: string; // press releases have location
  showBadge?: boolean; // optional badge to show content type
  [key: string]: any;
}

// Helper function to extract plain text from portable text body
const extractPlainText = (body: any[]): string => {
  if (!body || !Array.isArray(body)) return '';
  
  let text = '';
  
  const extractFromBlock = (block: any): string => {
    if (!block) return '';
    
    // Handle text blocks
    if (block._type === 'block' && block.children) {
      return block.children
        .filter((child: any) => child._type === 'span' && typeof child.text === 'string')
        .map((child: any) => child.text)
        .join('');
    }
    
    return '';
  };
  
  for (const block of body) {
    const blockText = extractFromBlock(block);
    if (blockText) {
      text += blockText + ' ';
      // Stop if we have enough characters
      if (text.length >= 140) break;
    }
  }
  
  return text.trim().substring(0, 140);
};

export const ResourceCard: FC<ResourceCardProps> = (props) => {
  const {
    _type,
    title,
    excerpt,
    body,
    featuredImage,
    seo,
    slug,
    publishedDate,
    publishedAt,
    readTime,
    author,
    topics,
    companyName,
    showBadge = false,
  } = props;

  // Use excerpt if available, otherwise extract from body
  const displayText = excerpt || (body ? extractPlainText(body) : '');
  
  // Use featuredImage for all resource types
  const displayImage = featuredImage;
  
  // Determine slug based on resource type
  const resourceSlug = seo?.slug?.current || slug?.current || '';
  
  // Determine published date based on resource type
  const displayDate = publishedDate || publishedAt;
  
  // Get the first topic or default based on type
  const category = _type === 'caseStudy' 
    ? companyName?.toUpperCase() || 'CASE STUDY'
    : topics?.[0]?.name?.toUpperCase() || 'BLOG';
  
  // Get badge label from centralized constants
  const badgeLabel = RESOURCE_TYPE_LABELS[_type] || 'Article';
  
  const resourceUrl = `${getResourceRoute(_type)}/${resourceSlug}`;
  
  return (
    <Link href={resourceUrl} className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:shadow-lg">
      {/* Featured Image */}
      {displayImage && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            {...displayImage} 
            alt={displayImage?.alt || title || 'Resource'} 
            objectCover 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            aspectRatio="16/9" 
          />
          {/* Badge */}
          {showBadge && (
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full">
              <span className="text-xs font-semibold text-heading uppercase tracking-wide">
                {badgeLabel}
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="flex flex-col flex-grow bg-secondary-background p-4.5 lg:p-6">
        {/* Date and Category */}
        {/* <div className="flex dark items-center gap-2 text-sm font-medium text-heading mb-6">
          {publishedDate && (
            <>
              <span>{formatDate(publishedDate)}</span>
              <span className="text-body">|</span>
            </>
          )}
          <span className="text-accent">{category}</span>
        </div> */}
      
      {/* Title */}
      {title && (
        <Heading 
          as="h3" 
          size="lg" 
          weight="bold" 
          className="dark text-heading leading-tight mb-6 group-hover:text-link-hover transition-colors duration-200"
        >
          {title}
        </Heading>
      )}
      
      {/* Description */}
      {displayText && (
        <p className="dark text-md text-body leading-relaxed line-clamp-3 flex-grow mb-8">
          {displayText}
        </p>
      )}
      
        {/* Learn More Link */}
        <div className="mt-auto">
          <span className="inline-flex items-center gap-2 text-md font-medium text-link hover:text-link-hover transition-colors dark">
            Learn More
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <path d="M4.66667 11.3333L11.3333 4.66667M11.3333 4.66667H4.66667M11.3333 4.66667V11.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

