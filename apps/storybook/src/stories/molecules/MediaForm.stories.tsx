import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { within } from "@storybook/test";
import { MediaForm } from "@repo/ui";

const meta: Meta<typeof MediaForm> = {
  title: "Molecules/Forms/MediaForm",
  component: MediaForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    formConfig: {
      control: false,
      table: {
        type: {
          summary: "MediaFormConfig",
    
        },
      },
    },
    children: {
      control: false,
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    formComponent: {
      control: false,
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MediaForm>;


const MockForm = () => (
  <form className="space-y-4">
    <input placeholder="Email" className="w-full border px-3 py-2 rounded" />
    <button type="button" className="px-4 py-2 bg-black text-white rounded">
      Submit
    </button>
  </form>
);

export const WithHeadingAndFormComponent: Story = {
  args: {
    formConfig: {
      headingText: "Get early access",
      subheadingText: "Leave your email and we’ll reach out",
    },
    formComponent: <MockForm />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText("Get early access");
    await canvas.findByText("Leave your email and we’ll reach out");
    await canvas.findByPlaceholderText("Email");
  },
};


export const WithChildrenFallback: Story = {
  args: {
    formConfig: {
      headingText: "Contact us",
    },
    children: <MockForm />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText("Contact us");
    await canvas.findByPlaceholderText("Email");
  },
};
export const WithHubSpotForm: Story = {
  args: {
    formConfig: {
      headingText: "Join the newsletter",
      subheadingText: "Powered by HubSpot",
     hubspotPortalId: import.meta.env.STORYBOOK_HUBSPOT_PORTAL_ID, 
      hubspotFormId: import.meta.env.STORYBOOK_HUBSPOT_FORM_ID,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText("Join the newsletter");
    await canvas.findByText("Powered by HubSpot");
  },
};

export const EmptyState: Story = {
  args: {
    formConfig: {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText("No form component provided");
    await canvas.findByText(
      "Add HubSpot IDs or pass a form component via `formComponent` prop or `children`"
    );
  },
};
