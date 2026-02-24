import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchFilters } from "@repo/ui";
import { useState } from "react";
import { userEvent, within, expect } from "@storybook/test";

const meta: Meta<typeof SearchFilters> = {
  title: "Organisms/SearchFilters",
  component: SearchFilters,
  tags: ["autodocs"],
 argTypes: {
  searchValue: {
    control: "text",
    description: "Current value of the search input",
  },
  searchPlaceholder: {
    control: "text",
    description: "Placeholder text for the search input",
  },
  actionLabel: {
    control: "text",
    description: "Label for the primary action button",
  },
  selects: {
    control: "object",
    description: "List of dropdown filter configurations",
  },
  onSearchChange: {
    action: "searchChange",
    description: "Callback fired when search value changes",
  },
  onAction: {
    action: "actionClick",
    description: "Callback fired when action button is clicked",
  },
  onClose: {
    action: "closeClick",
    description: "Callback fired when close button is clicked",
  },
 
},

};

export default meta;

type Story = StoryObj<typeof SearchFilters>;

const baseSelectOptions = [
  { value: "one", label: "Option One" },
  { value: "two", label: "Option Two" },
  { value: "three", label: "Option Three" },
];

export const Default: Story = {
  render: (args) => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<Record<string, string | string[]>>({
      filter1: "",
      filter2: "",
      filter3: "",
      filter4: "",
    });

    return (
      <SearchFilters
        {...args}
        searchValue={search}
        onSearchChange={setSearch}
        selects={args.selects?.map((s) => ({
          ...s,
          value: filters[s.id],
          onChange: (val) =>
            setFilters((prev) => ({ ...prev, [s.id]: val })),
        }))}
      />
    );
  },
  args: {
    searchPlaceholder: "Search…",
    actionLabel: "Search",
    selects: [
      {
        id: "filter1",
        placeholder: "placeholder@placeholder.com",
        options: baseSelectOptions,
      },
      {
        id: "filter2",
        placeholder: "placeholder@placeholder.com",
        options: baseSelectOptions,
      },
      {
        id: "filter3",
        placeholder: "placeholder@placeholder.com",
        options: baseSelectOptions,
      },
      {
        id: "filter4",
        placeholder: "placeholder@placeholder.com",
        options: baseSelectOptions,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const searchInput = canvas.getByPlaceholderText("Search…");
    await user.type(searchInput, "test query");
    await expect(searchInput).toHaveValue("test query");

    const buttons = canvas.getAllByRole("button", { name: "Search" });
    await user.click(buttons[0]);
  },
};

export const WithoutFilters: Story = {
  args: {
    searchPlaceholder: "Search…",
    actionLabel: "Search",
    selects: [],
  },
};
