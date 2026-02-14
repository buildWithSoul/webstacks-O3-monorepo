import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tab } from "@repo/ui";

const meta: Meta<typeof Tab> = {
  title: "Molecules/Tab",
  component: Tab,
  tags: ["autodocs"],
  args: {
    title: "Tab Title",
    active: true,
    size: "l",
    showIcon: false,
  },
  argTypes: {
    title: {
      control: "text",
      description: "Tab label text",
    },
    active: {
      control: "boolean",
      description: "Active or inactive state",
    },
    size: {
      control: { type: "radio" },
      options: ["s", "l"],
      description: "Size of the tab item",
      table: {
        type: { summary: `'s' | 'l'` },
        defaultValue: { summary: "l" },
      },
    },
    showIcon: {
      control: "boolean",
      description: "Show chevron icon",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "16",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tab>;
export const Default: Story = {};

export const Inactive: Story = {
  args: {
    active: false,
  },
};

export const WithIconActive: Story = {
  args: {
    showIcon: true,
    active: true,
  },
};

export const WithIconInactive: Story = {
  args: {
    showIcon: true,
    active: false,
  },
};
