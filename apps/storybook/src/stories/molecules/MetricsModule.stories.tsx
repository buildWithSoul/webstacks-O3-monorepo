import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "@storybook/test";
import {MetricsModule} from "@repo/ui";

const meta: Meta<typeof MetricsModule> = {
  title: "Molecules/MetricsModule",
  component: MetricsModule,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    metrics: {
      control: false,
      table: {
        type: { summary: "MetricItem[]" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetricsModule>;

export const ThreeMetrics: Story = {
  args: {
    _type: "metricsModule",
    metrics: [
      { _key: "1", label: "Users", value: "10K+" },
      { _key: "2", label: "Downloads", value: "500K" },
      { _key: "3", label: "Countries", value: "42" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("10K+")).toBeVisible();
    await expect(canvas.getByText("500K")).toBeVisible();
    await expect(canvas.getByText("42")).toBeVisible();

    const grid = canvasElement.querySelector(".grid");
    expect(grid?.className).toContain("lg:grid-cols-3");
  },
};

export const TwoMetrics: Story = {
  args: {
    _type: "metricsModule",
    metrics: [
      { _key: "m1", label: "Clients", value: "120" },
      { _key: "m2", label: "Projects", value: "86" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("120")).toBeVisible();
    await expect(canvas.getByText("86")).toBeVisible();

    const grid = canvasElement.querySelector(".grid");
    expect(grid?.className).toContain("sm:grid-cols-2");
  },
};

export const OddMetricsFallback: Story = {
  args: {
    _type: "metricsModule",
    metrics: [
      { _key: "m1", label: "Users", value: "1M" },
      { _key: "m2", label: "Sessions", value: "8M" },
      { _key: "m3", label: "APIs", value: "120+" },
      { _key: "m4", label: "Regions", value: "16" },
      { _key: "m5", label: "Partners", value: "32" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("1M")).toBeVisible();
    await expect(canvas.getByText("32")).toBeVisible();

    const grid = canvasElement.querySelector(".grid");
    expect(grid?.className).toContain("lg:grid-cols-3");
  },
};
