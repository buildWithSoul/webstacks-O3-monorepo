import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PressReleaseListing } from '@repo/ui';
import { within, expect } from '@storybook/test';

const mockPresses = [
  {
    _type: 'pressRelease' as const,
    _id: 'press-001',
    title: 'Company Launches New AI Platform',
    excerpt: 'Groundbreaking AI platform announced to transform business operations.',
    publishedAt: '2024-03-20',
    seo: {
      slug: {
        _type: 'slug' as const,
        current: 'company-launches-new-ai-platform',
      },
    },
  },
  {
    _type: 'pressRelease' as const,
    _id: 'press-002',
    title: 'Company Reports Record Q4 Earnings',
    excerpt: 'Record-breaking financial performance exceeds expectations.',
    publishedAt: '2024-02-15',
    seo: {
      slug: {
        _type: 'slug' as const,
        current: 'record-q4-earnings',
      },
    },
  },
];

const meta: Meta<typeof PressReleaseListing> = {
  title: 'Templates/PressReleaseListing',
  component: PressReleaseListing,
  tags: ['autodocs'],
  argTypes: {
    presses: {
      control: false,
      table: {
        type: {
          summary: 'PressRelease[]',
        },
      },
    },
    totalPages: {
      control: false,
      table: {
        type: {
          summary: 'number',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PressReleaseListing>;

export const Default: Story = {
  args: {
    presses: mockPresses,
    totalPages : 3
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole('heading', { level: 1 }),
    ).toBeInTheDocument();

    expect(
      canvas.getByText('Press releases'),
    ).toBeInTheDocument();

    expect(
      canvas.getByText('Company Launches New AI Platform'),
    ).toBeInTheDocument();
  },
};

