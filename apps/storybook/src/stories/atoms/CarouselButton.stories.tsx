import { CarouselButton } from "@repo/ui";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof CarouselButton> = {
  title: "Atoms/CarouselButton",
  component: CarouselButton,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "radio",
      options: ["left", "right"],
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof CarouselButton>;

export const Left: Story = {
  args: {
    direction: "left",
  },
};

export const Right: Story = {
  args: {
    direction: "right",
  },
};

export const Disabled: Story = {
  args: {
    direction: "right",
    disabled: true,
  },
};
