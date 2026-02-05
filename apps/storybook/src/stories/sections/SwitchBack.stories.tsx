import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { within, expect } from "@storybook/test";
import { Switchback } from "@repo/ui";

const mockEyebrow = {
  _uid: "eyebrow-1",
  component: "eyebrow",
  text: "Why teams choose us",
};

const mockHeading = {
  _uid: "heading-1",
  component: "heading",
  heading: "Build faster with confidence",
  elementType: "h2",
};

const mockBody = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Our platform helps teams ship better products with speed and clarity.",
        },
      ],
    },
  ],
};

const mockImage = {
  filename:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200",
  alt: "Team working together",
};

const basePlay: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByText("Build faster with confidence")
  ).toBeInTheDocument();

  await expect(canvas.getByText(/ship better products/i)).toBeInTheDocument();
};

const meta: Meta<typeof Switchback> = {
  title: "Sections/Switchback",
  component: Switchback,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "desktop",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    reverse: {
      control: "boolean",
      table: { category: "Layout" },
    },
    pixelAccent: {
      control: "boolean",
      table: { category: "Appearance" },
    },
    mediaType: {
      control: false,
      options: ["image", "video"],
      table: { category: "Media" },
    },

    heading: { control: false },
    imageAlt: { control: false },

    eyebrow: { control: false },
    body: { control: false },
    image: { control: false },
    video: { control: false },

    _uid: { table: { disable: true } },
    component: { table: { disable: true } },
    editable: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Switchback>;

export const Default: Story = {
  args: {
    eyebrow: mockEyebrow,
    heading: mockHeading,
    body: mockBody,
    mediaType: "image",
    image: mockImage,
    imageAlt: "Team collaboration",
  },
  play: basePlay,
};

export const Reverse: Story = {
  ...Default,
  args: {
    ...Default.args,
    reverse: true,
  },
};
