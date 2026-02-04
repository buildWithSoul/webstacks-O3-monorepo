import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, expect } from '@storybook/test';
import { AwardsBlade } from '@repo/ui';

const mockRichText = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Recognized for design, innovation, and customer satisfaction.',
        },
      ],
    },
  ],
};

const mockAwards = [
  {
    _uid: 'award-1',
    image: {
      id: '1',
      filename: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
      alt: 'Slack award',
    },
    alt: 'Slack award',
    title: 'Top Collaboration Tool',
    body: mockRichText,
  },
  {
    _uid: 'award-2',
    image: {
      id: '2',
      filename: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      alt: 'Google award',
    },
    alt: 'Google award',
    title: 'Best Productivity Platform',
    body: mockRichText,
  },
  {
    _uid: 'award-3',
    image: {
      id: '3',
      filename: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
      alt: 'Notion award',
    },
    alt: 'Notion award',
    title: 'Editor’s Choice',
    body: mockRichText,
  },
];

const mockRows = [
  {
    _uid: 'row-1',
    cardsPerRow: '3',
    awards: mockAwards,
  },
];

const basePlay: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(
    canvas.getByText('Top Collaboration Tool'),
  ).toBeInTheDocument();
};

const meta: Meta<typeof AwardsBlade> = {
  title: 'Sections/AwardsBlade',
  component: AwardsBlade,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    rows: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof AwardsBlade>;

export const Default: Story = {
  args: {
    _uid: 'awards-grid',
    component: 'awardsBlade',
   
    rows: mockRows,
  },
  play: basePlay,
};

