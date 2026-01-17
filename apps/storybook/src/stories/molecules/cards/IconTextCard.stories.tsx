import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "@storybook/test";
import { IconTextCard } from "@repo/ui";

const meta: Meta<typeof IconTextCard> = {
  title: "Molecules/Cards/IconTextCard",
  component: IconTextCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    icon: {
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    heading: {
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    body: {
      control: false,
      table: {
        type: { summary: "Rich text content" },
      },
    },
    button: {
      control: false,
      table: {
        type: { summary: "Storyblok button block[]" },
      },
    },
    theme: {
      control: "select",
      options: ["light", "dark", "sugar", "bright"],
      table: {
        type: { summary: "'light' | 'dark' | 'sugar' | 'bright'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconTextCard>;


export const WithIconOnly: Story = {
  args: {
    _key: "icon-text-card-icon",
    icon: "rocket",
    heading: "Fast Setup",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("Fast Setup")
    ).toBeInTheDocument();

    const svg = canvasElement.querySelector("svg");
    await expect(svg).toBeInTheDocument();

    await expect(
      canvasElement.querySelector("button")
    ).toBeNull();
  },
};


export const WithButton: Story = {
  args: {
    _key: "icon-text-card-button",
    icon: "rocket",
    heading: "Launch Faster",
    body: [{ _type: "block" }],
    button: [
      {
        label: "Get Started",
        variant: "primary",
        size: "md",
        trailingIcon: "arrow-right",
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("Launch Faster")
    ).toBeInTheDocument();

    const button = canvas.getByRole("button", {
      name: "Get Started",
    });
    await expect(button).toBeInTheDocument();

    const card = canvasElement.firstElementChild as HTMLElement;
    await expect(card.className).toContain("group");
    const use = canvasElement.querySelector("use");
    await expect(use).toBeInTheDocument();
  },
};



export const ThemeSugar: Story = {
  args: {
    _key: "icon-text-card-theme-sugar",
    heading: "Sugar Theme",
    theme: "sugar",
    button: [
      {
        label: "Explore",
        variant: "primary",
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const card = canvasElement.firstElementChild as HTMLElement;

    await expect(card).toBeInTheDocument();
    await expect(card.className).toContain("hover:bg-white");
  },
};
