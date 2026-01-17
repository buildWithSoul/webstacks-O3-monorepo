import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "@storybook/test";
import {CodeEmbed}  from "@repo/ui";

const meta: Meta<typeof CodeEmbed> = {
  title: "Molecules/CodeEmbed",
  component: CodeEmbed,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    code: {
      control: "text",
      table: {
        type: { summary: "string (HTML / CSS / JS)" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CodeEmbed>;

export const Default: Story = {
  args: {
    code: `
      <style>
        .embed-text { color: red; }
      </style>

      <div class="embed-text" id="embed-html">
        Hello Embed
      </div>

    
    `,
  },
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector(".code-embed-container");
    await expect(container).toBeInTheDocument();

    const html = canvasElement.querySelector("#embed-html");
    await expect(html).toBeInTheDocument();

    const stylesInjected = Array.from(document.querySelectorAll("style")).some(
      (style) => style.textContent?.includes(".embed-text")
    );
    await expect(stylesInjected).toBe(true);

  },
};

