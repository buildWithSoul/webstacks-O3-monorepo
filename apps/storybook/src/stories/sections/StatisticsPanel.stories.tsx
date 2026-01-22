import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatisticsPanel } from '@repo/ui';
import { within, expect } from '@storybook/test';

const storyblokStatistics = [
  {
    component: 'statistic',
    prefix: '',
    value: '120',
    suffix: '+',
    description: 'Enterprise clients',
  },
  {
    component: 'statistic',
    prefix: '$',
    value: '5',
    suffix: 'M',
    description: 'Annual revenue',
  },
  {
    component: 'statistic',
    prefix: '',
    value: '99',
    suffix: '%',
    description: 'Customer satisfaction',
  },
];


const meta: Meta<typeof StatisticsPanel> = {
  title: 'Sections/StatisticsPanel',
  component: StatisticsPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    statistics: {
      control: false,
      table: {
        type: {
          summary: 'Storyblok statistics array',
        },
      },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      table: {
        type: {
          summary: `'light' | 'dark'`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatisticsPanel>;

export const Default: Story = {
  args: {
    statistics: storyblokStatistics,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getAllByText(/clients|revenue|satisfaction/i).length,
    ).toBeGreaterThan(0);
  },
};


export const TwoColumnLayout: Story = {
  args: {
    statistics: storyblokStatistics.slice(0, 2),
  },
  play: async ({ canvasElement }) => {
    const grid = canvasElement.querySelector('[data-blok-field="statistics"]');

    expect(grid).toHaveClass('md:grid-cols-2');
  },
};

export const FourColumnLayout: Story = {
  args: {
    statistics: [
      ...storyblokStatistics,
      {
        prefix: '',
        value: '50',
        suffix: '+',
        description: 'Global partners',
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const grid = canvasElement.querySelector('[data-blok-field="statistics"]');

    expect(grid).toHaveClass('md:grid-cols-4');
  },
};


