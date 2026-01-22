import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {CaseStudyHero} from '@repo/ui';
import { within, expect } from '@storybook/test';

const mockCaseStudy = {
  title: 'How CompanyX Increased Revenue by 300% with Our Platform',
  publishedAt: '2025-03-15',
  company: {
    _type: 'company' as const,
    _id: 'company-x-001',
    name: 'CompanyX',
    website: 'https://companyx.com'
  },
 
};

const meta: Meta<typeof CaseStudyHero> = {
  title: 'Templates/CaseStudy/CaseStudyHero',
  component: CaseStudyHero,
  tags: ['autodocs'],
  argTypes: {
    title: { control: false },
    publishedAt: { control: false },
    company: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof CaseStudyHero>;

export const Default: Story = {
  args: mockCaseStudy,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole('heading', { level: 1 }),
    ).toBeInTheDocument();

    expect(
      canvas.getByText('How CompanyX Increased Revenue by 300% with Our Platform'),
    ).toBeInTheDocument();

    expect(
      canvas.getByText('CompanyX'),
    ).toBeInTheDocument();
  },
};

