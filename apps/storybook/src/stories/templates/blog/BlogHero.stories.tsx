import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BlogHero } from '@repo/ui';
import { within, expect } from '@storybook/test';
import { mockBlogPosts } from './blogData';

const meta: Meta<typeof BlogHero> = {
  title: 'Templates/Blog/BlogHero',
  component: BlogHero,
  tags: ['autodocs'],
  argTypes: {
    post: {
      control: false,
      table: {
        type: {
          summary: 'BlogPost',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BlogHero>;

export const Default: Story = {
  args: {
    post: mockBlogPosts[0] ,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole('heading', { level: 1 }),
    ).toBeInTheDocument();

    expect(
      canvas.getByText('React Performance Tips'),
    ).toBeInTheDocument();
  },
};

