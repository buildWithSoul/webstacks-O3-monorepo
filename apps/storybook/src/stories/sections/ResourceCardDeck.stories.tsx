import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  ResourceCardDeck,
  ResourceCardDeckBlok,
} from '@repo/ui'
import type { ResourceCardProps } from '@repo/ui'

const meta: Meta<typeof ResourceCardDeck> = {
  title: 'Sections/ResourceCardDeck',
  component: ResourceCardDeck,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ResourceCardDeck>

const mockResource = (id: number, type: ResourceCardProps['_type']): ResourceCardProps => ({
  _id: `resource-${id}`,
  _type: type,
  title: `Blog / Resource Title ${id}`,
  excerpt:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur eleifend tortor.',
  featuredImage: {
    asset: {
      url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    },
    alt: 'Resource image',
  },
  seo: {
    slug: {
      current: `resource-${id}`,
    },
  },
  topics: [{ name: 'Category' }],
  readTime: 5,
})

const resources12: ResourceCardProps[] = [
  ...Array.from({ length: 6 }).map((_, i) =>
    mockResource(i + 1, 'blogPost')
  ),
  ...Array.from({ length: 3 }).map((_, i) =>
    mockResource(i + 7, 'caseStudy')
  ),
  ...Array.from({ length: 3 }).map((_, i) =>
    mockResource(i + 10, 'webinar')
  ),
]

const mockContent = [
  {
    _uid: 'content-1',
    component: 'content_block',
    layout: 'leading',
    eyebrow: [
      {
        _uid: 'eyebrow-1',
        text: 'Resources',
      },
    ],
    heading: 'Insights & Resources',
    subheading:
      'Explore articles, case studies, and insights from our team.',
   
  },
]

export const Default: Story = {
  args: {
    _uid: 'resource-deck-default',
    component: 'resource_card_deck',
    content: mockContent as any,
    resources: resources12,
  } satisfies ResourceCardDeckBlok,
}

export const WithoutContentBlock: Story = {
  args: {
    _uid: 'resource-deck-no-content',
    component: 'resource_card_deck',
    resources: resources12,
  } satisfies ResourceCardDeckBlok,
}

