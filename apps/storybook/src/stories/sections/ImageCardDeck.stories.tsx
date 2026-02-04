import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, expect } from '@storybook/test';
import { ImageCardDeck } from '@repo/ui';

const mockEyebrow = {
  eyebrow: 'Use cases',
  elementType: 'h6',
};

const mockHeading = {
  heading: 'Designed for every team',
  elementType: 'h2',
};

const mockBody = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Explore how different teams use our platform to move faster.',
        },
      ],
    },
  ],
};

const image = (src: string, alt: string) => ({
  image: {
    id: crypto.randomUUID(),
    filename: src,
    alt,
  },
});

const card = (title: string, description: string, img: string) => ({
  _key: crypto.randomUUID(),
  heading: title,
  body: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: description }],
    },
  ],
  ...image(img, title),
});

const rows2 = [
  {
    cardsPerRow: '2',
    cards: [
      card(
        'Engineering teams',
        'Ship features faster with confidence.',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop'
      ),
      card(
        'Product teams',
        'Align strategy with execution.',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop'
      ),
    ],
  },
];


const basePlay: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByText('Designed for every team'),
  ).toBeInTheDocument();

  await expect(
    canvas.getByText('Use cases'),
  ).toBeInTheDocument();

  await expect(
    canvas.getByText(/explore how different teams/i),
  ).toBeInTheDocument();

  const images = canvasElement.querySelectorAll('img');
  await expect(images.length).toBeGreaterThan(0);

  const grid = canvasElement.querySelector('[class*="grid"]');
  await expect(grid).toBeInTheDocument();
};

const meta: Meta<typeof ImageCardDeck> = {
  title: 'Sections/ImageCardDeck',
  component: ImageCardDeck,

  tags: ['autodocs'],
  argTypes: {
    heading: { control: false },
    eyebrow: { control: false },
    body: { control: false },
    rows: { control: false },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'sugar', 'bright'],
      table: { category: 'Appearance' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageCardDeck>;

export const TwoCard: Story = {
  args: {
    eyebrow: mockEyebrow,
    heading: mockHeading,
    body: mockBody,
    rows: rows2,
    theme: 'light',
  },
  play: basePlay,
};


