import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "@storybook/test";
import { Image } from "@repo/ui";
import type { ImageProps } from "@repo/ui";

const meta: Meta<typeof Image> = {
  title: "Molecules/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    asset: { control: false },
    alt: { control: "text" },
    caption: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
    aspectRatio: { control: "text" },
    unsetRatio: { control: "boolean" },
    unsetMaxWidth: { control: "boolean" },
    noFill: { control: "boolean" },
    objectCover: { control: "boolean" },
    objectContain: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

const baseArgs: ImageProps = {
  _type: "image",
  alt: "image",
  asset: {
    _ref: "image-1",
    _type: "reference",
    url: "https://picsum.photos/600/400",
    metadata: {
      dimensions: {
        width: 600,
        height: 400,
        aspectRatio: 1.5,
      },
    },
  },
};


export const Default: Story = {
  args: {
    ...baseArgs,
  },
  play: async ({ canvasElement }) => {
    const img = canvasElement.querySelector("img");
    const picture = canvasElement.querySelector("picture") as HTMLElement;

    expect(img).toBeInTheDocument();
    expect(picture.style.maxWidth).toContain("600px");
    expect(picture.style.aspectRatio).toBe("1.5 / 1");
  },
};


export const Customized: Story = {
  args: {
    ...baseArgs,
    aspectRatio: "16/9",
    noFill: true,
    objectCover: true,
    className: "filter-pattern",
    caption: 'Image'
  },
  play: async ({ canvasElement }) => {
    const img = canvasElement.querySelector("img") as HTMLImageElement;
    const picture = canvasElement.querySelector("picture") as HTMLElement;

    expect(picture.style.aspectRatio).toBe("16 / 9");
    expect(img.getAttribute("width")).toBe("600");
    expect(img.getAttribute("height")).toBe("400");
    expect(img.className).toContain("object-cover");
    expect(picture.className).toContain("filter-pattern");
  },
};
