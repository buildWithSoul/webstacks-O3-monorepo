import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '@repo/ui';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'Badge is a small, non-interactive label used to display roles, categories, or affiliations. '      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['navy', 'cyan', 'yellow', 'teal', 'orange'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: 'CMO',
    variant: 'navy',
  },
};
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge label="CMO" variant="navy" />
      <Badge label="CMO" variant="cyan" />
      <Badge label="CMO" variant="yellow" />
      <Badge label="CMO" variant="teal" />
      <Badge label="CMO" variant="orange" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All badge variants rendered together.',
      },
    },
  },
};
