import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "@storybook/test";
import { Link } from "@repo/ui";
import type { LinkFragment } from "@repo/ui";

const meta: Meta<typeof Link> = {
  title: "Atoms/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    href: {
      control: false,
    },
    className: {
      control: "text",
    },
   
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const ValidUrl: Story = {
  args: {
    href: "https://example.com/",
    children: "External Link",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText("External Link");

    await expect(link.tagName.toLowerCase()).toBe("a");
    await expect(link).toHaveAttribute("href", "https://example.com/");
  },
};

export const MissingUrl: Story = {
  args: {
    children: "Fallback Text",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText("Fallback Text");

    await expect(text.tagName.toLowerCase()).toBe("span");
  },
};

export const InternalLink: Story = {
  args: {
    href: {
      linkType: "internal",
      internalLink: {
        cached_url: "about-us",
      },
    } as LinkFragment,
    children: "Internal Link",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText("Internal Link");

    await expect(link).toHaveAttribute("href", "/about-us");
  },
};

export const ExternalLink: Story = {
  args: {
    href: {
      linkType: "external",
      externalUrl: "https://example.com/",
      openInNewTab: true,
    } as LinkFragment,
    children: "External Link",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText("External Link");

    await expect(link).toHaveAttribute("href", "https://example.com/");
    await expect(link).toHaveAttribute("target", "_blank");
  },
};

export const AnchorLink: Story = {
  args: {
    href: {
      linkType: "anchor",
      anchorLinkId: "features",
    } as LinkFragment,
    children: "Anchor Link",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText("Anchor Link");

    await expect(link).toHaveAttribute("href", "#features");
  },
};

export const EmailLink: Story = {
  args: {
    href: {
      linktype: "email",
      email: "test@example.com",
      subject: "Hello",
    },
    children: "Email Link",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText("Email Link");

    await expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:test@example.com")
    );
  },
};

export const TargetBehavior: Story = {
  args: {
    href: {
      linkType: "external",
      externalUrl: "https://example.com",
      openInNewTab: true,
    } as LinkFragment,
    children: "New Tab Link",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText("New Tab Link");

    await expect(link).toHaveAttribute("target", "_blank");
  },
};

export const WithClassName: Story = {
  args: {
    href: "https://example.com",
    className: "uppercase",
    children: "Styled Link",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText("Styled Link");
    await expect(link).toHaveClass("uppercase");
  },
};
