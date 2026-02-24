import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ConversionPanel } from "@repo/ui";

const meta: Meta<typeof ConversionPanel> = {
  title: "Sections/ConversionPanel",
  component: ConversionPanel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "ConversionPanel is a centered CTA block with heading, description, and up to two buttons.",
      },
    },
  },
  argTypes: {
    heading: {
      control: "text",
      description: "Main heading text",
    },
    description: {
      control: false,
      description: "Storyblok RichText description",
    },
    buttons: {
      control: false,
      description: "Buttons block (max 2)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConversionPanel>;

export const Default: Story = {
  args: {
    heading: "Let's get started",
    description: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Talk with our experts to start your website transformation.",
            },
          ],
        },
      ],
    },
    buttons: [
      {
        _uid: "btn-1",
        label: "Get Started",
        href: "/get-started",
        tone: "primary",
      },
      {
        _uid: "btn-2",
        label: "Learn More",
        href: "/learn-more",
        tone: "secondary",
      },
    ],
  } as any,
};


