import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Radio } from "@repo/ui";

const meta: Meta<typeof Radio> = {
  title: "Atoms/Radio",
  component: Radio,
  args: {
    label: "Remember me",
    disabled: false,
    error: false,
    size: "sm",
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Controls the checked state of the radio",
    },
    disabled: {
      control: "boolean",
      description: "Disables the radio",
    },
    error: {
      control: "boolean",
      description: "Shows the radio in an error state",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md"],
      description: "Controls the size of the radio",
    },
    label: {
      control: "text",
      description: "Label displayed next to the radio",
    },
    labelClassName: {
      control: "text",
      description: "Additional classes for the label",
    },
    className: {
      control: "text",
      description: "Additional classes for the radio input",
    },
    id: {
      control: "text",
    },
    name: {
      control: "text",
    },
    value: {
      control: "text",
    },
    onChange: {
      description: "Callback fired when the checked state changes",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const ErrorChecked: Story = {
  args: {
    error: true,
    checked: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Radio {...args} size="sm" label="Small radio" />
      <Radio {...args} size="md" label="Medium radio" />
    </div>
  ),
};


