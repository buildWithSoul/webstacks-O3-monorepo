import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ResourceBentoCard } from '@repo/ui'

const meta: Meta<typeof ResourceBentoCard> = {
  title: 'Organisms/ResourceBentoCard',
  component: ResourceBentoCard,
  tags: ['autodocs'],
 
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: '960px',
          padding: '24px',
          background: '#f8f8f8',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description:
        'Controls visual size and layout. sm = split, md/lg = stacked.',
    },
    _type: { control: false },
    featuredImage: { control: false },
    seo: { control: false },
    slug: { control: false },
    body: { control: false },
    excerpt: { control: 'text' },
    showBadge: { control: 'boolean' },
    publishDate: { control: 'date', description: 'Date when the resource was published.' }
  },
}

export default meta
type Story = StoryObj<typeof ResourceBentoCard>
const baseArgs = {
  _id: 'resource-1',
  _type: 'blogPost' as const,
  title: 'Design Systems at Scale',
  excerpt:
    'Learn how modern teams build and scale design systems that stay consistent across products.',
  featuredImage: {
    asset :{
    url: 'https://images.unsplash.com/photo-1559028012-481c04fa702d',

    },
    alt: 'Design system illustration',
  },
 
  seo: {
    slug: {
      current: 'design-systems-at-scale',
    },
  },
  showBadge: true,
  publishDate :  '12.12.2025'
}
export const Small: Story = {
  args: {
    ...baseArgs,
    size: 'sm',
  },
}
export const Medium: Story = {
  args: {
    ...baseArgs,
    size: 'md',
  },
}
export const Large: Story = {
  args: {
    ...baseArgs,
    size: 'lg',
  },
}
export const WithoutImage: Story = {
  args: {
    ...baseArgs,
    size: 'md',
    featuredImage: undefined,
    showBadge: false,
  },
}
