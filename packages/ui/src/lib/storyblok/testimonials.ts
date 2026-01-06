// Utility functions for fetching and managing testimonial data from Storyblok

import { getAllTestimonials, getAllPersons, getTestimonialById, getPersonById } from './client';

// Types for Storyblok testimonial data
export interface StoryblokTestimonial {
  id: string;
  uuid: string;
  name: string;
  content: {
    title: string;
    quote: any; // Rich text content
    person: StoryblokPerson | string; // Can be resolved person or UUID
  };
}

export interface StoryblokPerson {
  id: string;
  uuid: string;
  name: string;
  content: {
    firstName: string;
    lastName: string;
    role?: string;
    bio?: any; // Rich text content
    company?: StoryblokCompany | string;
    image?: {
      id: string;
      filename: string;
      alt?: string;
    };
  };
}

export interface StoryblokCompany {
  id: string;
  uuid: string;
  name: string;
  content: {
    name: string;
    logo?: {
      id: string;
      filename: string;
      alt?: string;
    };
    website?: string;
  };
}

// Get all testimonials with resolved person and company data
export async function getTestimonialsWithRelations(isDraft: boolean = false) {
  try {
    const testimonials = await getAllTestimonials();
    
    // Process each testimonial to ensure relations are properly resolved
    const processedTestimonials = testimonials.map((testimonial: any) => {
      // If person is not resolved (still a UUID), fetch it
      if (typeof testimonial.content.person === 'string') {
        // This would require additional API calls, but ideally relations are resolved in the initial call
        console.warn(`Person relation not resolved for testimonial ${testimonial.uuid}`);
      }
      
      return testimonial;
    });

    return processedTestimonials;
  } catch (error) {
    console.error('Failed to fetch testimonials with relations:', error);
    return [];
  }
}

// Get all persons with resolved company data
export async function getPersonsWithRelations(isDraft: boolean = false) {
  try {
    const persons = await getAllPersons();
    
    // Process each person to ensure company relations are properly resolved
    const processedPersons = persons.map((person: any) => {
      // If company is not resolved (still a UUID), fetch it
      if (typeof person.content.company === 'string') {
        console.warn(`Company relation not resolved for person ${person.uuid}`);
      }
      
      return person;
    });

    return processedPersons;
  } catch (error) {
    console.error('Failed to fetch persons with relations:', error);
    return [];
  }
}

// Transform Storyblok testimonial data to match Sanity format
export function transformStoryblokTestimonialToSanity(storyblokTestimonial: StoryblokTestimonial): any {
  const { content } = storyblokTestimonial;
  
  // Transform person data
  let personData = null;
  if (content.person) {
    if (typeof content.person === 'object' && content.person.content) {
      // Person is resolved
      const person = content.person as StoryblokPerson;
      personData = {
        _type: 'person',
        name: `${person.content.firstName} ${person.content.lastName}`,
        role: person.content.role,
        image: person.content.image ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: person.content.image.id
          },
          alt: person.content.image.alt || ''
        } : null,
        company: person.content.company ? (typeof person.content.company === 'object' ? {
          _type: 'company',
          name: person.content.company.content.name,
          logo: person.content.company.content.logo ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: person.content.company.content.logo.id
            },
            alt: person.content.company.content.logo.alt || ''
          } : null,
          website: person.content.company.content.website
        } : null) : null
      };
    }
  }

  return {
    _type: 'testimonial',
    title: content.title,
    quote: content.quote,
    person: personData
  };
}

// Get testimonials formatted for the testimonialSlider component
export async function getTestimonialsForSlider(isDraft: boolean = false) {
  try {
    const testimonials = await getTestimonialsWithRelations(isDraft);
    
    return testimonials.map((testimonial: StoryblokTestimonial) => 
      transformStoryblokTestimonialToSanity(testimonial)
    );
  } catch (error) {
    console.error('Failed to get testimonials for slider:', error);
    return [];
  }
}

// Helper function to create testimonial slide data for Storyblok
export function createTestimonialSlide(testimonialId: string, ctaBarId?: string) {
  return {
    component: 'testimonialSlide',
    testimonial: [
      {
        id: testimonialId,
        uuid: testimonialId
      }
    ],
    ctaBar: ctaBarId ? [
      {
        id: ctaBarId,
        uuid: ctaBarId
      }
    ] : undefined
  };
}

// Helper function to create testimonial slider data for Storyblok
export function createTestimonialSlider(testimonialSlides: any[], options: {
  showAvatar?: boolean;
  showCompany?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
  displayStyle?: 'card' | 'quote' | 'minimal';
} = {}) {
  return {
    component: 'testimonialSlider',
    testimonials: testimonialSlides,
    showAvatar: options.showAvatar ?? true,
    showCompany: options.showCompany ?? true,
    autoplay: options.autoplay ?? false,
    autoplaySpeed: options.autoplaySpeed ?? 5,
    showDots: options.showDots ?? true,
    showArrows: options.showArrows ?? true,
    displayStyle: options.displayStyle ?? 'card'
  };
}
