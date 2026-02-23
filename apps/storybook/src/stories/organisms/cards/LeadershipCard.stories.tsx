import { LeadershipCard, LeadershipCardBlok } from '@repo/ui'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof LeadershipCard> = {
  title: 'Organisms/LeadershipCard',
  component: LeadershipCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags:['autodocs']
}

export default meta

type Story = StoryObj<typeof LeadershipCard>

const mockBlok: LeadershipCardBlok = {
  _uid: 'leader-1',
  component: 'leadership_card',
  name: 'First Last',
  title: 'Title',
  image: {
    filename: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c',
    alt: 'Leadership profile photo',
  },
}

export const Default: Story = {
  args: {
    blok: mockBlok,
  },
}