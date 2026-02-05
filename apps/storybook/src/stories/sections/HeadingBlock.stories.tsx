import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, expect } from '@storybook/test';
import { HeadingBlock } from '@repo/ui';


const mockEyebrow = {
  eyebrow: 'Introducing',
  elementType: 'span',
};

const mockHeading = {
  heading: 'Build faster with confidence',
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
          text: 'This is a simple body copy rendered via Storyblok rich text.',
        },
      ],
    },
  ],
} as any;

const meta: Meta<typeof HeadingBlock> = {
  title: 'Sections/HeadingBlock',
  component: HeadingBlock,
   decorators: [
    (Story) => (
      <div>
        <main>
          <Story />
          
        </main>
      </div>
    ),
  ],
    tags: ['autodocs'],
    argTypes: {
    variant: {
      description: 'Layout style of the heading block',
      control: { type: 'radio' },
      options: ['stacked', 'split', 'leading'],
      table: {
        category: 'Layout',
      },
    },

    alignment: {
      description: 'Text alignment for stacked layout',
      control: { type: 'radio' },
      options: ['center', 'left'],
      table: {
        category: 'Layout',
      },
    },

    eyebrow: {
      description: 'Eyebrow content (CMS driven)',
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'Rich text / CMS object' },
      },
    },

    heading: {
      description: 'Heading content (CMS driven)',
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'Rich text / CMS object' },
      },
    },

    body: {
      description: 'Body rich text content',
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'RichTextContent' },
      },
    },

    _uid: { table: { disable: true } },
    component: { table: { disable: true } },
    editable: { table: { disable: true } },
  },

};

export default meta;
type Story = StoryObj<typeof HeadingBlock>;


const basePlay: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByText('Build faster with confidence'),
  ).toBeInTheDocument();

  await expect(
    canvas.getByText('Introducing'),
  ).toBeInTheDocument();
};

export const Default: Story = {
  args: {
    eyebrow: mockEyebrow,
    heading: mockHeading,
    body: mockBody,
  },
  play: basePlay,
};


export const StackedLeft: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'stacked',
    alignment: 'left',
  },
};

export const Split: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'split',
  },
};

export const Leading: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'leading',
  },
};


