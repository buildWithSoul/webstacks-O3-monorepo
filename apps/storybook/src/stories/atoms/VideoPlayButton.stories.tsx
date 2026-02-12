import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { VideoPlayButton } from "@repo/ui";

const meta: Meta<typeof VideoPlayButton> = {
  title: "Atoms/VideoPlayButton",
  component: VideoPlayButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof VideoPlayButton>;

export const Default: Story = {
};
