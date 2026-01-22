import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { VideoBlock } from "@repo/ui";
import { within, expect, userEvent, waitFor } from "@storybook/test";

const meta: Meta<typeof VideoBlock> = {
  title: "Sections/VideoBlock",
  component: VideoBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["full", "large", "medium", "small"],
      table: {
        type: { summary: `'full' | 'large' | 'medium' | 'small'` },
        defaultValue: { summary: "full" },
      },
    },
    autoPlay: {
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    loop: {
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    muted: {
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    controls: {
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    video: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof VideoBlock>;

export const YouTube: Story = {
  args: {
    size: "large",
    video: {
      videoType: "youtube",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTitle(/youtube video player/i)).toBeInTheDocument();
  },
};

export const Wistia: Story = {
  args: {
    size: "medium",
    video: {
      videoType: "wistia",
      wistiaUrl: "https://fast.wistia.net/embed/iframe/kdhsjzoap5",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTitle(/wistia video player/i)).toBeInTheDocument();
  },
};

export const MP4WithPoster: Story = {
  args: {
    size: "medium",
    video: {
      videoType: "mp4",
      videoFile: {
        asset: {
          url: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
      },
      thumbnail: {
        asset: {
          url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const overlay = canvasElement.querySelector(
      'div[style*="background-image"]'
    );

    expect(overlay).toBeInTheDocument();

    const video = canvasElement.querySelector("video");
    expect(video).toBeInTheDocument();
  },
};

export const MP4PlayInteraction: Story = {
  args: {
    size: "small",
    video: {
      videoType: "mp4",
      videoFile: {
        asset: {
          url: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
      },
      thumbnail: {
        asset: {
          url: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const overlay = canvasElement.querySelector(
      'div[style*="background-image"]'
    ) as HTMLElement;

    expect(overlay).toBeInTheDocument();

    await userEvent.click(overlay);

    await waitFor(() => {
      expect(
        canvasElement.querySelector('div[style*="background-image"]')
      ).not.toBeInTheDocument();
    });

    const video = canvasElement.querySelector("video");
    expect(video).toBeInTheDocument();
  },
};

export const SizeVariants: Story = {
  args: {
    size: "small",
    video: {
      videoType: "youtube",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTitle(/youtube video player/i)).toBeInTheDocument();
  },
};
