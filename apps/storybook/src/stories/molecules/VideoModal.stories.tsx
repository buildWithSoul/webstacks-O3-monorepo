import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { VideoModal } from '@repo/ui';
import { useState } from 'react';

const meta: Meta<typeof VideoModal> = {
  title: 'Molecules/VideoModal',
  component: VideoModal,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    videoId: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    videoType: {
      control: 'select',
      options: ['youtube', 'wistia'],
      table: { type: { summary: "'youtube' | 'wistia'" } },
    },
    title: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    onClose: {
      control: false,
      table: { type: { summary: '() => void' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VideoModal>;

export const YouTube: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Open YouTube Video
        </button>

        <VideoModal
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
  args: {
    videoId: 'dQw4w9WgXcQ',
    videoType: 'youtube',
    title: 'YouTube Video',
  },
};

export const Wistia: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Open Wistia Video
        </button>

        <VideoModal
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
  args: {
    videoId: 'abc123xyz',
    videoType: 'wistia',
    title: 'Wistia Video',
  },
};

export const OpenByDefault: Story = {
  render: (args) => (
    <VideoModal
      {...args}
      isOpen
      onClose={() => {}}
    />
  ),
  args: {
    isOpen: true,
    videoId: 'dQw4w9WgXcQ',
    videoType: 'youtube',
    title: 'Autoplay Modal',
  },
};

export const ClosedState: Story = {
  render: (args) => (
    <VideoModal
      {...args}
      isOpen={false}
      onClose={() => {}}
    />
  ),
  args: {
    videoId: 'dQw4w9WgXcQ',
    videoType: 'youtube',
    title: 'Closed Modal',
  },
};
