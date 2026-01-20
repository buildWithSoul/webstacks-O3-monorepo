import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "@storybook/test";
import {ReadingTime} from "@repo/ui";

const meta: Meta<typeof ReadingTime> = {
  title: "Molecules/ReadingTime",
  component: ReadingTime,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    content: {
      control: false,
      table: {
        type: { summary: "PortableTextBlock[]" },
      },
    },
    className: {
      control: "text",
      table: { type: { summary: "string" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReadingTime>;

export const OneMinuteRead: Story = {
  args: {
    content: [
      {
        _type: "block",
        children: [
          { text: "This is a short piece of text with fewer than two hundred words." },
        ],
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("1 min read")).toBeVisible();
    await expect(canvas.getByText(/min read/i)).toBeVisible();
  },
};


export const IgnoresNonTextBlocks: Story = {
  args: {
    content: [
      {
        _type: "image",
        children: [{ text: "This should not count" }],
      },
      {
        _type: "block",
        children: [
          { text: Array(100).fill("word").join(" ") },
        ],
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("1 min read")).toBeVisible();
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: "uppercase",
    content: [
      {
        _type: "block",
        children: [{ text: "Simple text content" }],
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const wrapper = canvasElement.querySelector("div");
    expect(wrapper?.className).toContain("uppercase");
  },
};
