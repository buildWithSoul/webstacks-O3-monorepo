import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {CTABar} from '@repo/ui'

const meta: Meta<typeof CTABar> = {
  title: 'Modules/CTABar',
  component: CTABar,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },

   
  },
}

export default meta
type Story = StoryObj<typeof CTABar>
export const Basic: Story = {
  args: {
    buttons: [
      {
        _uid: 'btn-1',
        label: 'Get Started',
        mode: 'filled',
        tone: 'primary',
      } as any,
      {
        _uid: 'btn-2',
        label: 'Learn More',
        mode: 'filled',
        tone: 'secondary',
      } as any,
    ],
  },
}


export const Subscribe: Story = {
  args: {
    type: 'subscribe',
    placeholder: 'companyemail@company.com',
    buttons: [
      {
        _uid: 'btn-3',
        label: 'Subscribe',
        mode: 'filled',
        tone: 'primary',
      } as any,
    ],
  },
}


