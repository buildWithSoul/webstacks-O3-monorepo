import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StatsBar } from '@repo/ui'

const meta: Meta<typeof StatsBar> = {
  title: 'Sections/StatsBar',
  component: StatsBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags:['autodocs']
}

export default meta
type Story = StoryObj<typeof StatsBar>

const baseBlok = {
  _uid: 'stats-bar-1',
  component: 'stats_bar',
  cardsPerRow: '4',
  stats: [
    {
      _uid: 'stat-1',
      component: 'stat_item',
      value: '76',
      suffix: '%',
      description: 'STAT CAPTION',
    },
    {
      _uid: 'stat-2',
      component: 'stat_item',
      value: '76',
      suffix: '%',
      description: 'STAT CAPTION',
    },
    {
      _uid: 'stat-3',
      component: 'stat_item',
      value: '76',
      suffix: '%',
      description: 'STAT CAPTION',
    },
    {
      _uid: 'stat-4',
      component: 'stat_item',
      value: '76',
      suffix: '%',
      description: 'STAT CAPTION',
    },
  ],
}

export const FourPerRow: Story = {
  args: {
    blok: baseBlok,
  } as any,
}

export const ThreePerRow: Story = {
  args: {
    blok: {
      ...baseBlok,
      cardsPerRow: '3',
    },
  },
}

export const TwoPerRow: Story = {
  args: {
    blok: {
      ...baseBlok,
      cardsPerRow: '2',
    },
  },
}

