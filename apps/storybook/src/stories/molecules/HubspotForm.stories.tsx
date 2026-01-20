import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within, waitFor } from "@storybook/test";
import {HubspotForm} from "@repo/ui";

const meta: Meta<typeof HubspotForm> = {
  title: "Molecules/Forms/HubSpotForm",
  component: HubspotForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HubspotForm>;

export const Default: Story = {
  args: {
    portalId: import.meta.env.STORYBOOK_HUBSPOT_PORTAL_ID,
    formId: import.meta.env.STORYBOOK_HUBSPOT_FORM_ID,
   
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("Loading form...")
    ).toBeInTheDocument();
  },
};


export const WithWrapperClassName: Story = {
  args: {
    portalId: import.meta.env.STORYBOOK_HUBSPOT_PORTAL_ID,
    formId: import.meta.env.STORYBOOK_HUBSPOT_FORM_ID,
    className: "bg-purple-600 p-4",
  },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      const wrapper = canvasElement.querySelector(".hubspot-form-wrapper");
      expect(wrapper?.className).toContain("bg-purple-600");
    });
  },
};
