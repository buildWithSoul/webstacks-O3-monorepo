import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "@storybook/test";
import { Badge } from "@repo/ui";

const meta: Meta<typeof Badge> = {
  title: "Molecules/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "secondary"],
      table : {
        type :{
            summary : 'primary | secondary'
        }
      }
    },
    iconPosition: {
      control: "select",
      options: ["start", "end"],
      table: {
    type: {
      summary: 'start | end',
    },
  },
    },
    label: {
      control: "text",
    },
    icon: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: "New",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("New");

    await expect(badge).toBeInTheDocument();
  },
};

export const PrimaryTone: Story = {
  args: {
    label: "Primary",
    tone: "primary",
  },
  play: async ({ canvasElement }) => {
    const badge = canvasElement.querySelector("div");

    await expect(badge).toHaveClass("bg-badge-primary");
  },
};

export const SecondaryTone: Story = {
  args: {
    label: "Secondary",
    tone: "secondary",
  },
  play: async ({ canvasElement }) => {
    const badge = canvasElement.querySelector("div");

    await expect(badge).toHaveClass("bg-badge-secondary");
  },
};

export const IconAtStart: Story = {
  args: {
    label: "With Icon",
    icon: "arrow-right",
    iconPosition: "start",
  },
  play: async ({ canvasElement }) => {
    const badge = canvasElement.querySelector("div");
    const svg = badge?.querySelector("svg");

    await expect(svg).toBeInTheDocument();
    await expect(badge?.firstElementChild?.tagName.toLowerCase()).toBe("div");
  },
};

export const IconAtEnd: Story = {
  args: {
    label: "With Icon",
    icon: "arrow-right",
    iconPosition: "end",
  },
  play: async ({ canvasElement }) => {
    const badge = canvasElement.querySelector("div");
    const children = badge?.children;

    await expect(children?.[children.length - 1].querySelector("svg")).toBeInTheDocument();
  },
};

export const NoIconWhenPositionMissing: Story = {
  args: {
    label: "No Icon",
    icon: "arrow-right",
  },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector("svg");

    await expect(svg).toBeNull();
  },
};

export const PassesCorrectIconName: Story = {
  args: {
    label: "Icon Test",
    icon: "check",
    iconPosition: "start",
  },
  play: async ({ canvasElement }) => {
    const use = canvasElement.querySelector("use");

    await expect(use).toBeInTheDocument();
    await expect(use?.getAttribute("href")).toContain("#check");
  },
};
