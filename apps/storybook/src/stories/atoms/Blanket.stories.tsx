import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Blanket, Layout } from "@repo/ui";

const meta: Meta<typeof Blanket> = {
  title: "Atoms/Blanket",
  component: Blanket,
  parameters: {
    docs: {
      description: {
        component:
          "Blanket is a translucent overlay surface used behind content such as modals, hero sections, or cards. ",
      },
    },
    layout : 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: "100vh",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    className: {
      control: false,
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Blanket>;

export const Default: Story = {

  render: (args) => (
    <div className="relative h-full w-full overflow-hidden">
      <Blanket {...args}>
        <div className="max-w-sm space-y-4">
          <p className="text-white text-sm leading-relaxed  p-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
            soluta facere dicta harum quia accusamus neque assumenda doloribus
            magnam maiores omnis reprehenderit, eum ducimus earum pariatur esse
            necessitatibus blanditiis beatae at dolor? Saepe, ducimus facere?
            Dicta veniam, eius illo autem rem vitae, vel nisi, eveniet beatae
            reprehenderit minus dolorem animi ex atque aut dolores quo libero
            voluptatem quaerat in. Sit nulla distinctio velit quis reiciendis
            ratione tenetur aliquam temporibus officia ut odit eum aspernatur
            assumenda ad suscipit, a iste dolor. Eum, dicta dolore, dolorem ad
            saepe fugiat voluptatem sed aspernatur numquam, nam esse
            consequuntur. Repellat et tempora aliquam molestias in?
          </p>
        </div>
      </Blanket>
    </div>
  ),
};
