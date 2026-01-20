import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import  {TableModule } from '@repo/ui';
import type { TableProps } from '@repo/ui';
import { within, expect } from '@storybook/test';


const meta: Meta<typeof TableModule> = {
  title: 'Molecules/TableModule',
  component: TableModule,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    headers: {
      control: false,
      table: { type: { summary: 'TableProps["headers"]' } },
    },
    rows: {
      control: false,
      table: { type: { summary: 'TableProps["rows"]' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableModule>;

const baseArgs: TableProps = {
  _type: 'table',
  _key: '1',
  headers: [
    { _key: '1', text: 'Name', alignment: 'left' },
    { _key: '2', text: 'Role', alignment: 'center' },
    { _key: '3', text: 'Location', alignment: 'left' },
  ],
  rows: [
    {
      _key: '1',
      cells: [
        { _key: 'c1', content: 'John Doe' },
        { _key: 'c2', content: 'Developer' },
        { _key: 'c3', content: 'Remote' },
      ],
    },
    {
      _key: '2',
      cells: [
        { _key: '4', content: 'Jane Smith' },
        { _key: '5', content: 'Designer' },
        { _key: '6', content: 'Berlin' },
      ],
    },
  ],
};

export const Default: Story = {
  args: baseArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Name')).toBeInTheDocument();
    await expect(canvas.getByText('Role')).toBeInTheDocument();
    await expect(canvas.getByText('Location')).toBeInTheDocument();

    await expect(canvas.getByText('John Doe')).toBeInTheDocument();
    await expect(canvas.getByText('Designer')).toBeInTheDocument();
  },
};


export const NoHeaders: Story = {
  args: {
    ...baseArgs,
    headers: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByRole('columnheader')).toBeNull();
    await expect(canvas.getByText('Jane Smith')).toBeInTheDocument();
  },
};

export const NoRows: Story = {
  args: {
    ...baseArgs,
    rows: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Name')).toBeInTheDocument();
    await expect(canvas.queryByText('John Doe')).toBeNull();
  },
};
