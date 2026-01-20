import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "@storybook/test";
import {LottieAnimation} from "@repo/ui";

const meta: Meta<typeof LottieAnimation> = {
  title: "Molecules/LottieAnimation",
  component: LottieAnimation,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
        }}
      >
        <Story />
      </div>
    ),
  ],  

  argTypes: {
    file: {
      control: false,
      table: { type: { summary: "LottieFile" } },
    },
    className: {
      control: "text",
      table: { type: { summary: "string" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LottieAnimation>;

export const Default: Story = {
  args: {
    file: {
      asset: {
        url: "/lottie.json",
      },
    },
  },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      const svg = canvasElement.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  },
};

export const WithCustomClassName: Story = {
  args: {
    file: {
      asset: {
        url: "/lottie.json",
      },
    },
    className: "rounded-lg border",
  },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      const svg = canvasElement.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    const container = canvasElement.querySelector("div.w-full") as HTMLElement;

    expect(container).toBeInTheDocument();
    expect(container.className).toContain("rounded-lg");
    expect(container.className).toContain("border");
    
  },
};

export const Fallback: Story = {
  args: {
    file: {},
  },
  play: async ({ canvasElement }) => {
    const fallback = canvasElement.querySelector(".animate-pulse");
    expect(fallback).toBeInTheDocument();
  },
};
