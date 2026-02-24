import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  MetricsBlock,
  MetricsBlockBlok,
} from '@repo/ui'

const meta: Meta<typeof MetricsBlock> = {
  title: 'Sections/MetricsBlock',
  component: MetricsBlock,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MetricsBlock>

const mockMetrics = [
  {
    _uid: 'stat-1',
    component: 'stat_item',
    value: '3,000',
    description: 'STAT CAPTION',
  },
  {
    _uid: 'stat-2',
    component: 'stat_item',
    value: '120+',
    description: 'STAT CAPTION',
  },
  {
    _uid: 'stat-3',
    component: 'stat_item',
    value: '98%',
    description: 'STAT CAPTION',
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
        eyebrow: 'Eyebrow Example',
      },
    ],

    heading: 'Build consistency into every website',
    subheading: 'A design system creates order out of complexity. It ensures every component—from buttons to banners—works together seamlessly and reflects a unified brand language. This block demonstrates how content and structure adapt within a shared framework, helping teams move fast without compromising visual or functional consistency.',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text:
                'These numbers highlight the outcomes and progress achieved through our initiatives.',
            },
          ],
        },
      ],
    },
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
    _uid: 'metrics-default',
    component: 'metrics_block',
    content: mockContent as any,
    metrics: mockMetrics as any,
  } satisfies MetricsBlockBlok,
}

export const WithoutContentBlock: Story = {
  args: {
    _uid: 'metrics-no-content',
    component: 'metrics_block',
    metrics: mockMetrics as any,
  } satisfies MetricsBlockBlok,
}


