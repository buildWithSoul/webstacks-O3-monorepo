import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Video } from '@repo/ui'

const meta: Meta<typeof Video> = {
  title: 'Modules/Video',
  component: Video,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Video>

export const YouTube: Story = {
  args: {
    blok: {
      _uid: 'video-youtube',
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
    },
  },
}

export const Wistia: Story = {
  args: {
    blok: {
      _uid: 'video-wistia',
      component: 'video',
      videoType: 'wistia',
      wistiaUrl: 'https://fast.wistia.net/embed/iframe/kdhsjzoap5',
      title: 'Wistia Video',
      thumbnail: {
        filename:
          'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        alt: 'Video thumbnail',
      },
      autoPlay: false,
    },
  },
}

