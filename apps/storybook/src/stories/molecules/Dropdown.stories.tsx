import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within, userEvent } from "@storybook/test";
import { Dropdown } from "@repo/ui";

const meta: Meta<typeof Dropdown> = {
  title: "Molecules/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    trigger: {
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
    items: {
      control: false,
      table: { type: { summary: "DropdownItem[]" } },
    },
    side: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      table: { type: { summary: "'top' | 'bottom' | 'left' | 'right'" } },
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      table: { type: { summary: "'start' | 'center' | 'end'" } },
    },
    sideOffset: {
      control: "number",
      table: { type: { summary: "number" } },
    },
    modal: {
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const DashboardIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z"
      fill="currentColor"
    />
  </svg>
);

const LogoutIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M16 17l5-5-5-5v3H9v4h7v3ZM4 4h8v2H4v12h8v2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      fill="currentColor"
    />
  </svg>
);

export const Default: Story = {
  args: {
    trigger: <button>Open Dropdown</button>,
    items: [
      { key: "profile", label: "Profile", onSelect: () => {} },
      { key: "settings", label: "Settings", onSelect: () => {} },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Open Dropdown"));
    const menu = within(document.body);
    await expect(menu.getByText("Profile")).toBeVisible();
    await expect(menu.getByText("Settings")).toBeVisible();
  },
};

export const WithIcons: Story = {
  args: {
    trigger: <button>Options</button>,
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        icon: DashboardIcon,
        onSelect: () => {},
      },
      {
        key: "logout",
        label: "Logout",
        icon: LogoutIcon,
        onSelect: () => {},
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Options"));
    const menu = within(document.body);
    const dashboard = menu.getByText("Dashboard");
    const logout = menu.getByText("Logout");
    await expect(dashboard).toBeVisible();
    await expect(logout).toBeVisible();
    const dashboardItem = dashboard.closest('[role="menuitem"]');

    await expect(dashboardItem?.querySelector("svg")).toBeTruthy();
    const logoutItem = logout.closest('[role="menuitem"]');

    await expect(logoutItem?.querySelector("svg")).toBeTruthy();
  },
};

export const WithActiveItemAndCustomProps: Story = {
  args: {
    trigger: <button className="custom-trigger">Options</button>,
    side: "right",
    align: "end",
    sideOffset: 16,
    modal: true,
    activeItemClassName: "bg-button-primary text-white",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        isActive: true,
        icon: DashboardIcon,
        onSelect: () => {},
      },
      {
        key: "logout",
        label: "Logout",
        icon: LogoutIcon,
        onSelect: () => {},
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Options"));

    const menu = within(document.body);

    const activeText = menu.getByText("Dashboard");
    const inactiveText = menu.getByText("Logout");

    await expect(activeText).toBeVisible();
    await expect(inactiveText).toBeVisible();

    const activeItem = activeText.closest('[role="menuitem"]');
    const inactiveItem = inactiveText.closest('[role="menuitem"]');

    expect(activeItem?.className).toContain("bg-button-primary");
    expect(activeItem?.className).toContain("text-white");

    expect(inactiveItem?.className).not.toContain("bg-button-primary");
  },
};
