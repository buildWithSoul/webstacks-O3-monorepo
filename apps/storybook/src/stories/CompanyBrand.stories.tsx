import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "@storybook/test";
import {CompanyBrand} from "@repo/ui";
import type { CompanyBrandProps } from "@repo/ui";

const mockImage = (url: string, alt: string) =>
  ({
    _type: "image",
    asset: {
      _ref: "image-asset-id",
      _type: "reference",
      url,
    },
    alt,
  }) as const;



const company: CompanyBrandProps["company"] = {
  _id: "1",
  _type: "company",
  name: "Acme Inc",
  logoOnLight: mockImage(
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    "Acme Light Logo"
  ),
  logoOnDark: mockImage(
    "https://img.icons8.com/ios_filled/1200/slack-new.jpg",
    "Acme Dark Logo"
  ),
 
 
};

const meta: Meta<CompanyBrandProps> = {
  title: "Atoms/CompanyBrand",
  component: CompanyBrand,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays a company brand logo with support for light/dark variants, sizing, forced color filters, and custom styling.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["onLight", "onDark"],
      table: {
        type: { summary: "'onLight' | 'onDark'" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "smPlus", "md", "lg"],
      table: {
        type: { summary: "'sm' | 'smPlus' | 'md' | 'lg'" },
        defaultValue: { summary: "md" },
      },
    },
    forceColor: {
      control: "select",
      options: ["white", "bright", "teal", "pink", "purple"],
      table: {
        type: { summary: `white | bright | teal | pink | purple` },
      },
    },
    className: {
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    company: {
      control: false,
      table: {
        type: { summary: "company" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CompanyBrandProps>;


export const OnLightVariant: Story = {
  args: {
    company,
    variant: "onLight",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole("img", { name: /light/i });
    await expect(img).toBeInTheDocument();
  },
};

export const OnDarkVariant: Story = {
  args: {
    company,
    variant: "onDark",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole("img", { name: /dark/i });
    await expect(img).toBeInTheDocument();
  },
};



export const ForcedColor: Story = {
  args: {
    company,
    forceColor: 'teal',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole("img");
    await expect(img.style.filter).not.toBe("");
  },
};

export const Sizes: Story = {
  args: {
    company,
    size: "lg",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole("img");
    await expect(img).toHaveAttribute("width");
    await expect(img).toHaveAttribute("height");
  },
};

export const WithClassName: Story = {
  args: {
    company,
    className: "p-4",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole("img");
    await expect(img).toHaveClass("p-4");
  },
};
