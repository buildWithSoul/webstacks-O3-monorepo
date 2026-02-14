import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Switch } from '@repo/ui'

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the switch',
    },
    className: {
      control: 'text',
      description: 'Optional class overrides',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback when switch state changes',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '16px',
          background:"#fcfcfc"
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    checked: false,
  },
}
export const Checked: Story = {
  args: {
    checked: true,
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}
export const Interactive: Story = {
  render: (args:any) => {
    const [checked, setChecked] = useState(args.checked ?? false)

    return (
      <Switch
        {...args}
        checked={checked}
        onCheckedChange={setChecked}
      />
    )
  },
  args: {
    checked: false,
  },
}
