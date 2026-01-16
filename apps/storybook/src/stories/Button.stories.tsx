import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { within, userEvent, expect } from "@storybook/test";
import { Button } from "@repo/ui";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  args: {
    label: "Button",
    size: "md",
    mode: "filled",
    tone: "primary",
    fullWidth: false,
    disabled: false,
  },
  argTypes: {
    label: { control: "text" },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    mode: { control: "select", options: ["filled", "stroke", "bleed", "link"] },
    tone: { control: "select", options: ["primary", "secondary"] },
    variant: {
      control: "select",
      options: ["primary", "secondary", "link", "bleed"],
    },
    fullWidth: { control: "boolean" },
    leadingIcon: { control: "text" },
    trailingIcon: { control: "text" },
    asLink: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button")).toBeInTheDocument();
  },
};

export const WithChildren: Story = {
  render: () => <Button>Child Content</Button>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Child Content")).toBeInTheDocument();
  },
};

export const FilledPrimary: Story = {
  args: { mode: "filled", tone: "primary", label: "Primary Filled" },
};

export const FilledSecondary: Story = {
  args: { mode: "filled", tone: "secondary", label: "Secondary Filled" },
};

export const Stroke: Story = {
  args: { mode: "stroke", label: "Stroke Button" },
};

export const Bleed: Story = {
  args: { mode: "bleed", label: "Bleed Button" },
};

export const LinkStyleAutoArrow: Story = {
  args: { mode: "link", tone: "primary", label: "Link Button" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    const svg = button.querySelector("svg");

    expect(button).toBeInTheDocument();
    expect(svg).toBeInTheDocument();
  },
};


export const InternalLink: Story = {
  args: {
    label: "Internal Link",
    linkType: "internal",
    internalLink: {
      id: "1",
      url: "/about",
      cached_url: "about",
      linktype: "story",
      fieldtype: "multilink",
    },
    asLink: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");
    await expect(link).toHaveAttribute("href", "/about");
  },
};

export const ExternalLink: Story = {
  args: {
    label: "External Link",
    linkType: "external",
    externalUrl: "https://example.com",
    openInNewTab: true,
    asLink: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");
    await expect(link).toHaveAttribute("target", "_blank");
  },
};

export const AnchorLink: Story = {
  args: {
    label: "Anchor Link",
    linkType: "anchor",
    anchorLinkId: "section",
  },
 play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");
    await expect(link).toHaveAttribute("href");
  },
};

export const WithLeadingIcon: Story = {
  args: { label: "Leading Icon", leadingIcon: "check" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await expect(button).toContainHTML('svg')
  },
};

export const WithTrailingIcon: Story = {
  args: { label: "Trailing Icon", trailingIcon: "arrow-right" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await expect(button).toContainHTML('svg')
  },
};

export const FullWidth: Story = {
  args: { fullWidth: true, label: "Full Width Button" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button")).toHaveClass('w-full');
  },
};

const PopupForm = () => (
  <form aria-label="contact form">
    <label>
      Email
      <input type="email" />
    </label>
    <button type="submit">Submit</button>
  </form>
);

export const PopupButton: Story = {
  args: {
    label: "Open Popup",
    linkType: "popup",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
  },
};

export const Disabled: Story = {
  args: { label: "Disabled Button", disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button")).toBeDisabled();
  },
};
