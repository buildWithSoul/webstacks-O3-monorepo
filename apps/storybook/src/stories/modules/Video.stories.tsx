import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Video } from "@repo/ui";

const meta: Meta<typeof Video> = {
  title: "Modules/Video",
  component: Video,
  argTypes: {
    video: { control: false, description: "Storyblok video asset" },
    thumbnail: { control: false, description: "Storyblok thumbnail" },
    autoPlay: { control: "boolean", description: "Autoplay video" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Video>;

export const Default: Story = {
  args: {
    video: {
        filename: "",
        id: "v1",
        name: ""
    },
    thumbnail: {
        filename: "",
        alt: "",
        id: "v2",
        name: ""
    },
    autoPlay: false,
  },
};
