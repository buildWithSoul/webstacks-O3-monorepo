'use client';

import { useState, useEffect } from 'react';
import HubspotForm from 'react-hubspot-form';
import type { FC } from 'react';
// import './hubspot-form.css';

interface HubSpotFormProps {
  /** HubSpot Portal ID */
  portalId: string;
  /** HubSpot Form ID/GUID */
  formId: string;
  /** Target element ID for form rendering */
  target?: string;
  /** Redirect URL after form submission */
  redirectUrl?: string;
  /** CSS class for styling */
  className?: string;
  /** Callback when form is ready */
  onReady?: (form: any) => void;
  /** Callback on form submission */
  onSubmit?: (data: any) => void;
  /** Custom loading component */
  loading?: React.ReactNode;
}

const HubSpotFormComponent: FC<HubSpotFormProps> = ({
  portalId,
  formId,
  target,
  redirectUrl,
  className = '',
  onReady,
  onSubmit,
  loading = <div className="text-center py-8">Loading form...</div>,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render on client to avoid hydration mismatch
  if (!isClient) {
    return <div className={`hubspot-form-wrapper ${className}`}>{loading}</div>;
  }

  return (
    <div className={`hubspot-form-wrapper ${className}`}>
      <HubspotForm
        portalId={portalId}
        formId={formId}
        target={target}
        redirectUrl={redirectUrl}
        onReady={onReady}
        onSubmit={onSubmit}
        loading={loading}
      />
    </div>
  );
};

export default HubSpotFormComponent;
