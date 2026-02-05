'use client';
import { FC, ReactNode } from 'react';
import { SanityPageContent } from '../../../types/sanity';
import { Eyebrow } from '../../atoms';
import { RichText } from '../../molecules/richText/richText';
import HubSpotFormComponent from '../../molecules/hubspotForm';
import { renderHeading } from '../../../utils/headingUtils';

export interface FormBlockProps extends SanityPageContent {
  heading?: any;
  eyebrow?: any;
  body?: any;
  // Generic form support - can accept any form component or children
  children?: ReactNode;
  formComponent?: ReactNode;
  // HubSpot form configuration
  hubspotPortalId?: string;
  hubspotFormId?: string;
  redirectUrl?: string;
  // Form reference from Sanity
  form?: {
    _id: string;
    name: string;
    hubspotFormId?: string;
    redirectUrl?: string;
  };
  reverse?: boolean;
}

export const FormBlock: FC<FormBlockProps> = ({ 
  heading, 
  eyebrow, 
  body, 
  children, 
  formComponent, 
  form,
  hubspotPortalId,
  hubspotFormId,
  redirectUrl,
  reverse 
}) => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 lg:justify-center">
        <div className="flex w-full flex-col justify-center gap-4 lg:w-[500px] shrink-0">
          {eyebrow?.eyebrow && (
            <Eyebrow
              text={eyebrow.eyebrow} 
              as={(eyebrow.elementType || 'h6') as 'h6' | 'span' | 'div'}
            />
          )}
          {heading && renderHeading(heading)}

          {body && (
            <RichText doc={body}  />
          )}
        </div>
        <div className="w-full lg:w-[652px] shrink-0">
          {/* HubSpot Form - check both direct props and form object */}
          {(hubspotPortalId && hubspotFormId) || (form?.hubspotFormId) ? (
            <HubSpotFormComponent
              portalId={hubspotPortalId || '1907998'}
              formId={hubspotFormId || form?.hubspotFormId || ''}
              redirectUrl={redirectUrl || form?.redirectUrl}
            />
          ) : (children || formComponent) ? (
            <>{formComponent || children}</>
          ) : (
            // Fallback: Show a placeholder
            <div className="text-center text-disabled">
              <p>Form component not provided</p>
              <p className="text-sm mt-2">Add HubSpot IDs or pass a form component via the `formComponent` prop or `children`</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
