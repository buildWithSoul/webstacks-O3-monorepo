import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SelectComponent, SelectItem } from "@repo/ui";
import { Icon } from "@repo/ui";
import React, { useState } from "react";
import { within, userEvent, expect, waitFor } from "@storybook/test";

const meta: Meta<typeof SelectComponent> = {
  title: "Molecules/Select",
  component: SelectComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: false,
      table: { type: { summary: "SelectItem[]" } },
    },
    multiple: {
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    value: {
      control: false,
      table: { type: { summary: "string | string[]" } },
    },
    defaultValue: {
      control: false,
      table: { type: { summary: "string | string[]" } },
    },
    onValueChange: {
      control: false,
      table: { type: { summary: "(value: string | string[]) => void" } },
    },
    placeholder: {
      control: "text",
      table: { type: { summary: "string" } },
    },
    disabled: {
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectComponent>;

const countryItems: SelectItem[] = [
  {
    value: "us",
    label: "United States",
    icon: <Icon icon="globe" size={16} />,
  },
  { value: "ca", label: "Canada", icon: <Icon icon="globe" size={16} /> },
  {
    value: "uk",
    label: "United Kingdom",
    icon: <Icon icon="globe" size={16} />,
  },
];

const techItems: SelectItem[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
];

const priorityItems: SelectItem[] = [
  {
    value: "low",
    label: "Low Priority",
    icon: <Icon icon="circle" size={16} />,
  },
  {
    value: "high",
    label: "High Priority",
    icon: <Icon icon="alert-triangle" size={16} />,
  },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <SelectComponent
        items={techItems}
        placeholder="Select an option"
        value={value}
        onValueChange={setValue}
      />
    );
  },
  play: async () => {
    const canvas = within(document.body);

    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);

    const dropdown = within(document.body);
    const option = dropdown.getByRole("option", { name: "React" });

    await userEvent.click(option);
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("us");
    return (
      <SelectComponent
        items={countryItems}
        placeholder="Select country"
        value={value}
        onValueChange={setValue}
      />
    );
  },
  play: async () => {
    const canvas = within(document.body);
    await expect(canvas.getByText("United States")).toBeVisible();
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <SelectComponent
        multiple
        items={techItems}
        placeholder="Select options"
        value={values}
        onValueChange={setValues}
      />
    );
  },
  play: async () => {
    const canvas = within(document.body);

    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);

    const dropdown = within(document.body);

    await userEvent.click(dropdown.getByRole("checkbox", { name: "React" }));
    await userEvent.click(dropdown.getByRole("checkbox", { name: "Vue.js" }));
  },
};

export const ClearAll: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(["react", "vue"]);
    return (
      <SelectComponent
        multiple
        items={techItems}
        placeholder="Select frameworks"
        value={values}
        onValueChange={setValues}
      />
    );
  },
  play: async () => {
    const canvas = within(document.body);

    const trigger = document.body.querySelector(
      'button[aria-haspopup="dialog"]'
    ) as HTMLElement;

    await userEvent.click(trigger);

    const dropdown = within(document.body);
    await userEvent.click(dropdown.getByText("Clear all"));


  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState("react");
    return (
      <SelectComponent
        items={techItems}
        placeholder="Select framework"
        value={value}
        onValueChange={setValue}
        disabled
      />
    );
  },
  play: async () => {
    const canvas = within(document.body);
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeDisabled();
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <SelectComponent
        items={priorityItems}
        placeholder="Select priority"
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const Positioning: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="flex flex-col items-center gap-8">
        <SelectComponent
          items={techItems}
          placeholder="Top positioned"
          value={value}
          onValueChange={setValue}
          side="top"
          align="center"
        />
        <SelectComponent
          items={techItems}
          placeholder="End aligned"
          value={value}
          onValueChange={setValue}
          side="bottom"
          align="end"
        />
      </div>
    );
  },
};
