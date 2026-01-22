import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { within, expect } from "@storybook/test";

import { Layout } from "@repo/ui";

const LayoutWrapper = async ({ children }: { children: React.ReactNode }) => {
  return await Layout({ children });
};

const meta: Meta<typeof LayoutWrapper> = {
  title: "Sections/AppLayout",
  component: LayoutWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof LayoutWrapper>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-8 my-6">
        <h1 className="my-6">Page content</h1>
        <p>This is the main content area</p>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole("banner")).toBeInTheDocument();

    expect(canvas.getByText("Page content")).toBeInTheDocument();

    expect(canvasElement.querySelector("footer")).toBeTruthy();
  },
};
