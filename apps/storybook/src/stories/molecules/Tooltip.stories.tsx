import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tooltip } from '@repo/ui'

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tooltip displays contextual information on hover. '
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAEDEA',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Primary tooltip text',
    },
    supportingText: {
      control: 'text',
      description: 'Optional supporting text',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    sideOffset: {
      control: { type: 'number', min: 0, step: 2 },
    },
    delayDuration: {
      control: { type: 'number', min: 0, step: 100 },
    },
    className: {
      control: false,
    },
    children: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    label: 'This is a tooltip',
    supportingText: 'Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text.',
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="rounded-md border px-3 py-1 text-sm">
        Hover me
      </button>
    </Tooltip>
  ),
}

export const RightSide: Story = {
  args: {
    label: 'Appears on the right',
    side: 'right',
  },
  render: (args) => (
    <Tooltip {...args}>
      Hover text
    </Tooltip>
  ),
}
