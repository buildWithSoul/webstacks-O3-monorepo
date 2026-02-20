import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { within, expect } from "@storybook/test";
import { HeadingBlock } from "@repo/ui";

const mockEyebrow = [
  {
    _uid: "eyebrow-1",
    component: "eyebrow",
    eyebrow: "EYEBROW EXAMPLE",
    elementType: "span",
  },
];

const mockHeading = [
  {
    _uid: "heading-1",
    component: "heading",
    heading: "Where performance meets possibility",
    elementType: "h1",
    headingSize: "6xl",
    fontFamily: "display",
  },
];

const mockBody = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text:
            "Every website should be built to evolve. From the first line of code to the final interaction, it’s a living product designed to adapt, scale, and drive growth over time.",
        },
      ],
    },
  ],
} as any;

const meta: Meta<typeof HeadingBlock> = {
  title: "Sections/HeadingBlock",
  component: HeadingBlock,
  tags: ["autodocs"],
parameters : {
  layout : 'fullscreen'
},
  argTypes: {
    variant: {
      description: "Layout variant",
      control: { type: "radio" },
      options: ["centered", "leading", "split"],
      table: {
        category: "Layout",
      },
    },
    eyebrow: {
      description: "Eyebrow block (Storyblok)",
      control: false,
      table: {
        category: "Content",
        type: { summary: "Blocks[]" },
      },
    },
    heading: {
      description: "Heading block (Storyblok)",
      control: false,
      table: {
        category: "Content",
        type: { summary: "Blocks[]" },
      },
    },
    body: {
      description: "Body content (RichText)",
      control: false,
      table: {
        category: "Content",
        type: { summary: "RichTextContent" },
      },
    },
    _uid: { table: { disable: true } },
    component: { table: { disable: true } },
    editable: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof HeadingBlock>;

const basePlay: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByText("Where performance meets possibility")
  ).toBeInTheDocument();

  await expect(
    canvas.getByText("EYEBROW EXAMPLE")
  ).toBeInTheDocument();
};

export const Default: Story = {
  args: {
    eyebrow: mockEyebrow,
    heading: mockHeading,
    body: mockBody,
    variant: "centered",
  },
  play: basePlay,
};

export const Leading: Story = {
  args: {
    ...Default.args,
    variant: "leading",
  },
};
export const Split: Story = {
  args: {
    ...Default.args,
    variant: "split",
  },
};
