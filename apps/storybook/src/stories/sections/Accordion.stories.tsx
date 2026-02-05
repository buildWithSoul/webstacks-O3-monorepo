import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, expect, userEvent } from '@storybook/test';
import { Accordion } from '@repo/ui';


const mockEyebrow = [
  {
    _uid: 'eyebrow-1',
    component: 'eyebrow',
    eyebrow: 'FAQs',
    elementType: 'h6',
  },
];

const mockHeading = [
  {
    _uid: 'heading-1',
    component: 'heading',
    heading: 'Frequently asked questions',
    elementType: 'h2',
  },
];

const mockBody = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'Everything you need to know about our product and billing.',
        },
      ],
    },
  ],
};

const mockItems = [
  {
    _uid: 'item-1',
    component: 'accordionItem',
    label: 'What is your refund policy?',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text:
                'We offer a 30-day money-back guarantee if you are not satisfied.',
            },
          ],
        },
      ],
    },
  },
  {
    _uid: 'item-2',
    component: 'accordionItem',
    label: 'How long does setup take?',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text:
                'Most teams are up and running within a few minutes.',
            },
          ],
        },
      ],
    },
  },
  {
    _uid: 'item-3',
    component: 'accordionItem',
    label: 'Do you offer enterprise plans?',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text:
                'Yes, we offer custom plans for larger organizations.',
            },
          ],
        },
      ],
    },
  },
];



const basePlay: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByText('Frequently asked questions'),
  ).toBeInTheDocument();

  const firstQuestion = canvas.getByText(
    'What is your refund policy?',
  );
  await expect(firstQuestion).toBeInTheDocument();

  await userEvent.click(firstQuestion);

  await expect(
    canvas.getByText(/30-day money-back guarantee/i),
  ).toBeInTheDocument();
};


const meta: Meta<typeof Accordion> = {
  title: 'Sections/Accordion',
  component: Accordion,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'radio' },
      options: ['stack', 'split'],
      table: { category: 'Layout' },
    },

    heading: { control: false },
    eyebrow: { control: false },
    body: { control: false },
    items: { control: false },
    ctaBar: { control: false },

    _uid: { table: { disable: true } },
    component: { table: { disable: true } },
    editable: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;



export const StackLayout: Story = {
  args: {
    eyebrow: mockEyebrow,
    heading: mockHeading,
    body: mockBody,
    items: mockItems,
    layout: 'stack',
  },
  play: basePlay,
};

export const SplitLayout: Story = {
  ...StackLayout,
  args: {
    ...StackLayout.args,
    layout: 'split',
  },
};

