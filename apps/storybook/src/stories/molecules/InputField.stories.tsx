import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputField } from "@repo/ui";

const meta: Meta<typeof InputField> = {
  title: "Molecules/InputField",
  component: InputField,
  decorators: [
    (Story) => (
      <div  style={{
        background: '#F6F3EF' ,
        width:'100vw',

        }}>
        <div
          style={{
          padding:'24px',
            width: "300px",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
    argTypes: {
    label: {
      control: "text",
      description: "Label displayed above the input",
    },
    hint: {
      control: "text",
      description: "Helper text shown below the input",
    },
    error: {
      control: "text",
      description: "Error message (overrides hint)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text inside the input",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input field",
    },
     variant: {
      control: { type: "radio" },
      options: ["text", "select"],
      description: "Visual variant of the input",
    },
},
  parameters:{
    layout: 'fullscreen'
  },
  tags:['autodocs']
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
