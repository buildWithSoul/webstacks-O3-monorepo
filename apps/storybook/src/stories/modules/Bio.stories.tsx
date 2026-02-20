import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Profile } from '@repo/ui'

const meta: Meta<typeof Profile> = {
  title: 'Modules/Profile',
  component: Profile,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Profile>

export const Bio: Story = {
  args: {
    type: 'bio',
    name: 'Author Name',
    description:
      'This is a short author bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
    shareButtons: {
      pathName: 'https://example.com/blog/design-systems',
      title: 'Design Systems That Scale',
    },
  },
}

export const BioWithoutShareButtons: Story = {
  args: {
    type: 'bio',
    name: 'Author Name',
    description:
      'This is a short author bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
  },
}

export const Speaker: Story = {
  args: {
    type: 'speaker',
    name: 'Speaker Name',
    description:
      'This is a speaker description.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
  },
}
