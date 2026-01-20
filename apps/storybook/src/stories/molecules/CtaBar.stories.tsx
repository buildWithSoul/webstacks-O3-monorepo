import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "@storybook/test";
import {CTABar} from "@repo/ui";

const meta: Meta<typeof CTABar> = {
  title: "Molecules/CTABar",
  component: CTABar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    buttons: {
      control: false,
      table: {
        type: { summary: "Storyblok button block[]" },
      },
    },
    className: {
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CTABar>;

export const Default: Story = {
  args: {
    buttons: [
      {
        label: "Get Started",
        variant: "primary",
        size: "md",
      },
      {
        label: "Contact Sales",
        variant: "secondary",
        size: "md",
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttons = canvas.getAllByRole("button");
    await expect(buttons.length).toBe(2);

    await expect(
      canvas.getByRole("button", { name: "Get Started" })
    ).toBeInTheDocument();

    await expect(
      canvas.getByRole("button", { name: "Contact Sales" })
    ).toBeInTheDocument();
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: "text-sm",
    buttons: [
      {
        label: "Learn More",
        variant: "primary",
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const container = canvasElement.firstElementChild as HTMLElement;
    await expect(container).toBeInTheDocument();
    await expect(container.className).toContain("text-sm");

    const button = within(container).getByRole("button", {
      name: "Learn More",
    });
    await expect(button).toBeInTheDocument();
  },
};
