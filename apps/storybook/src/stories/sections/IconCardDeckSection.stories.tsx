import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, expect } from '@storybook/test';
import { IconCardDeck } from '@repo/ui';


const mockEyebrow = {
  eyebrow: 'Platform features',
  elementType: 'h6',
};

const mockHeading = {
  heading: 'Everything you need to scale',
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
          text: 'Powerful building blocks designed for modern product teams.',
        },
      ],
    },
  ],
};

const card = (heading: string, description: string, icon = 'check') => ({
  heading,
  description,
  icon,
});

const rows2 = [
  {
    cardsPerRow: '2',
    cards: [
      card('Fast setup', 'Get started in minutes'),
      card('Secure by default', 'Enterprise-grade security'),
    ],
  },
];


const basePlay: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByText('Everything you need to scale'),
  ).toBeInTheDocument();
   await expect(
    canvas.getByText('Platform features'),
  ).toBeInTheDocument();

  await expect(
    canvas.getByText('Powerful building blocks designed for modern product teams.'),
  ).toBeInTheDocument();

  await expect(
    canvas.getByText('Fast setup'),
  ).toBeInTheDocument();

  await expect(
    canvas.getByText('Secure by default'),
  ).toBeInTheDocument();

};


const meta: Meta<typeof IconCardDeck> = {
  title: 'Sections/IconCardDeck',
  component: IconCardDeck,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: false },
    eyebrow: { control: false },
    body: { control: false },
    rows: { control: false },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      table: { category: 'Appearance' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconCardDeck>;


export const TwoCard: Story = {
  args: {
    eyebrow: mockEyebrow,
    heading: mockHeading,
    body: mockBody,
    rows: rows2,
  },
  play: basePlay,
} as any;

