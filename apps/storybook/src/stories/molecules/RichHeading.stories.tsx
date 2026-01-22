import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {RichHeading} from '@repo/ui';
import { within, expect } from '@storybook/test';

const meta: Meta<typeof RichHeading> = {
  title: 'Molecules/RichHeading',
  component: RichHeading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'number', min: 1, max: 6 },
      table: { type: { summary: '1 | 2 | 3 | 4 | 5 | 6' } },
    },
    className: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    preventObserver: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    children: {
      control: 'text',
      table: { type: { summary: 'ReactNode' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RichHeading>;

export const Level1: Story = {
  args: {
    level: 1,
    children: 'Heading One',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading', { level: 1 });
    await expect(heading.tagName).toBe('H1');
    await expect(heading?.id).toBe('toc-heading-one');
  },
};

export const Level6: Story = {
  args: {
    level: 6,
    children: 'Heading Six',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading', { level: 6 });
    await expect(heading.tagName).toBe('H6');

  },
};



export const CustomClassName: Story = {
  args: {
    level: 3,
    className: 'font-bold uppercase',
    children: 'Styled Heading',
  },
  play: async ({ canvasElement }) => {
    const heading = canvasElement.querySelector('h3');
    await expect(heading?.className).toContain('font-bold uppercase');
  },
};


