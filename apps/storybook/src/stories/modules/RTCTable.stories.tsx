import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RTCTable } from '@repo/ui'
import type { RTCTableBlok } from '@repo/ui'

const meta: Meta<typeof RTCTable> = {
  title: 'Modules/RTCTable',
  component: RTCTable,
  tags: ['autodocs'],
  args: {
    blok: {
      _uid: 'rtc-table-1',
      thead: [
        { value: 'Feature' },
        { value: 'Description' },
        { value: 'Basic' },
        { value: 'Pro' },
        { value: 'Enterprise' },
      ],
      tbody: [
        {
          body: [
            { value: 'Authentication' },
            { value: 'User login & access' },
            { value: '✔' },
            { value: '✔' },
            { value: '✔' },
          ],
        },
        {
          body: [
            { value: 'SSO' },
            { value: 'Single sign-on' },
            { value: '-' },
            { value: '✔' },
            { value: '✔' },
          ],
        },
        {
          body: [
            { value: 'Audit Logs' },
            { value: 'Track user actions' },
            { value: '-' },
            { value: '-' },
            { value: '✔' },
          ],
        },
        {
          body: [
            { value: 'Custom Roles' },
            { value: 'Advanced permissions' },
            { value: '-' },
            { value: '✔' },
            { value: '✔' },
          ],
        },
        {
          body: [
            { value: 'SLA' },
            { value: 'Guaranteed uptime' },
            { value: '-' },
            { value: '-' },
            { value: '✔' },
          ],
        },
        {
          body: [
            { value: 'Support' },
            { value: 'Priority support' },
            { value: '-' },
            { value: '✔' },
            { value: '✔' },
          ],
        },
        {
          body: [
            { value: 'Compliance' },
            { value: 'SOC2 & ISO' },
            { value: '-' },
            { value: '-' },
            { value: '✔' },
          ],
        },
      ],
    } as RTCTableBlok,
    pageSize: 4,
  },
}

export default meta
type Story = StoryObj<typeof RTCTable>

export const Default: Story = {}
