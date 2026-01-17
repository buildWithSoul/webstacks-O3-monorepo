import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "@storybook/test";
import { TopicTag } from "@repo/ui";

const meta: Meta<typeof TopicTag> = {
  title: "Atoms/TopicTag",
  component: TopicTag,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    text: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["default", "muted", "accent"],
      table:{
        type : {summary : "default | muted | accent"}
      }
    },
    className: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopicTag>;

export const DefaultVariant: Story = {
  args: {
    text: "Design Systems",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText("Design Systems");

    await expect(tag).toBeInTheDocument();
    await expect(tag.className).toContain("border-[var(--borderColor-default)] text-[var(--fgColor-onEmphasis)]");
    await expect(tag.className).toContain("text-[var(--fgColor-onEmphasis)]");
  },
};

export const MutedVariant: Story = {
  args: {
    text: "Accessibility",
    variant: "muted",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText("Accessibility");

    await expect(tag.className).toContain("border-[var(--borderColor-muted)]");
    await expect(tag.className).toContain("text-[var(--fgColor-muted)]");
  },
};

export const AccentVariant: Story = {
  args: {
    text: "Performance",
    variant: "accent",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText("Performance");

    await expect(tag.className).toContain("border-[var(--borderColor-accent-muted)]");
    await expect(tag.className).toContain("text-[var(--fgColor-accent)]");
  },
};

export const WithClassName: Story = {
  args: {
    text: "Custom",
    className: "uppercase",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText("Custom");

    await expect(tag).toHaveClass("uppercase");
  },
};

export const PassThroughProps: Story = {
  args: {
    text: "With ID",
    id: "topic-tag-id",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText("With ID");

    await expect(tag).toHaveAttribute("id", "topic-tag-id");
  },
};
