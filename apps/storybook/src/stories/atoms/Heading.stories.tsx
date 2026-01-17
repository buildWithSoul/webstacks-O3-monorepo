import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "@storybook/test";
import { Heading } from "@repo/ui";

const meta: Meta<typeof Heading> = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Heading component supporting semantic levels, responsive sizes, font variants, text transforms, and custom styling.",
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      table: {
        type: { summary: "h1 - h6" },
      },
    },
    size: {
      control: "select",
      options: [
        "2xs",
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
      ],
      table: {
        type: { summary: "2xs - 7xl" },
      },
    },
    headingSize: {
      control: "select",
      options: [
        "2xs",
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
      ],
      table: {
        type: { summary: "2xs - 7xl" },
      },
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
    },
    fontFamily: {
      control: "select",
      options: ["display", "accent", "body", "eyebrow"],
    },
    textTransform: {
      control: "select",
      options: ["none", "uppercase", "lowercase", "capitalize"],
    },
    className: {
      control: "text",
      
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: "Default Heading",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading", { level: 2 });

    await expect(heading).toBeInTheDocument();
    await expect(heading).toHaveTextContent("Default Heading");
  },
};

export const CustomHeadingLevel: Story = {
  args: {
    as: "h4",
    children: "Section Title",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading", { level: 4 });

    await expect(heading).toBeInTheDocument();
    await expect(heading.tagName.toLowerCase()).toBe("h4");
  },
};

export const DefaultSizeApplied: Story = {
  args: {
    children: "Default Size",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading");

    await expect(heading.className).toContain("text-display-");
  },
};

export const HeadingSizeOverride: Story = {
  args: {
    headingSize: "5xl",
    children: "Big Heading",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading");

    await expect(heading.className).toContain("text-display-5xl");
  },
};

export const VariantStyles: Story = {
  args: {
    children: "Styled Heading",
    weight: "bold",
    fontFamily: "accent",
    textTransform: "uppercase",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading");

    await expect(heading.className).toContain("font-bold");
    await expect(heading.className).toContain("font-heading-accent");
    await expect(heading.className).toContain("uppercase");
  },
};

export const WithCustomClassName: Story = {
  args: {
    children: "Custom Styled Heading",
    className: "uppercase",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading");

    await expect(heading).toHaveClass("uppercase");
  },
};

export const InvalidHeadingTag: Story = {
  args: {
    // @ts-expect-error 
    as: "section",
    children: "Invalid Heading",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByText("Invalid Heading")).not.toBeInTheDocument();
  },
};
