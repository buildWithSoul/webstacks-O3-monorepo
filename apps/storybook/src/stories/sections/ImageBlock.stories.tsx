import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ImageBlock } from '@repo/ui';
import { within, expect } from '@storybook/test';

const meta: Meta<typeof ImageBlock> = {
  title: 'Sections/ImageBlock',
  component: ImageBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    image: {
      control: false,
      table: {
        type: {
          summary: 'Storyblok image object',
        },
      },
    },
    size: {
      control: 'select',
      options: ['full', 'large', 'medium', 'small'],
      table: {
        type: {
          summary: `'full' | 'large' | 'medium' | 'small'`,
        },
        defaultValue: {
          summary: 'full',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageBlock>;

const storyblokImage = {
  filename: 'https://images.unsplash.com/photo-1768697581060-52e2edbee7fa?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  alt: 'Image',
};

const getWrapper = (canvas: ReturnType<typeof within>) =>
  canvas.getByRole('img').parentElement;

export const Default: Story = {
  args: {
    image: storyblokImage,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = getWrapper(canvas);

    expect(canvas.getByRole('img')).toBeInTheDocument();
    expect(wrapper).not.toHaveClass(
      'max-w-[1008px]',
      'max-w-[768px]',
      'max-w-[576px]',
    );
  },
};

export const Large: Story = {
  args: {

    image: storyblokImage,
    size: 'large',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = getWrapper(canvas);

    expect(wrapper).toHaveClass('max-w-[1008px]');
  },
};

export const Medium: Story = {
  args: {
    image: storyblokImage,
    size: 'medium',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = getWrapper(canvas);

    expect(wrapper).toHaveClass('max-w-[768px]');
  },
};

export const Small: Story = {
  args: {
    image: storyblokImage,
    size: 'small',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = getWrapper(canvas);

    expect(wrapper).toHaveClass('max-w-[576px]');
  },
};


