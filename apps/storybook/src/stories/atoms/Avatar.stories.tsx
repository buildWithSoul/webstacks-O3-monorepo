import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {Avatar} from '@repo/ui';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'Avatar is a basic identity atom that displays a user image or a fallback initial. '},
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;
export const Default: Story = {
  args: {
    src: 'https://img.freepik.com/free-photo/romantic-girl-wears-hat-white-t-shirt-smiling-nature-adorable-fair-haired-woman-enjoying-walk-park_197531-10452.jpg?semt=ais_wordcount_boost&w=740&q=80',
    alt: 'Savanah Leonardo',
  },
};

export const Fallback: Story = {
  args: {
    alt: 'Savanah Leonardo',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When no image source is provided, Avatar renders a fallback using the first letter of the alt text.',
      },
    },
  },
};
