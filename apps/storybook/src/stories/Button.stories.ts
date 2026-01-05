import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@repo/ui";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click me",
    appName: "Storybook",
  },
};

export const CustomText: Story = {
  args: {
    children: "Submit",
    appName: "My App",
  },
};
