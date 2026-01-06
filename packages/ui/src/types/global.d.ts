type StripMaybe<T> = Exclude<T, undefined | null | never>;

interface Window {
  intellimize?: {
    activate: () => void;
    sendEvent: (event: string) => void;
    push: (callback: () => void) => void;
    ready: (callback: () => void) => void;
  };
}

// Third-party module declarations
declare module 'react-hubspot-form' {
  import { ComponentType } from 'react';

  interface HubspotFormProps {
    portalId: string;
    formId: string;
    target?: string;
    redirectUrl?: string;
    onReady?: (form: any) => void;
    onSubmit?: (data: any) => void;
    loading?: React.ReactNode;
  }

  const HubspotForm: ComponentType<HubspotFormProps>;
  export default HubspotForm;
}
