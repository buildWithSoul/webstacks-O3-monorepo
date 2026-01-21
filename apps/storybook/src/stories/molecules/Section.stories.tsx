import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Section } from '@repo/ui';
import { within, expect } from '@storybook/test';

const meta: Meta<typeof Section> = {
  title: 'Molecules/Section',
  component: Section,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children:{control:'text'},
    as: { control: 'text', 
      table : {
        type : {summary :'Element Tpe'}
      }
    },
    id: { control: 'text',
      table : {
        type : {summary :'string'}
      }
     },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'sugar', 'bright'],
      table:{
        type:{
          summary : `'light' | 'dark' | 'sugar' | 'bright'`
        },
         defaultValue: {
      summary: 'light',
    },
      },
    },
    bgGradient: {
      control: 'select',
      options: ['none', 'purple', 'teal', 'blue', 'pink'],
      table:{
        type:{
          summary :`'none' | 'purple' | 'teal' | 'blue' | 'pink'`
        }
      }
    },
    inverseGradient: {
      control: 'boolean',
       table:{
        type:{
          summary :`boolean`
        }
      }
    },
    minHeight: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      table:{
        type:{
          summary: `'none' | 'sm' | 'md' | 'lg'`
        }
      }
    },
    responsivePadding: {
      control: 'object',
       table:{
        type:{
          summary: `'default' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`
        }
      }
    },
    backgroundImage: {
      control: false,
    },
    isFirstSection: {
      control: 'boolean',
       table:{
        type:{
          summary :`boolean`
        }
      }
    },
    sectionType: {
      control: 'text',
       table:{
        type:{
          summary :`string`
        }
      }
    },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    children: 'Default Section Content',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Default Section Content')).toBeInTheDocument();
  },
};

export const WithThemeDark: Story = {
  args: {
    theme: 'dark',
    children: <div>Dark Theme Section</div>,
  },
  play: async ({ canvasElement }) => {
    const section = canvasElement.querySelector('section');
    expect(section?.className).toContain('dark');
  },
};

export const WithGradient: Story = {
  args: {
    bgGradient: 'purple',
    children: <div>Gradient Section</div>,
  },
  play: async ({ canvasElement }) => {
    const section = canvasElement.querySelector('section');
    expect(section?.className).toContain('bg-primary');
  },
};

export const WithMinHeight: Story = {
  args: {
    minHeight: 'md',
    children: <div>Min Height Section</div>,
  },
  play: async ({ canvasElement }) => {
    const section = canvasElement.querySelector('section');
    expect(section?.className).toContain('min-h');
  },
};

export const WithResponsivePadding: Story = {
  args: {
    responsivePadding: {
      default: { top: 16, bottom: 16 },
      md: { top: 32, bottom: 32 },
    },
    children: <div>Padded Section</div>,
  },
  play: async ({ canvasElement }) => {
    const section = canvasElement.querySelector('section');
    expect(section?.className).toContain('pt-4');
    expect(section?.className).toContain('pb-4');
  },
};

export const FirstSectionOffset: Story = {
  args: {
    isFirstSection: true,
    children: <div>First Section Content</div>,
  },
  play: async ({ canvasElement }) => {
    const spacer = canvasElement.querySelector('.h-32');
    expect(spacer).toBeInTheDocument();
  },
};


