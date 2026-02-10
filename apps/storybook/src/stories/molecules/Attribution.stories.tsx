import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Attribution } from '@repo/ui';

const meta: Meta<typeof Attribution> = {
  title: 'Molecules/Attribution',
  component: Attribution,
  parameters: {
    docs: {
      description: {
        component:
          'Attribution displays a person’s identity with avatar, name, and role badge. ' +
          'It composes Avatar and Badge atoms and matches the Figma design.',
      },
    },
  },
  tags: ['autodocs'],
argTypes: {
  name: {
    control: 'text',
  },
  avatarSrc: {
    control: 'text',
  },
  role: {
      control: false,
      description: '{ label: string, variant: string }',

    },

},

};

export default meta;
type Story = StoryObj<typeof Attribution>;
export const Default: Story = {
  args: {
    name: 'Savanah Leonardo',
    avatarSrc: 'https://img.freepik.com/free-photo/romantic-girl-wears-hat-white-t-shirt-smiling-nature-adorable-fair-haired-woman-enjoying-walk-park_197531-10452.jpg?semt=ais_wordcount_boost&w=740&q=80',
    role: {
      label: 'CMO',
      variant: 'orange',
    },
  },
};
export const WithoutRole: Story = {
  args: {
    name: 'Savanah Leonardo',
    avatarSrc: 'https://img.freepik.com/free-photo/romantic-girl-wears-hat-white-t-shirt-smiling-nature-adorable-fair-haired-woman-enjoying-walk-park_197531-10452.jpg?semt=ais_wordcount_boost&w=740&q=80',
  },
};
