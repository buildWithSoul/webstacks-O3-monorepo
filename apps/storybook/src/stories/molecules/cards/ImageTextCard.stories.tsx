import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "@storybook/test";
import { ImageTextCard } from "@repo/ui";
import type { LinkFragment } from "@repo/ui";

const meta: Meta<typeof ImageTextCard> = {
  title: "Molecules/Cards/ImageTextCard",
  component: ImageTextCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    heading: {
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    image: {
      control: false,
      table: {
        type: { summary: "Storyblok image object" },
      },
    },
    body: {
      control: false,
      table: {
        type: { summary: "PortableTextBlock[]" },
      },
    },
    link: {
      control: false,
      table: {
        type: { summary: "LinkFragment" },
      },
    },
    button: {
      control: false,
      table: {
        type: { summary: "Storyblok button block[]" },
      },
    },
    theme: {
      control: "select",
      options: ["light", "dark", "sugar", "bright"],
      table: {
        type: { summary: "'light' | 'dark' | 'sugar' | 'bright'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageTextCard>;

export const WithoutLink: Story = {
  args: {
    _key: "image-text-card-default",
    image: {
      id: "1",
      filename: "https://picsum.photos/600/400",
      alt: "Card image",
    },
    heading: "Explore our Platform",
    body: [{ _type: "block" } as any],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const img = canvasElement.querySelector("img");
    await expect(img).toBeInTheDocument();

    await expect(
      canvas.getByText("Explore our Platform")
    ).toBeInTheDocument();

    const link = canvasElement.querySelector("a");
    await expect(link).toBeNull();
  },
};

export const WithLink: Story = {
  args: {
    _key: "image-text-card-custom",
    image: {
      id: "2",
      filename: "https://picsum.photos/600/400",
      alt: "Card image",
    },
    heading: "Read the Docs",
    body: [{ _type: "block" } as any],
    link: {
      label: "Learn more",
      linkType: "external",
      externalUrl: "https://example.com",
    } as LinkFragment,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const img = canvasElement.querySelector("img");
    await expect(img).toBeInTheDocument();

    await expect(
      canvas.getByText("Read the Docs")
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("Learn more")
    ).toBeInTheDocument();

    const wrapperLink = canvasElement.querySelector("a");
    await expect(wrapperLink).toBeInTheDocument();

    const iconUse = canvasElement.querySelector("use");
    await expect(iconUse?.getAttribute("href")).toContain("#arrow-right");
  },
};
