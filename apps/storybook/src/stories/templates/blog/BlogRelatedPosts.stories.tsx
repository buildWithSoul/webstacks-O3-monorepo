import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {BlogRelatedPosts} from '@repo/ui';
import { within, expect } from '@storybook/test';
import { mockBlogPosts } from './blogData';

const meta: Meta<typeof BlogRelatedPosts> = {
  title: 'Templates/Blog/BlogRelatedPosts',
  component: BlogRelatedPosts,
  tags: ['autodocs'],
  argTypes: {
    posts: {
      control: false,
      table: {
        type: {
          summary: 'BlogPost[]',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BlogRelatedPosts>;

export const Default: Story = {
  args: {
    posts: mockBlogPosts,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole('heading', { name: /related posts/i }),
    ).toBeInTheDocument();

    expect(
      canvas.getAllByText(/tips|guide|scale|accessibility/i).length,
    ).toBeGreaterThan(0);
  },
};

export const MaxFourItems: Story = {
  args: {
    posts: [...mockBlogPosts, ...mockBlogPosts],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const links = canvas.getAllByRole('link');

    expect(links.length).toBeLessThanOrEqual(4);
  },
};



