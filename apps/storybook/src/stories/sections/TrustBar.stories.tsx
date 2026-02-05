import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, expect } from '@storybook/test';
import { TrustBar } from '@repo/ui';


const mockCompany = (id: string, name: string) => ({
  _id: id,
  _type: 'company' as const,
  _key: `company-${id}`,
  name,
  slug: {
    _type: 'slug' as const,
    current: name.toLowerCase().replace(/\s+/g, '-'),
  },
  logo: {
    _type: 'image' as const,
    asset: {
      _ref: `image-${id}`,
      _type: 'reference' as const,
      url: getLogoUrl(name),
    },
  },
});

const getLogoUrl = (companyName: string): string => {
  const logos: Record<string, string> = {
    Slack: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
    Google: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    Notion: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
  };

  return logos[companyName];
};

const mockRows = [
  {
    _key: 'row-1',
    _type: 'trustBarRow' as const,
    companies: [
      mockCompany('1', 'Slack'),
      mockCompany('2', 'Google'),
      mockCompany('3', 'Notion'),
    ],
  },
];


const meta: Meta<typeof TrustBar> = {
  title: 'Sections/TrustBar',
  component: TrustBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variants: {
      description: 'Layout behavior of the trust bar',
      control: { type: 'radio' },
      options: ['scroll', 'static'],
      table: { category: 'Layout' },
    },

    theme: {
      description: 'Color theme for logos and eyebrow',
      control: { type: 'radio' },
      options: ['light', 'dark', 'bright'],
      table: { category: 'Appearance' },
    },

    eyebrow: {
      control: 'text',
      table: { category: 'Content' },
    },

    rows: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'Company[]' },
      },
    },

    _type: { table: { disable: true } },
    _key: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof TrustBar>;

    const basePlay: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByText('Trusted by leading companies'),
  ).toBeInTheDocument();

const images = canvas.getAllByRole('img');
  await expect(images.length).toBeGreaterThan(0);
};

export const Default: Story = {
  args: {
    eyebrow: 'Trusted by leading companies',
    rows: mockRows,
    theme: 'light',
  },
  play: basePlay,
};

