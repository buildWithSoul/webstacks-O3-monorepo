import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Brand, StoryblokSiteSettings, StoryblokAsset } from "@repo/ui";
import { within, expect } from "@storybook/test";

const meta: Meta<typeof Brand> = {
  title: "Atoms/Brand",
  component: Brand,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A brand logo component that displays different logos based on theme variant and handles fallback.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["light", "dark"],
      description: "Theme variant that determines which logo to display",
      table: {
        type: { summary: "'light' | 'dark'" },
        defaultValue: { summary: "light" },
      },
    },
    width: {
      control: { type: "number", min: 16, max: 400, step: 8 },
      description: "Custom width for the logo (overrides default sizing)",
      table: {
        type: { summary: "number" },
      },
    },
    height: {
      control: { type: "number", min: 16, max: 400, step: 8 },
      description: "Custom height for the logo (overrides default sizing)",
      table: {
        type: { summary: "number" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
      table: {
        type: { summary: "string" },
      },
    },
    siteSettings: {
      description: "Site configuration containing logo assets and site name",
      control: { type: "object" },
      table: {
        type: { summary: "StoryblokSiteSettings" },
      },
    },
  },

};

export default meta;
type Story = StoryObj<typeof Brand>;

// Mock Data
const createMockStoryblokAsset = (
  filename: string | undefined,
  alt = ""
): StoryblokAsset => ({
  id: 123456,
  alt,
  name: "logo",
  focus: "",
  title: "Logo",
  source: "",
  filename: filename as any,
  copyright: "",
  fieldtype: "asset",
  meta_data: {},
  is_external_url: true,
});

const slackLightLogo =
  "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg";

const slackDarkLogo = "https://img.icons8.com/ios_filled/1200/slack-new.jpg";

const mockSiteSettings: StoryblokSiteSettings = {
  siteName: "Slack",
  logotypeOnLight: createMockStoryblokAsset(slackLightLogo, "Slack Logo"),
  logotypeOnDark: createMockStoryblokAsset(slackDarkLogo, "Slack Logo"),
  _uid: "slack",
  component: "siteSettings",
};

export const Default: Story = {
  args: {
    siteSettings: mockSiteSettings,
    variant: "light",
  },
  parameters: {
    docs: {
      storyDescription: "Default light variant with standard dimensions.",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const img = canvas.getByRole("img", { name: /slack/i });
    await expect(img).toBeInTheDocument();
    await expect(img).toHaveAttribute(
      "src",
     await  expect.stringContaining("Slack_icon_2019.svg")
    );
  },
};

export const DarkVariant: Story = {
  name: "Dark Variant",
  args: {
    siteSettings: mockSiteSettings,
    variant: "dark",
  },
  
};


export const CustomDimensions: Story = {
  name: "Custom Dimensions",
  args: {
    siteSettings: mockSiteSettings,
    width: 200,
    height: 40,
  },
  play :async ({canvasElement})=>{
    const canvas = within(canvasElement);
    const img = canvas.getByRole("img");
    await  expect(img).toHaveAttribute('width')
    await  expect(img).toHaveAttribute('height')
  }
};

export const DarkFallbackToLight: Story = {
  name: "Dark Fallback to Light",
  args: {
    siteSettings: {
      ...mockSiteSettings,
      logotypeOnDark: undefined,
    },
    variant: "dark",
  }
};

export const WithStyling: Story = {
  name: "With Custom Styling",
  args: {
    siteSettings: mockSiteSettings,
    className: "p-4 rounded-lg shadow-lg",
  }
};

export const MissingLogos: Story = {
  name: "Missing Logo",
  args: {
    siteSettings: {
      ...mockSiteSettings,
      logotypeOnLight: createMockStoryblokAsset(undefined, "Invalid Logo"),
      logotypeOnDark: createMockStoryblokAsset(undefined, "Invalid Logo"),
    },
  },
   play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.queryByRole("img")
    ).not.toBeInTheDocument();

    await expect(
      canvas.getByText("Slack")
    ).toBeInTheDocument();
  },
 
};
