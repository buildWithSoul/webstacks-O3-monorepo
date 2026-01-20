import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {ShareButtons} from '@repo/ui';
import { within, expect } from '@storybook/test';

const meta: Meta<typeof ShareButtons> = {
  title: 'Molecules/ShareButtons',
  component: ShareButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    pathName: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    title: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShareButtons>;

const args = {
  pathName: 'https://example.com/blog/my-post',
  title: 'Shareable content',
};

export const Default: Story = {
  args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const twitter = canvas.getByLabelText('Share on Twitter');
    const facebook = canvas.getByLabelText('Share on Facebook');
    const linkedin = canvas.getByLabelText('Share on LinkedIn');
    const email = canvas.getByLabelText('Share via Email');

    await expect(twitter).toBeInTheDocument();
    await expect(facebook).toBeInTheDocument();
    await expect(linkedin).toBeInTheDocument();
    await expect(email).toBeInTheDocument();
  },
};


