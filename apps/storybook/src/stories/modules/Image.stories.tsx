import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ImageWithCaption } from '@repo/ui'

const meta: Meta<typeof ImageWithCaption> = {
  title: 'Modules/Image',
  component: ImageWithCaption,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: '720px',
          margin: '40px auto',
        }}
      >
        <Story />
      </div>
    ),
  ],
    argTypes: {
    blok: { control: false},
   
  },
}

export default meta

type Story = StoryObj<typeof ImageWithCaption>

export const Default: Story = {
  args: {
    blok: {
      _uid: 'image-WithCaption-1',
      component: 'image_WithCaption',
      image: {
        _type: 'image',
        alt: 'Demo image',
        asset: {
          _ref: 'image-1',
          _type: 'reference',
          url: 'https://a.storyblok.com/f/289819163632346/1910x1069/84fb8ed85d/abandoned-plans.PNG?cv=1768310421214',
          metadata: {
            dimensions: {
              width: 1200,
              height: 675,
              aspectRatio: 16/9,
            },
            lqip:
              'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD',
          },
        },
      },
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, lorem ut consequat pretium, justo justo lacinia enim, a lacinia nibh nulla a urna. Sed ac neque eros. Vivamus et nisi nec nibh suscipit mattis. In porta, augue a condimentum convallis, enim est ultricies orci, in facilisis erat justo ac diam.',
    },
  },
}
