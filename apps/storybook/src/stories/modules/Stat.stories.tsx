import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StatItem } from '@repo/ui'

const meta: Meta<typeof StatItem> = {
  title: 'Modules/StatItem',
  component: StatItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['nested', 'metric'],
    },
  blok:{
   control :false
  }
  },
  args: {
    variant: 'nested',
    blok: {
      _uid: 'stat-1',
      prefix: '',
      value: '3,000',
      suffix: '',
      description: 'STAT CAPTION',
    },
  },
}

export default meta
type Story = StoryObj<typeof StatItem>


export const NestedStat: Story = {
  args: {
    variant: 'nested',
    blok: {
      _uid: 'stat-2',
      value: '3,000',
      description: 'STAT CAPTION',
    },
  },
}

export const MetricStat: Story = {
  args: {
    variant: 'metric',
    blok: {
      _uid: 'stat-3',
      value: '76',
      suffix: '%',
      description: 'STAT CAPTION',
    },
  },
}

