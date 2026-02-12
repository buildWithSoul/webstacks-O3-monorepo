import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SliderControls } from '@repo/ui';
import { useState } from 'react';
import { within, userEvent, expect } from '@storybook/test';

const meta: Meta<typeof SliderControls> = {
  title: 'Molecules/SliderControls',
  component: SliderControls,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentIndex: {
      control: { type: 'number', min: 0 },
      table: { type: { summary: 'number' } },
    },
    totalSlides: {
      control: { type: 'number', min: 0 },
      table: { type: { summary: 'number' } },
    },
    showDots: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    showArrows: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    onPrevious: {
      action: 'onPrevious',
      table: { type: { summary: '() => void' } },
    },
    onNext: {
      action: 'onNext',
      table: { type: { summary: '() => void' } },
    },
    onGoTo: {
      action: 'onGoTo',
      table: { type: { summary: '(index: number) => void' } },
    },
    className: {
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    mode: {
    control: 'radio',
    options: ['light', 'dark'],
    table: {
      type: { summary: "'light' | 'dark'" },
      defaultValue: { summary: 'light' },
    },
  },

  },
};

export default meta;
type Story = StoryObj<typeof SliderControls>;

export const Default: Story = {
  render: (args) => {
    const [current, setCurrent] = useState(2);

    return (
      <SliderControls
        {...args}
        currentIndex={current}
        onPrevious={() => setCurrent((c) => Math.max(c - 1, 0))}
        onNext={() => setCurrent((c) => Math.min(c + 1, args.totalSlides - 1))}
        onGoTo={setCurrent}
      />
    );
  },
  args: {
    totalSlides: 5,
    currentIndex: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByLabelText('Next slide'));
    await userEvent.click(canvas.getByLabelText('Previous slide'));
  },
};

export const SingleSlide: Story = {
  render: (args) => <SliderControls {...args} />,
  args: {
    totalSlides: 1,
    currentIndex: 0,
    showArrows:true
  },
  play: async ({ canvasElement }) => {
    expect(canvasElement).toBeEmptyDOMElement();
  },
};

export const OnlyDots: Story = {
  render: (args) => {
    const [current, setCurrent] = useState(1);

    return (
      <SliderControls
        {...args}
        currentIndex={current}
        onGoTo={setCurrent}
      />
    );
  },
  args: {
    totalSlides: 4,
    currentIndex: 1,
    showDots: true,
    showArrows: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dot = canvas.getByLabelText('Go to slide 3');
    await userEvent.click(dot);

    expect(dot).toHaveAttribute('aria-current', 'true');
  },
};

export const OnlyArrows: Story = {
  render: (args) => {
    const [current, setCurrent] = useState(0);

    return (
      <SliderControls
        {...args}
        currentIndex={current}
        onPrevious={() => setCurrent((c) => Math.max(c - 1, 0))}
        onNext={() => setCurrent((c) => Math.min(c + 1, args.totalSlides - 1))}
      />
    );
  },
  args: {
    totalSlides: 3,
    currentIndex: 0,
    showDots: false,
    showArrows: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.queryByRole('button', { name: /go to slide/i })
    ).toBeNull();

    await userEvent.click(canvas.getByLabelText('Next slide'));
  },
};

export const ManySlides: Story = {
  render: (args) => {
    const [current, setCurrent] = useState(5);

    return (
      <SliderControls
        {...args}
        currentIndex={current}
        onPrevious={() => setCurrent((c) => Math.max(c - 1, 0))}
        onNext={() => setCurrent((c) => Math.min(c + 1, args.totalSlides - 1))}
        onGoTo={setCurrent}
      />
    );
  },
  args: {
    totalSlides: 10,
    currentIndex: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dots = canvas.getAllByRole('button', {
      name: /go to slide/i,
    });

    expect(dots.length).toBe(10);
  },
};

export const CustomStyling: Story = {
  render: (args) => {
    const [current, setCurrent] = useState(1);

    return (
      <SliderControls
        {...args}
        currentIndex={current}
        onPrevious={() => setCurrent((c) => Math.max(c - 1, 0))}
        onNext={() => setCurrent((c) => Math.min(c + 1, args.totalSlides - 1))}
        onGoTo={setCurrent}
      />
    );
  },
  args: {
    totalSlides: 4,
    currentIndex: 1,
    className: 'border p-4 rounded-lg',
  },
  play: async ({ canvasElement }) => {
    const root = canvasElement.firstElementChild as HTMLElement;

    expect(root).toHaveClass('border p-4 rounded-lg');
  },
};
export const DarkMode: Story = {
  args: {
    totalSlides: 5,
    currentIndex: 2,
    mode: 'dark',
  },

  decorators: [
    (Story) => (
      <div
        style={{
          background: '#000',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const next = canvas.getByLabelText('Next slide');
    const prev = canvas.getByLabelText('Previous slide');

    expect(next).toBeInTheDocument();
    expect(prev).toBeInTheDocument();
  },
};
