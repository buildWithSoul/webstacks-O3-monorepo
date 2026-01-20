import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within, userEvent, waitFor } from "@storybook/test";
import { GenericForm } from "@repo/ui";

const meta: Meta<typeof GenericForm> = {
  title: "Molecules/Forms/GenericForm",
  component: GenericForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    fields: {
      control: false,
      table: {
        type: { summary: "FormField[]" },
      },
    },
    onSubmit: {
      control: false,
       table: {
        type: { summary: "()=>void" },
      },
    },
    buttonLabel: {
      control: "text",
       table: {
        type: { summary: "string" },
      },
      
    },
    buttonColor: {
      control: "select",
      options: ["primary", "secondary", "violet"],
       table: {
        type: { summary: `"primary", "secondary", "violet"` },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GenericForm>;

export const Defaut: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByLabelText(/first name/i)).toBeVisible();
    await expect(canvas.getByLabelText(/last name/i)).toBeVisible();
    await expect(canvas.getByLabelText(/email/i)).toBeVisible();
    await expect(canvas.getByLabelText(/company/i)).toBeVisible();

    await expect(canvas.getByRole("button", { name: "Submit" })).toBeVisible();
  },
};

export const CustomFields: Story = {
  args: {
    fields: [
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        required: true,
        placeholder: "Enter phone number",
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Your message",
      },
    ],
    buttonLabel: "Send Message",
      buttonColor : 'violet',
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByLabelText(/phone number/i)).toBeVisible();
    await expect(canvas.getByLabelText(/message/i)).toBeVisible();

    expect(canvas.queryByLabelText(/email/i)).toBeNull();
     await expect(
      canvas.getByRole("button", { name: "Send Message" })
    ).toBeVisible();
  },
};

export const SubmitWithData: Story = {
  args: {
    onSubmit: async (data) => {
      (window as any).__formData = data;
    },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/first name/i), "John");
    await userEvent.type(canvas.getByLabelText(/last name/i), "Doe");
    await userEvent.type(canvas.getByLabelText(/email/i), "john@example.com");

    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));

    await expect((window as any).__formData).toEqual({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    });
  },
};

export const SubmittingState: Story = {
  args: {
    onSubmit: () => new Promise((resolve) => setTimeout(resolve, 300)),
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/first name/i), "John");
    await userEvent.type(canvas.getByLabelText(/last name/i), "Doe");
    await userEvent.type(canvas.getByLabelText(/email/i), "john@example.com");

    const submitButton = canvas.getByRole("button", {
      name: /submit/i,
    });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toHaveTextContent("Submitting...");
    });

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent("Submit");
    });
  },
};
