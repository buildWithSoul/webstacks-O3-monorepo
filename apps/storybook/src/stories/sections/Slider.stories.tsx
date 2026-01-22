import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ResourceSlider } from "@repo/ui";
import type { ResourceSliderProps } from "@repo/ui";
import { within, expect, userEvent, waitFor } from "@storybook/test";

const mockItems: ResourceSliderProps["items"] = [
  {
    _id: "post-1",
    _type: "blogPost",
    title: "Introducing Our New Platform",
    excerpt: "Learn about our latest platform update.",
    publishedDate: "2024-01-01",
    seo: {
      title: "New Platform",
      description: "Latest platform update",
    },
    featuredImage: {
      _type: "image",

      asset: {
        _ref: "_",
        _type: "reference",
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      },
      alt: "Code editor",
    },
  },
  {
    _id: "post-2",
    _type: "blogPost",
    title: "Scaling React Applications",
    excerpt: "Best practices for scaling React apps.",
    publishedDate: "2024-01-02",
    seo: {
      title: "Scaling React",
      description: "React scaling strategies",
    },
  },
  {
    _id: "post-3",
    _type: "blogPost",
    title: "Design Systems Done Right",
    excerpt: "How to build maintainable design systems.",
    publishedDate: "2024-01-03",
    seo: {
      title: "Design Systems",
      description: "Maintainable design systems",
    },
  },
];

const meta: Meta<typeof ResourceSlider> = {
  title: "Sections/ResourceSlider",
  component: ResourceSlider,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div>
        <main>
          <Story />
        </main>
      </div>
    ),
  ],
  argTypes: {
    items: {
      control: false,
      table: {
        type: {
          summary: "BlogPost[]",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResourceSlider>;

export const Default: Story = {
  args: {
    items: mockItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
   expect(
  canvas.getByRole('group', { name: /featured content/i }),
).toBeInTheDocument();

expect(
  canvas.getAllByRole('heading', { level: 2 }).length,
).toBeGreaterThan(0);

  },
};



