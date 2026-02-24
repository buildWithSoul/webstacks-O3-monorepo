import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  ResourceBentoCardDeck,
  ResourceBentoCardDeckBlok,
} from '@repo/ui'

const meta: Meta<typeof ResourceBentoCardDeck> = {
  title: 'Sections/ResourceBentoCardDeck',
  component: ResourceBentoCardDeck,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ResourceBentoCardDeck>

const mockResources = [
  {
    _id: 'resource-1',
    _type: 'blogPost',
    title: 'Design Systems at Scale',
    excerpt:
      'Learn how modern teams build and scale design systems that stay consistent across products.',
    featuredImage: {
      alt: 'Design system illustration',
      asset: {
        url: 'https://images.unsplash.com/photo-1559028012-481c04fa702d',
      },
    },
    publishDate: '12.12.2025',
    seo: {
      slug: {
        current: 'design-systems-at-scale',
      },
    },
    showBadge: true,
  },
  {
    _id: 'resource-2',
    _type: 'blogPost',
    title: 'Building for Performance',
    excerpt: 'Optimizing modern web experiences for speed and scale.',
    featuredImage: {
      alt: 'Performance illustration',
      asset: {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      },
    },
    publishDate: '10.12.2025',
    seo: {
      slug: {
        current: 'building-for-performance',
      },
    },
    showBadge: true,
  },
  {
    _id: 'resource-3',
    _type: 'caseStudy',
    title: 'Scaling Enterprise Platforms',
    excerpt: 'How large teams ship faster without breaking consistency.',
    featuredImage: {
      alt: 'Enterprise systems',
      asset: {
        url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786',
      },
    },
    publishDate: '08.12.2025',
    seo: {
      slug: {
        current: 'scaling-enterprise-platforms',
      },
    },
    showBadge: true,
  },
  {
    _id: 'resource-4',
    _type: 'webinar',
    title: 'Designing for Scale',
    excerpt: 'A live session on designing systems that grow with your product.',
    featuredImage: {
      alt: 'Webinar session',
      asset: {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
      },
    },
    publishDate: '05.12.2025',
    seo: {
      slug: {
        current: 'designing-for-scale',
      },
    },
    showBadge: true,
  },
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
    heading: 'Where performance meets possibility',
    subheading:
      'Every website should be built to evolve. From the first line of code to the final interaction.',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text:
                'Explore our latest thinking on design systems, performance, and scalable digital platforms.',
            },
          ],
        },
      ],
    },
  },
]

export const Default: Story = {
  args: {
    _uid: 'resource-bento-default',
    component: 'resource_bento_card_deck',
    content: mockContent as any,
    resources: mockResources,
  } satisfies ResourceBentoCardDeckBlok,
}

export const WithoutContentBlock: Story = {
  args: {
    _uid: 'resource-bento-no-content',
    component: 'resource_bento_card_deck',
    resources: mockResources,
  } satisfies ResourceBentoCardDeckBlok,
}

