import { renderRichText } from '@storyblok/react';
import { headingVariants } from '../components/atoms/heading';

/**
 * Renders eyebrow content with proper styling
 */
export const renderEyebrow = (eyebrow: any) => {
  if (!eyebrow?.eyebrow) {
    return null;
  }

  const eyebrowContent = typeof eyebrow.eyebrow === 'object' 
    ? renderRichText(eyebrow.eyebrow)
    : eyebrow.eyebrow;

  return (
    <div className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">
      {eyebrowContent}
    </div>
  );
};

/**
 * Renders heading content with proper styling and variants
 */
export const renderHeading = (heading: any) => {
  if (!heading) {
    return null;
  }

  // Handle Storyblok nested heading component (array with heading object)
  if (Array.isArray(heading) && heading.length > 0 && heading[0].heading) {
    const headingComponent = heading[0];
    
    // Handle rich text or string
    const headingContent = typeof headingComponent.heading === 'object' 
      ? renderRichText(headingComponent.heading)
      : headingComponent.heading;
    
    return (
      <div 
        className={headingVariants({ 
          size: headingComponent.headingSize || '4xl', 
          fontFamily: headingComponent.fontFamily || 'accent', 
          textTransform: headingComponent.fontFamily === 'grotesk' || headingComponent.fontFamily === 'display' ? 'uppercase' : 'none' 
        })}
        dangerouslySetInnerHTML={{ __html: headingContent }}
      />
    );
  }

  // Handle rich text heading object with component
  if (heading.heading && heading.headingComponent) {
    const headingComponent = heading.headingComponent;
    const headingContent = typeof heading.heading === 'object' 
      ? renderRichText(heading.heading)
      : heading.heading;
    
    return (
      <div 
        className={headingVariants({ 
          size: headingComponent.headingSize || '4xl', 
          fontFamily: headingComponent.fontFamily || 'accent', 
          textTransform: headingComponent.fontFamily === 'grotesk' || headingComponent.fontFamily === 'display' ? 'uppercase' : 'none' 
        })}
        dangerouslySetInnerHTML={{ __html: headingContent }}
      />
    );
  }
  
  // Handle simple heading object
  if (heading.heading) {
    // Handle rich text or string
    const headingContent = typeof heading.heading === 'object' 
      ? renderRichText(heading.heading)
      : heading.heading;
    
    return (
      <div 
        className={headingVariants({ 
          size: heading.headingSize || '4xl', 
          fontFamily: heading.fontFamily || 'accent', 
          textTransform: heading.fontFamily === 'grotesk' || heading.fontFamily === 'display' ? 'uppercase' : 'none' 
        })}
        dangerouslySetInnerHTML={{ __html: headingContent }}
      />
    );
  }

  return null;
};
