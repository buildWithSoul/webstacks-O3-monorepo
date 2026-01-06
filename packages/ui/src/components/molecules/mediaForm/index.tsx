import { ReactNode } from 'react';
import HubSpotFormComponent from '../hubspotForm';

interface MediaFormProps {
  formConfig: {
    headingText?: string;
    subheadingText?: string;
    // HubSpot configuration
    hubspotPortalId?: string;
    hubspotFormId?: string;
    // Legacy props for backward compatibility
    formId?: string;
    buttonText?: string;
    buttonColor?: string;
    redirectUrl?: string;
    formValues?: Array<{
      key: string;
      value: string;
    }>;
  };
  // Generic form support
  children?: ReactNode;
  formComponent?: ReactNode;
}

const MediaForm: React.FC<MediaFormProps> = ({ formConfig, children, formComponent }) => {
  // Show component if we have form content or if legacy formId is provided
  if (!formConfig && !children && !formComponent) {
    return null;
  }

  return (
    <div className="space-y-6">

      <div className="force-light p-6 rounded-[16px] border border-neutral-200 dark:border-purple-500 bg-white shadow-[0px_24px_48px_-12px_rgba(16,24,40,0.18)]">
        
        <div className="text-center">
          {formConfig?.headingText && (
            <>
              <h3 className="relative text-heading text-display-sm font-bold font-heading normal-case mb-2">{formConfig.headingText}</h3>
            </>
          )}
          {formConfig?.subheadingText && (
            <>
              <p className="text-body text-lg">{formConfig.subheadingText}</p>
            </>
          )}
        </div>

        {/* HubSpot Form */}
        {formConfig?.hubspotFormId ? (
          <HubSpotFormComponent
            portalId={formConfig.hubspotPortalId || '1907998'}
            formId={formConfig.hubspotFormId}
            redirectUrl={formConfig.redirectUrl}
          />
        ) : (children || formComponent) ? (
          formComponent || children
        ) : (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">No form component provided</p>
            <p className="text-xs text-gray-500 mt-1">Add HubSpot IDs or pass a form component via `formComponent` prop or `children`</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaForm;
