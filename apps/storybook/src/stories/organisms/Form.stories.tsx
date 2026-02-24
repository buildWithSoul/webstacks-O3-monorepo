import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { within, userEvent } from '@storybook/test'
import {Form} from '@repo/ui'

const meta: Meta<typeof Form> = {
  title: 'Organisms/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

}

export default meta
type Story = StoryObj<typeof Form>



const basePlay: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.type(
    canvas.getByLabelText(/your name/i),
    'Jane Doe'
  )

  await userEvent.type(
    canvas.getByLabelText(/^your email/i),
    'jane@example.com'
  )

  await userEvent.type(
    canvas.getByLabelText(/company email/i),
    'jane@company.com'
  )


  await userEvent.type(
    canvas.getByLabelText(/description/i),
    'This is a test inquiry from Storybook.'
  )

  await userEvent.click(canvas.getByLabelText(/linkedin/i))

  const submitButton = canvas.getByRole('button', { name: /submit/i })
  await userEvent.click(submitButton)

}



export const Default: Story = {
  play: basePlay,
}

export const FilledButNotSubmitted: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(
      canvas.getByLabelText(/your name/i),
      'John Smith'
    )

    await userEvent.type(
      canvas.getByLabelText(/^your email/i),
      'john@demo.com'
    )

    await userEvent.click(canvas.getByLabelText(/google/i))
  },
}

export const EmptyState: Story = {}
