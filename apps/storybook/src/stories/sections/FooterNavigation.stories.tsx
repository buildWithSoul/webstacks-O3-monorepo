import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FooterNavigation } from '@repo/ui';
import { within, expect } from '@storybook/test';

const footerNavigationMock = {
  columns: [
    {
      _uid: 'col-1',
      groups: [
        {
          _uid: 'group-1',
          groupTitle: 'Products',
          links: [
            {
              _uid: 'link-1',
              label: 'Platform',
              link: {
                linkType: 'internal',
                internalLink: { cached_url: 'platform' },
              },
            },
            {
              _uid: 'link-2',
              label: 'Pricing',
              badge: 'New',
              link: {
                linkType: 'internal',
                internalLink: { cached_url: 'pricing' },
              },
            },
          ],
        },
      ],
    },
  ],
  bottomSection: [
    {
      legalLinks: [
        {
          _uid: 'legal-1',
          label: 'Privacy Policy',
          link: {
            linkType: 'internal',
            internalLink: { cached_url: 'privacy' },
          },
        },
      ],
      socialLinks: [
        {
          _uid: 'social-1',
          platform: 'twitter-x',
          url: 'https://twitter.com/example',
        },
      ],
    },
  ],
};

const meta: Meta<typeof FooterNavigation> = {
  title: 'Sections/FooterNavigation',
  component: FooterNavigation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    footerNavigation: {
      control: false,
      
      description:
        'Optional fallback footer data. When omitted, Storyblok hooks are used.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FooterNavigation>;

export const Default: Story = {
  
};

export const WithProvidedNavigation: Story = {
  args: {
    footerNavigation: footerNavigationMock,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const productsHeading = canvas.getByRole('heading', { name: 'Products' });
    expect(productsHeading).toBeInTheDocument();

    const platformLink = canvas.getByRole('link', { name: 'Platform' });
    expect(platformLink).toHaveAttribute('href', '/platform');

   const pricingLink = canvas.getByRole('link', {
  name: /Pricing/,
});

expect(pricingLink).toHaveAttribute('href', '/pricing');


    const badge = canvas.getByText('New');
    expect(badge).toBeInTheDocument();

    const privacyLink = canvas.getByRole('link', { name: 'Privacy Policy' });
    expect(privacyLink).toHaveAttribute('href', '/privacy');
const twitter = canvas
  .getAllByRole('link')
  .find(link =>
    link.getAttribute('href')?.includes('twitter.com')
  );

expect(twitter).toBeDefined();

  },
};


export const WithoutColumns: Story = {
  args: {
    footerNavigation: {
      bottomSection: footerNavigationMock.bottomSection,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.queryByRole('heading', { name: 'Products' })
    ).not.toBeInTheDocument();

    const privacyLink = canvas.getByRole('link', { name: 'Privacy Policy' });
    expect(privacyLink).toBeInTheDocument();
  },
};

export const ExternalLinksOnly: Story = {
  args: {
    footerNavigation: {
      columns: [
        {
          _uid: 'col-ext',
          groups: [
            {
              _uid: 'group-ext',
              groupTitle: 'Resources',
              links: [
                {
                  _uid: 'ext-1',
                  label: 'Blog',
                  link: {
                    linkType: 'external',
                    externalUrl: 'https://blog.example.com',
                  },
                },
              ],
            },
          ],
        },
      ],
      bottomSection: [],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const blogLink = canvas.getByRole('link', { name: 'Blog' });

    expect(blogLink).toHaveAttribute(
      'href',
      'https://blog.example.com/'
    );

    expect(blogLink.getAttribute('href')).toMatch(/^https?:\/\//);
  },
};


