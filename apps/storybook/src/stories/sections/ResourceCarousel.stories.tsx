import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  ResourceCarousel,
  ResourceCarouselBlok,
} from '@repo/ui'
import type { ResourceCardProps } from '@repo/ui'

const meta: Meta<typeof ResourceCarousel> = {
  title: 'Sections/ResourceCarousel',
  component: ResourceCarousel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ResourceCarousel>

const mockResource = (
  id: number,
  type: ResourceCardProps['_type']
): ResourceCardProps => ({
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

const resources = [
  mockResource(1, 'blogPost'),
  mockResource(2, 'caseStudy'),
  mockResource(3, 'webinar'),
  mockResource(4, 'pressRelease'),
  mockResource(5, 'blogPost'),
  mockResource(6, 'caseStudy'),
]

const mockContent = [
  {
    _uid: 'content-1',
    component: 'content_block',
    layout: 'leading',
    eyebrow: [
      {
        _uid: 'eyebrow-1',
        eyebrow: 'Eyebrow Example',
      },
    ],

    heading: 'Where performance meets possibility',
    subheading: 'Every website should be built to evolve. From the first line of code to the final interaction, it’s a living product designed to adapt, scale, and drive growth over time. This block represents how structure, content, and design work together to deliver an experience that feels seamless today—and ready for what’s next.',
   
     ctaBar: [
    {
      _uid: 'cta-bar-1',
      component: 'cta_bar',
      type: 'button',
      buttons: [
        {
          _uid: 'btn-1',
          label: 'Get started',
          href: '#',
          target: '_self',
        },
        {
          _uid: 'btn-2',
          label: 'Learn more',
          href: '#',
          target: '_self',
          tone:'secondary'
        },
      ],
    },
  ],
  },
]

export const Default: Story = {
  args: {
    _uid: 'resource-carousel-default',
    component: 'resource_carousel',
    content: mockContent as any,
    resources,
  } satisfies ResourceCarouselBlok,
}

export const WithoutContentBlock: Story = {
  args: {
    _uid: 'resource-carousel-no-content',
    component: 'resource_carousel',
    resources,
  } satisfies ResourceCarouselBlok,
}

export const MobilePreview: Story = {
  args: {
    _uid: 'resource-carousel-mobile',
    component: 'resource_carousel',
    content: mockContent as any,
    resources,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}