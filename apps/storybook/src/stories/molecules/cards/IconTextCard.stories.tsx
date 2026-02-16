import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "@storybook/test"
import { IconTextCard } from "@repo/ui"

const meta: Meta<typeof IconTextCard> = {
  title: "Molecules/Cards/IconTextCard",
  component: IconTextCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    icon: {
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    heading: {
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    body: {
      control: false,
      table: {
        type: { summary: "Storyblok RichText" },
      },
    },
    button: {
      control: false,
      table: {
        type: { summary: "Storyblok button block[]" },
      },
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      table: {
        type: { summary: "'light' | 'dark'" },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof IconTextCard>

const mockBody = {
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "attrs": {
              "textAlign": null
            },
            "content": [
              {
                "text": "A design system creates order out of complexity. It ensures every component—from buttons to banners—works together seamlessly and reflects a unified brand language.",
                "type": "text"
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "textAlign": null
            }
          },
          {
            "type": "paragraph",
            "attrs": {
              "textAlign": null
            },
            "content": [
              {
                "text": "Includes:",
                "type": "text",
                "marks": [
                  {
                    "type": "bold"
                  }
                ]
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "textAlign": null
            }
          },
          {
            "type": "ordered_list",
            "attrs": {
              "order": 1
            },
            "content": [
              {
                "type": "list_item",
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "textAlign": null
                    },
                    "content": [
                      {
                        "text": "Lorem ipsum dolor sit amet, consectetur",
                        "type": "text"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "list_item",
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "textAlign": null
                    },
                    "content": [
                      {
                        "text": "Lorem ipsum dolor sit amet, consectetur",
                        "type": "text"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "list_item",
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "textAlign": null
                    },
                    "content": [
                      {
                        "text": "Lorem ipsum dolor sit amet, consectetur",
                        "type": "text"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "list_item",
                "content": [
                  {
                    "type": "paragraph",
                    "attrs": {
                      "textAlign": null
                    },
                    "content": [
                      {
                        "text": "Lorem ipsum dolor sit amet, consectetur",
                        "type": "text"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]}



export const WithIconOnly: Story = {
  args: {
    _key: "icon-text-card-icon",
    icon: "rocket",
    heading: "Building Consistency Into Every Website Experience",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText("Fast Setup")).toBeInTheDocument()

    const svg = canvasElement.querySelector("svg")
    await expect(svg).toBeInTheDocument()

    await expect(canvasElement.querySelector("button")).toBeNull()
  },
}
export const WithBody: Story = {
  args: {
    _key: "icon-text-card-body",
    icon: "rocket",
    heading: "Building Consistency Into Every Website Experience",
    body: mockBody as any,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByText("Powerful Features")
    ).toBeInTheDocument()

    await expect(
      canvas.getByText("bold")
    ).toBeInTheDocument()
  },
}

export const WithButton: Story = {
  args: {
    _key: "icon-text-card-button",
    icon: "rocket",
    heading: "Building Consistency Into Every Website Experience",
    body: mockBody as any,
    button: [
      {
        label: "Get Started",
        trailingIcon: "arrow-right",
      },
      {
        label: "Learn more",
        trailingIcon: "arrow-right",
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByText("Launch Faster")
    ).toBeInTheDocument()

    const button = canvas.getByRole("button", {
      name: "Get Started",
    })
    await expect(button).toBeInTheDocument()

    const card = canvasElement.firstElementChild as HTMLElement
    await expect(card.className).toContain("group")
  },
}

