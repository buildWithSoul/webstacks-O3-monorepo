import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Dropdown } from "@repo/ui";

const meta: Meta<typeof Dropdown> = {
  title: "Molecules/Dropdown",
  component: Dropdown,
 decorators: [
    (Story) => (
      <div
        style={{
          width: "300px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags:['autodocs']
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const options = [
  {
    value: "blog",
    label: "Blog",
    description: "Search Description",
  },
  {
    value: "news",
    label: "News",
    description: "Search Description",
  },
  {
    value: "docs",
    label: "Docs",
    description: "Search Description",
  },
];



const ControlledSingle = (args: any) => {
  const [value, setValue] = useState<string | undefined>();
  return <Dropdown {...args} value={value} onChange={setValue} />;
};

const ControlledMulti = (args: any) => {
  const [value, setValue] = useState<string[]>([]);
  return <Dropdown {...args} value={value} onChange={setValue} />;
};



export const SingleSelect: Story = {
  render: ControlledSingle,
  args: {
    label: "EMAIL",
    placeholder: "placeholder@placeholder.com",
    hint: "This is a hint text to help user.",
    options,
  },
};



export const Disabled: Story = {
  args: {
    label: "EMAIL",
    value: "blog",
    disabled: true,
    hint: "This is a hint text to help user.",
    options,
  },
};

export const ErrorPlaceholder: Story = {
  render: ControlledSingle,
  args: {
    label: "EMAIL",
    placeholder: "placeholder@placeholder.com",
    error: "This is a hint text to help user.",
    options,
  },
};



export const MultiSelect: Story = {
  render: ControlledMulti,
  args: {
    label: "EMAIL",
    multiple: true,
    hint: "This is a hint text to help user.",
    options,
  },
};

