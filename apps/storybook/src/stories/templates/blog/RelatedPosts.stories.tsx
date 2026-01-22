import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {RelatedPosts} from '@repo/ui';
import { within, expect } from '@storybook/test';
import { mockBlogPosts } from './blogData';

const meta: Meta<typeof RelatedPosts> = {
  title: 'Templates/Blog/RelatedPosts',
  component: RelatedPosts,
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
type Story = StoryObj<typeof RelatedPosts>;

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
      canvas.getByRole('link', { name: 'React Performance Tips' }),
    ).toHaveAttribute('href', expect.stringContaining('react-performance-tips'));
  },
};

