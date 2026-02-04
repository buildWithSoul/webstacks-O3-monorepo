import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, expect } from '@storybook/test';
import { FormBlock } from '@repo/ui';

const mockEyebrow = {
  eyebrow: 'Get started',
  elementType: 'h6',
};

const mockHeading = {
  heading: 'Talk to our team',
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
          text: 'Fill out the form and our team will get back to you within 24 hours.',
        },
      ],
    },
  ],
};

const MockForm = () => (
  <form className="space-y-4">
    <input placeholder="Email" className="w-full border px-3 py-2 rounded" />
    <button type="button" className="px-4 py-2 bg-black text-white rounded">
      Submit
    </button>
  </form>
);

const basePlay: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByText('Talk to our team'),
  ).toBeInTheDocument();

  await expect(
    canvas.getByText(/get back to you/i),
  ).toBeInTheDocument();
};


const meta: Meta<typeof FormBlock> = {
  title: 'Sections/FormBlock',
  component: FormBlock,
  decorators: [
    (Story) => (
      <div>
        <main style={{ padding: '2rem' }}>
          <Story />
          
        </main>
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    heading: { control: false },
    eyebrow: { control: false },
    body: { control: false },
    formComponent: { control: false },
  
  },
};

export default meta;
type Story = StoryObj<typeof FormBlock>;


export const Form: Story = {
  args: {
    eyebrow: mockEyebrow,
    heading: mockHeading,
    body: mockBody,
    formComponent: <MockForm />,
  },
  play: basePlay,
};

