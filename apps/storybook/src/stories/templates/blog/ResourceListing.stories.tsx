import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ResourceListing } from '@repo/ui';
import { within, expect } from '@storybook/test';
import { mockBlogPosts } from './blogData';



const mockTopics = [
  { 
    _type: 'blogTopic' as const,
    _id: 'topic-001',
    name: 'React'
  },
  { 
    _type: 'blogTopic' as const,
    _id: 'topic-002',
    name: 'Next.js'
  },
  { 
    _type: 'blogTopic' as const,
    _id: 'topic-003',
    name: 'Design Systems'
  },
];

const mockTags= [
  { 
    _type: 'blogTag' as const  ,
      _id: 'tag-001',
    name: 'Performance'
  },
  { 
    _type: 'blogTag' as const ,
       _id: 'tag-002',
    name: 'Routing'
  },
  { 
    _type: 'blogTag'as const  ,
      _id: 'tag-003',
    name: 'UI'
  },
];

const meta: Meta<typeof ResourceListing> = {
  title: 'Templates/Blog/ResourceListing',
  component: ResourceListing,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    items: { control: false },
    topics: { control: false },
    tags: { control: false },
    totalPages: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof ResourceListing>;

export const Default: Story = {
  args: {
    items: mockBlogPosts,
    topics: mockTopics,
    tags: mockTags,
    totalPages: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByText('React Performance Tips'),
    ).toBeInTheDocument();

    expect(
      canvas.getByText('Next.js App Router Guide'),
    ).toBeInTheDocument();
  },
};


