import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ContentBlock } from '@repo/ui'
import { within, expect } from '@storybook/test'

const meta: Meta<typeof ContentBlock> = {
  title: 'Organisms/ContentBlock',
  component: ContentBlock,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className=" bg-white px-6 py-20">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    blok: {
      control: false,
      description: 'Storyblok block data',
    },
   
  },
}

export default meta
type Story = StoryObj<typeof ContentBlock>

const baseBlok = {
  _uid: 'content-block-uid',
  component: 'content_block',
  eyebrow: 'Eyebrow Example',
  headline: 'Where performance meets possibility',
  subheading:
    'Every website should be built to evolve. From the first line of code to the final interaction, it’s a living product designed to adapt, scale, and drive growth over time.',
  content: {
    type: 'doc',
    content: [
      {
        type: 'bullet_list',
        content: [
          {
            type: 'list_item',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Lorem ipsum dolor sit amet, consectetur' }],
              },
            ],
          },
          {
            type: 'list_item',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Lorem ipsum dolor sit amet, consectetur' }],
              },
            ],
          },
          {
            type: 'list_item',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Lorem ipsum dolor sit amet, consectetur' }],
              },
            ],
          },
        ],
      },
    ],
  },
  buttons: [
    {
      _uid: 'btn-1',
      label: 'Get Started',
    },
    {
      _uid: 'btn-2',
      label: 'Learn More',
    },
  ],
}
const basePlay: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(
    canvas.getByRole('heading', {
      name: /where performance meets possibility/i,
    })
  ).toBeInTheDocument()

  await expect(canvas.getByText('Eyebrow Example')).toBeInTheDocument()

}
export const Stacked: Story = {
  args: {
    blok: {
      ...baseBlok,
      layout: 'stacked',
    },
  } as any,
  play: basePlay,
}
export const Leading: Story = {
  args: {
    blok: {
      ...baseBlok,
      layout: 'leading',
    },
  } as any,
  play: basePlay,
}
export const Split: Story = {
  args: {
    blok: {
      ...baseBlok,
      layout: 'split',
    },
  } as any,
  play: basePlay,
}
