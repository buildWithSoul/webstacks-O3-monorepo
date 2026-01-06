# HubSpot Form Component

A React wrapper for HubSpot forms using `react-hubspot-form`.

## Usage

### Basic Usage

```tsx
import HubSpotFormComponent from '@/components/molecules/hubspotForm';

<HubSpotFormComponent
  portalId="YOUR_PORTAL_ID"
  formId="YOUR_FORM_GUID"
/>
```

### With MediaForm

The `MediaForm` component now automatically supports HubSpot forms:

```tsx
import MediaForm from '@/components/molecules/mediaForm';

<MediaForm
  formConfig={{
    headingText: "Get in Touch",
    subheadingText: "Fill out the form below",
    hubspotPortalId: "YOUR_PORTAL_ID",
    hubspotFormId: "YOUR_FORM_GUID",
    redirectUrl: "/thank-you"
  }}
/>
```

### Advanced Usage with Callbacks

```tsx
<HubSpotFormComponent
  portalId="YOUR_PORTAL_ID"
  formId="YOUR_FORM_GUID"
  redirectUrl="/thank-you"
  onReady={(form) => {
    console.log('Form is ready', form);
  }}
  onSubmit={(data) => {
    console.log('Form submitted', data);
    // Track analytics, etc.
  }}
  loading={<div>Custom loading...</div>}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `portalId` | `string` | Yes | Your HubSpot Portal ID |
| `formId` | `string` | Yes | Your HubSpot Form GUID |
| `target` | `string` | No | Target element ID for form rendering |
| `redirectUrl` | `string` | No | URL to redirect after successful submission |
| `className` | `string` | No | Additional CSS classes |
| `onReady` | `function` | No | Callback when form is ready |
| `onSubmit` | `function` | No | Callback on form submission |
| `loading` | `ReactNode` | No | Custom loading component |

## Finding Your HubSpot IDs

### Portal ID
1. Go to Settings in HubSpot
2. Navigate to Account Setup → Account Defaults
3. Your Portal ID (Hub ID) is displayed

### Form ID
1. Go to Marketing → Lead Capture → Forms
2. Click on your form
3. Click "Share" or "Embed"
4. Find the form GUID in the embed code: `formId: "FORM-GUID-HERE"`

## Styling

The component includes default styling that matches the design system. You can customize further by:

1. Overriding the CSS in `hubspot-form.css`
2. Adding custom classes via the `className` prop
3. Using CSS custom properties for theme colors

## Environment Variables (Optional)

For cleaner code, you can store your Portal ID in environment variables:

```env
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your-portal-id
```

Then use it:

```tsx
<HubSpotFormComponent
  portalId={process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID!}
  formId="your-form-id"
/>
```

## Notes

- The component is client-side only (`'use client'`)
- Forms are loaded asynchronously from HubSpot
- Ensure your HubSpot forms are published and accessible
- The form respects HubSpot's validation and GDPR settings
