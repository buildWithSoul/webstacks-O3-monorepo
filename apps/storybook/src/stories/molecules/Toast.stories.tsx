import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Toast } from '@repo/ui'

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Toast is a transient feedback component used to display short messages. ' +
          'It supports positioning, optional actions, and auto-dismiss behavior.',
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div
        key={JSON.stringify(context.args)}
        style={{ height: '400px' }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    position: {
      control: 'select',
      options: ['top-middle', 'top-right', 'bottom-right'],
    },
    duration: {
      control: { type: 'number', min: 1000, step: 500 },
      description: 'Auto dismiss duration in milliseconds (default: 3000)',
    },
    variant: {
      control: false,
      description: 'Design variant token (to be extended)',
    },
    onAction: {
      control: false,
      description: '() => void',
    },
    actionLabel: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Toast>



export const Default: Story = {
  args: {
    title: 'Scheduled: Catch up',
    description: 'Monday, November 10, 2025 at 10:32 AM',
    position: 'bottom-right',
    actionLabel: 'Undo',
    duration:10000
  },
}

export const TopMiddle: Story = {
  args: {
    title: 'Meeting scheduled',
    description: 'Tomorrow at 9:00 AM',
    position: 'top-middle',
    actionLabel: 'Undo',
    duration:10000
  },
}

