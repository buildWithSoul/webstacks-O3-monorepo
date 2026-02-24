import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormBlock } from "@repo/ui";

const meta: Meta<typeof FormBlock> = {
  title: "Sections/FormBlock",
  component: FormBlock,
  tags: ["autodocs"],
  parameters: {
    layout:'fullscreen'
  },
  argTypes: {
    heading: { control: false },
    description: { control: false },
    buttons: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof FormBlock>;
export const Default: Story = {
  args: {
    heading: [
      {
        _uid: "heading-1",
        component: "heading",
        heading: "Let's get started" ,
        elementType: "h1",
        headingSize: "6xl",
        fontFamily: "display",
      },
    ],
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
        tone: "secondary"  ,
      },
    ],
  } as any,
};
