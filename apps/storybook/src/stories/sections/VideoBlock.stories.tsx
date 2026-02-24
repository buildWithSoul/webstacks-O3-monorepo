import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { VideoBlock } from '@repo/ui'
import { within, expect } from '@storybook/test'

const meta: Meta<typeof VideoBlock> = {
  title: 'Sections/VideoBlock',
  component: VideoBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof VideoBlock>

const baseBlok = {
  _uid: 'video-block-1',
  component: 'video_block',
  size: 'full',
  autoPlay: false,
  loop: false,
  muted: true,
  controls: true,
} as any

export const YouTube: Story = {
  args: {
    blok: {
      ...baseBlok,
      size: 'large',
      video: {
        videoType: 'youtube',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'YouTube video',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByTitle(/youtube video/i)).toBeInTheDocument()
  },
}

export const Wistia: Story = {
  args: {
    blok: {
      ...baseBlok,
      size: 'medium',
      video: {
        videoType: 'wistia',
        wistiaUrl: 'https://fast.wistia.net/embed/iframe/kdhsjzoap5',
        title: 'Wistia video',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByTitle(/wistia video/i)).toBeInTheDocument()
  },
}

