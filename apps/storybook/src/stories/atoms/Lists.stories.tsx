import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Lists } from '@repo/ui'

const meta: Meta<typeof Lists> = {
  title: 'Atoms/Lists',
  component: Lists,
  tags: ['autodocs'],
  args: {
    as: 'ul',
    items: [
      'Fast setup',
      'Accessible by default',
      'Design-token driven',
    ],
  },
  argTypes: {
    as: {
      control: { type: 'radio' },
      options: ['ul', 'ol'],
      description: 'List type: bullet (ul) or numbered (ol)',
      table: {
        type: { summary: `'ul' | 'ol'` },
        defaultValue: { summary: 'ul' },
      },
    },
    items: {
      control: { type: 'object' },
      description: 'List items ',
     
    },
    className: {
      control: { type: 'text' },
      description: 'Optional class overrides',
      table: {
        type: { summary: 'string' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Lists>

export const BulletList: Story = {}

export const NumberedList: Story = {
  args: {
    as: 'ol',
    items: [
      'Install dependencies',
      'Configure tokens',
      'Deploy',
    ],
  },
}
