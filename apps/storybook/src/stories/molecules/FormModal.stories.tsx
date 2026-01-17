import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "@storybook/test";
import { FormModal } from "@repo/ui";
import { useState } from "react";

const meta: Meta<typeof FormModal> = {
  title: "Molecules/FormModal",
  component: FormModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isOpen: {
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    title: {
      control: "text",
      table: { type: { summary: "string" } },
    },
    onClose: {
      control: false,
      table: { type: { summary: "() => void" } },
    },
    formComponent: {
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
    children: {
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormModal>;

const getModalElement = () =>
  document.querySelector('.fixed.inset-0.z-100:not(.hidden)');

const OpenModalTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: "0.5rem 1rem",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Open Modal
      </button>

      <FormModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export const WithFormComponent: Story = {
  render: OpenModalTemplate,
  args: {
    title: "Contact Us",
    formComponent: (
      <form>
        <label>Email</label>
        <br />
        <input autoFocus aria-label="email-input" />
      </form>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("Open Modal"));

    const portal = within(document.body);
    await expect(portal.getByText("Contact Us")).toBeInTheDocument();
    await expect(portal.getByLabelText("email-input")).toBeInTheDocument();

    expect(getModalElement()).toBeTruthy();

    await userEvent.keyboard("{Escape}");
    expect(getModalElement()).toBeFalsy();
  },
};

export const WithFallbackContent: Story = {
  render: OpenModalTemplate,
  args: {
    title: "Fallback Test",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("Open Modal"));

    const portal = within(document.body);
    await expect(
      portal.getByText("No form component provided")
    ).toBeInTheDocument();

    await expect(
      portal.getByText(
        "Pass a form component via `formComponent` prop or `children`"
      )
    ).toBeInTheDocument();

    expect(getModalElement()).toBeTruthy();

    await userEvent.keyboard("{Escape}");

    expect(getModalElement()).toBeFalsy();
  },
};

export const EscapeTest: Story = {
  render: OpenModalTemplate,
  args: {
    title: "Test Modal",
    children: (
      <div style={{ padding: "1rem" }}>
        <p>Press Escape to close this modal</p>
        <input
          placeholder="Test input"
          style={{ width: "100%", padding: "0.5rem", marginTop: "1rem" }}
        />
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("Open Modal"));

    expect(getModalElement()).toBeTruthy();

    await userEvent.keyboard("{Escape}");
    expect(getModalElement()).toBeFalsy();
  },
};