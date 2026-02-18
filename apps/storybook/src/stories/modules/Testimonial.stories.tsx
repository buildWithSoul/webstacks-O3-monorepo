import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TestimonialItem } from '@repo/ui'

const meta: Meta<typeof TestimonialItem> = {
  title: 'Modules/Testimonial',
  component: TestimonialItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'card'],
    },
  },
  args: {
    variant: 'default',
    blok: {
      _uid: 'testimonial-1',
      quote:
        'Working with Webstacks completely changed how we approach our website. They helped us move faster, experiment more, and treat our site like a product that can grow with our business. It never feels transactional—the collaboration is seamless, and the results speak for themselves.',
      author: {
        _uid: 'author-1',
        name: 'Savannah Leonardo',
        avatarSrc: 'https://i.pravatar.cc/80?img=32',
        role: {
          label: 'Co-founder, CTO',
          variant: 'orange',
        },
      },
      brandLogo: {
        filename:
          'https://i.pinimg.com/originals/ea/47/61/ea4761a0acdd855885130e6b129d90a4.png',
        alt: 'Upwork',
      },
    } as any,
  },
}

export default meta
type Story = StoryObj<typeof TestimonialItem>
export const Default: Story = {}
export const Card: Story = {
  args: {
    variant: 'card',
  },
}
