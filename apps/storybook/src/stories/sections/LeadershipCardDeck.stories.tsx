import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  LeadershipCardBlok,
  LeadershipCardDeck,
  LeadershipCardDeckBlok,
} from '@repo/ui'

const meta: Meta<typeof LeadershipCardDeck> = {
  title: 'Sections/LeadershipCardDeck',
  component: LeadershipCardDeck,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LeadershipCardDeck>

const mockCard = (uid: string): LeadershipCardBlok => ({
  _uid: uid,
  component: 'leadership_card',
  name: 'First Last',
  title: 'Title',
  image: {
    filename: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c',
    alt: 'Leadership portrait',
  },
})

const cards10 = Array.from({ length: 10 }).map((_, i) =>
  mockCard(`c${i + 1}`)
)

const mockContent = [
  {
    _uid: 'content-1',
    component: 'content_block',
    body: [
      {
        _uid: 'heading-1',
        component: 'heading',
        text: 'Leadership Team',
        as: 'h2',
        size: '4xl',
      },
      {
        _uid: 'text-1',
        component: 'rich_text',
        text: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Meet the people guiding our vision.' },
              ],
            },
          ],
        },
      },
    ],
  },
]

export const Default: Story = {
  args: {
    _uid: 'deck-default',
    component: 'leadership_card_deck',
    content: mockContent as any,
    rows: [
      {
        cardsPerRow: '4',
        cards: cards10,
      },
    ],
  } satisfies LeadershipCardDeckBlok,
}

export const ThreePerRow: Story = {
  args: {
    _uid: 'deck-3',
    component: 'leadership_card_deck',
    rows: [
      {
        cardsPerRow: '3',
        cards: cards10,
      },
    ],
  } satisfies LeadershipCardDeckBlok,
}

export const TwoRowsMixed: Story = {
  args: {
    _uid: 'deck-mixed',
    component: 'leadership_card_deck',
    content: mockContent as any,
    rows: [
      {
        cardsPerRow: '4',
        cards: cards10.slice(0, 6),
      },
      {
        cardsPerRow: '3',
        cards: cards10.slice(6, 10),
      },
    ],
  } satisfies LeadershipCardDeckBlok,
}

