import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Switchback } from '@repo/ui'

const meta: Meta<typeof Switchback> = {
  title: 'Sections/Switchback',
  component: Switchback,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Switchback>

const baseBlok = {
  _uid: 'switchback-1',
  component: 'switchback',
  variant: 'right',
  content: [
    {
      _uid: 'content-block-1',
      component: 'content_block',
      eyebrow: [
        {
          _uid: 'eyebrow-1',
          component: 'eyebrow',
          eyebrow: 'New',
          elementType: 'h6',
        },
      ],
      heading: 'Where performance meets possibility',
      subheading: 'Everything you need to ship modern interfaces',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text:
                  'Every website should be built to evolve. From the first line of code to the final interaction, it’s a living product designed to adapt, scale, and drive growth over time.',
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
              tone: 'secondary',
            },
          ],
        },
      ],
      layout: 'leading',
    },
  ],
} as any

const imageMediaBlok = {
  ...baseBlok,
  mediaType: 'image',
  image: {
    filename:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Team collaborating around a desk',
  },
}

const videoMediaBlok = {
  ...baseBlok,
  mediaType: 'video',
  video: {
    _uid: 'video-1',
    component: 'video',
    videoType: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'YouTube Video',
    thumbnail: {
      filename:
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Video thumbnail',
    },
    autoPlay: false,
    classname: 'sm:m-w-[538px] w-full'
  },
}

export const ContentLeft_ImageRight: Story = {
  name: 'Content Left / Image Right',
  args: {
    blok: {
      ...imageMediaBlok,
      variant: 'right',
    },
  },
}

export const ContentRight_ImageLeft: Story = {
  name: 'Content Right / Image Left',
  args: {
    blok: {
      ...imageMediaBlok,
      variant: 'left',
    },
  },
}

export const ImageMedia: Story = {
  name: 'Image Media',
  args: {
    blok: {
      ...imageMediaBlok,
      variant: 'right',
    },
  },
}

export const VideoMedia: Story = {
  name: 'Video Media (YouTube)',
  args: {
    blok: {
      ...videoMediaBlok,
      variant: 'right',
    },
  },
}