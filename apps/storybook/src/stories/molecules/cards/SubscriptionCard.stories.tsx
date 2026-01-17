import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "@storybook/test";
import { SubscriptionCard } from "@repo/ui";

const meta: Meta<typeof SubscriptionCard> = {
  title: "Molecules/Cards/SubscriptionCard",
  component: SubscriptionCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    title: "Join our Newsletter",
    description: "Get weekly updates and product news.",
    placeholder: "Your work email",
    buttonText: "Subscribe Now",
  },
  argTypes: {
    title: {
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Subscribe via Email" },
      },
    },
    description: {
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: {
          summary:
            "Subscribe to our blog to get insights sent directly to your inbox.",
        },
      },
    },
    placeholder: {
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Enter your email" },
      },
    },
    buttonText: {
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Book a Demo" },
      },
    },
    onSubmit: {
      control: false,
      table: {
        type: { summary: "(email: string) => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SubscriptionCard>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("Join our Newsletter")
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("Get weekly updates and product news.")
    ).toBeInTheDocument();

    await expect(
      canvas.getByPlaceholderText("Your work email")
    ).toBeInTheDocument();

    const button = canvas.getByRole("button", {
      name: "Subscribe Now",
    });

    await expect(button).toBeInTheDocument();
    await expect(button.className).toContain("w-full");

    const use = canvasElement.querySelector("use");
    await expect(use).toBeInTheDocument();
    await expect(use?.getAttribute("href")).toContain("#arrow-right");
  },
};

export const CustomProps: Story = {
  args: {
    title: "Product Updates",
    description: "Monthly release notes, tips, and improvements.",
    placeholder: "Email address",
    buttonText: "Notify Me",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("Product Updates")
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("Monthly release notes, tips, and improvements.")
    ).toBeInTheDocument();

    await expect(
      canvas.getByPlaceholderText("Email address")
    ).toBeInTheDocument();

    const button = canvas.getByRole("button", {
      name: "Notify Me",
    });

    await expect(button).toBeInTheDocument();
    await expect(button.className).toContain("w-full");

    const use = canvasElement.querySelector("use");
    await expect(use).toBeInTheDocument();
    await expect(use?.getAttribute("href")).toContain("#arrow-right");
  },
};