import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BlogPagination } from '@repo/ui';
import { useState } from 'react';
import { within, userEvent, expect } from '@storybook/test';

const meta: Meta<typeof BlogPagination> = {
  title: 'Molecules/BlogPagination',
  component: BlogPagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
      table: { type: { summary: 'number' } },
    },
    totalItems: {
      control: 'number',
      table: { type: { summary: 'number' } },
    },
    itemsPerPage: {
      control: 'number',
      table: { type: { summary: 'number' } },
    },
    onPageChange: {
      action: 'onPageChange',
      table: { type: { summary: '(page: number) => void' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BlogPagination>;

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);

    return (
      <BlogPagination
        {...args}
        currentPage={page}
        onPageChange={(p) => {
          args.onPageChange(p);
          setPage(p);
        }}
      />
    );
  },
  args: {
    currentPage: 3,
    totalItems: 100,
    itemsPerPage: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Page 1')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Page 10')).toBeInTheDocument();
  },
};

export const FirstPage: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);

    return (
      <BlogPagination
        {...args}
        currentPage={page}
        onPageChange={setPage}
      />
    );
  },
  args: {
    currentPage: 1,
    totalItems: 50,
    itemsPerPage: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Previous page')).toBeDisabled();
    await expect(canvas.getByLabelText('Next page')).toBeEnabled();
  },
};

export const LastPage: Story = {
  render: (args) => {
    const totalPages = Math.ceil(args.totalItems / args.itemsPerPage);
    const [page, setPage] = useState(totalPages);

    return (
      <BlogPagination
        {...args}
        currentPage={page}
        onPageChange={setPage}
      />
    );
  },
  args: {
    currentPage: 10,
    totalItems: 100,
    itemsPerPage: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Next page')).toBeDisabled();
    await expect(canvas.getByLabelText('Previous page')).toBeEnabled();
  },
};

