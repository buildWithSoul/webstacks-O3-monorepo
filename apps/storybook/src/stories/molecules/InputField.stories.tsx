import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputField } from "@repo/ui";

const meta: Meta<typeof InputField> = {
  title: "Molecules/InputField",
  component: InputField,
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#F6F3EF",
        }}
      >
        <div
          style={{
            padding: "24px",
            width: "400px",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    variant: "text",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label displayed above the field",
    },
    hint: {
      control: "text",
      description: "Helper text shown below the field",
    },
    error: {
      control: "text",
      description: "Error message (overrides hint)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disables the field",
    },
    variant: {
      control: { type: "radio" },
      options: ["text", "select", "textarea"],
      description: "Input field variant",
      table: {
        type: { summary: `"text" | "select" | "textarea"` },
        defaultValue: { summary: "text" },
      },
    },
    rows: {
      control: { type: "number", min: 2, max: 10 },
      description: "Number of rows (textarea only)",
      if: { arg: "variant", eq: "textarea" },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: '3' },
      },
    },
    className: {
      control: "text",
      description: "Optional class overrides",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Placeholder: Story = {
  args: {
    label: "EMAIL",
    placeholder: "placeholder@placeholder.com",
    hint: "This is a hint text to help user.",
  },
};

export const Filled: Story = {
  args: {
    label: "EMAIL",
    value: "placeholder@placeholder.com",
    hint: "This is a hint text to help user.",
  },
};

export const Disabled: Story = {
  args: {
    label: "EMAIL",
    value: "placeholder@placeholder.com",
    hint: "This is a hint text to help user.",
    disabled: true,
  },
};

export const ErrorPlaceholder: Story = {
  args: {
    label: "EMAIL",
    placeholder: "placeholder@placeholder.com",
    error: "This is a hint text to help user.",
  },
};

export const ErrorFilled: Story = {
  args: {
    label: "EMAIL",
    value: "placeholder@placeholder.com",
    error: "This is a hint text to help user.",
  },
};

export const SelectVariant: Story = {
  args: {
    label: "CATEGORY",
    placeholder: "Select category",
    variant: "select",
    hint: "Choose one option",
    readOnly: true,
  },
};

export const Textarea: Story = {
  args: {
    label: "DESCRIPTION",
    placeholder: "Enter description",
    variant: "textarea",
    rows: 4,
    hint: "Max 500 characters",
  },
};

export const TextareaError: Story = {
  args: {
    label: "DESCRIPTION",
    placeholder: "Enter description",
    variant: "textarea",
    rows: 4,
    error: "Description is required",
  },
};
