import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InlineIcon } from '@repo/ui';
import { motionValue } from 'framer-motion';
import { expect } from '@storybook/test';

const meta: Meta<typeof InlineIcon> = {
  title: 'Molecules/InlineIcon',
  component: InlineIcon,
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      table: { type: { summary: '{ icon: string }' } },
    },
    index: {
      control: 'number',
      table: { type: { summary: 'number' } },
    },
    totalChars: {
      control: 'number',
      table: { type: { summary: 'number' } },
    },
    scrollYProgress: {
      control: false,
      table: { type: { summary: 'MotionValue<number>' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InlineIcon>;

export const Static: Story = {
  args: {
    value: { icon: 'rocket' },
  },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    expect(svg).toBeInTheDocument();
  },
};

export const WithScrollAnimation: Story = {
  render: (args) => {
    const progress = motionValue(0);
    setTimeout(() => progress.set(1), 300);
    return <InlineIcon {...args} scrollYProgress={progress} />;
  },
  args: {
    value: { icon: 'heart' },
    index: 0,
    totalChars: 5,
  },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    expect(svg).toBeInTheDocument();
  },
};

export const RocketLaunch: Story = {
  render: (args) => {
    const progress = motionValue(0);
    setTimeout(() => progress.set(1), 1000);
    return <InlineIcon {...args} scrollYProgress={progress} />;
  },
  args: {
    value: { icon: 'rocket' },
    index: 2,
    totalChars: 6,
  },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    expect(svg).toBeInTheDocument();
  },
};



