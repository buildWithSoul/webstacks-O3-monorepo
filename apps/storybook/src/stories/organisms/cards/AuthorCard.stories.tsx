import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AuthorCard } from '@repo/ui'

const meta: Meta<typeof AuthorCard> = {
  title: 'Organisms/AuthorCard',
  component: AuthorCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'AuthorCard displays author information including name, company, bio, and social links. '      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '24px',
          background: '#f8f8f8',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    name: {
      control: 'text',
    },
    company: {
      control: 'text',
    },
    bio: {
      control: 'text',
    },
    socials: {
      control: false,
      description: 'Social links with icon type and URL',
    },
  },
}

export default meta
type Story = StoryObj<typeof AuthorCard>
export const Default: Story = {
  args: {
    name: 'Jane Doe',
    company: 'Company',
    bio:
      'This is a short author bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    socials: [
      { type: 'twitter', href: 'https://x.com/janedoe' },
      { type: 'linkedin', href: 'https://linkedin.com/in/janedoe' },
      { type: 'discord', href: 'https://discord.gg/example' },
    ],
  },
}
export const WithoutCompany: Story = {
  args: {
    name: 'Jane Doe',
    bio:
      'This is a short author bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    socials: [
      { type: 'twitter', href: 'https://x.com/janedoe' },
      { type: 'linkedin', href: 'https://linkedin.com/in/janedoe' },
    ],
  },
}
export const WithoutSocials: Story = {
  args: {
    name: 'Jane Doe',
    company: 'Company',
    bio:
      'This is a short author bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
}
