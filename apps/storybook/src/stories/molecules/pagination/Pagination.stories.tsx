import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pagination } from '@repo/ui';
import { within, userEvent, expect } from '@storybook/test';

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      control: 'number',
      table: { type: { summary: 'number' } },
    },
    baseUrl: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalPages: 5,
    baseUrl: '/',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('1')).toBeInTheDocument();
    await expect(canvas.getByText('5')).toBeInTheDocument();
  },
};

