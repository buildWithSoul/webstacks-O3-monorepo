import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "@storybook/test";
import { HR } from "@repo/ui";

const meta: Meta<typeof HR> = {
  title: "Atoms/HR",
  component: HR,
  tags: ["autodocs"],
  
};

export default meta;
type Story = StoryObj<typeof HR>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const divider = canvas.getByRole("separator");

    await expect(divider).toBeInTheDocument();
    await expect(divider).toHaveClass("border-mud-500");
    await expect(divider).toHaveClass("border-dashed");
    await expect(divider).toHaveClass("my-4");
  },
};
