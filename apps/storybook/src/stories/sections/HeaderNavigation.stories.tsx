import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeaderNavigation } from "@repo/ui";
import type { HeaderNavigationProps } from "@repo/ui";
import { within, expect } from "@storybook/test";

const headerNavigationMock: HeaderNavigationProps["headerNavigation"] = {
  component: "globalNavigation",
  announcement: " Summer Sale: Get 30% off on all courses! Limited time offer.",
  announcementIcon: "megaphone",
  announcementLink: [
    {
      component: "button",
      label: "Learn More",
      linkType: "internal",
      internalLink: {
        id: "12345",
        url: "/summer-sale",
        linktype: "story",
        fieldtype: "multilink",
        cached_url: "summer-sale",
      },
      externalUrl: "",
      openInNewTab: false,
    },
  ],
  announcementTheme: "success",
  menuItems: [
    {
      _uid: "menu-001",
      component: "navigationMenuItem",
      label: "Products",
      link: {
        component: "link",
        label: "View All Products",
        linkType: "internal",
        internalLink: {
          id: "prod-001",
          _uid: "page-001",
          name: "Products",
          slug: "products",
          component: "page",
        },
        externalUrl: "",
        openInNewTab: false,
      },
      innerItems: [
        {
          _uid: "inner-001",
          component: "navigationInnerItem",
          icon: "laptop",
          label: "Web Development",
          description: "Learn modern web technologies",
          link: {
            component: "link",
            label: "Explore Web Dev",
            linkType: "internal",
            internalLink: {
              id: "web-001",
              _uid: "page-002",
              name: "Web Development Courses",
              slug: "courses/web-development",
              component: "page",
            },
            externalUrl: "",
            openInNewTab: false,
          },
        },
        {
          _uid: "inner-002",
          component: "navigationInnerItem",
          icon: "smartphone",
          label: "Mobile Apps",
          description: "iOS & Android development",
          link: {
            component: "link",
            label: "View Mobile Courses",
            linkType: "internal",
            internalLink: {
              id: "mobile-001",
              _uid: "page-003",
              name: "Mobile Development",
              slug: "courses/mobile-development",
              component: "page",
            },
            externalUrl: "",
            openInNewTab: false,
          },
        },
        {
          _uid: "inner-003",
          component: "navigationInnerItem",
          icon: "chart-bar",
          label: "Data Science",
          description: "Machine Learning & AI",
          link: {
            component: "link",
            label: "Explore Data Science",
            linkType: "internal",
            internalLink: {
              id: "data-001",
              _uid: "page-004",
              name: "Data Science Courses",
              slug: "courses/data-science",
              component: "page",
            },
            externalUrl: "",
            openInNewTab: false,
          },
        },
      ],
      spotlightCard: {
        _uid: "spotlight-001",
        component: "navigationSpotlightCard",
        heading: {
          heading: {
            _type: "heading",
            fontFamily: "sans-serif",
            elementType: "h3",
            headingSize: "medium",
          },
          body: [
            {
              _uid: "text-001",
              component: "text",
              text: "Featured Course: React Masterclass",
            },
          ],
        },
      },
    },
    {
      _uid: "menu-002",
      component: "navigationMenuItem",
      label: "Resources",
      link: {
        component: "link",
        label: "All Resources",
        linkType: "internal",
        internalLink: {
          id: "res-001",
          _uid: "page-005",
          name: "Resources",
          slug: "resources",
          component: "page",
        },
        externalUrl: "",
        openInNewTab: false,
      },
      innerItems: [
        {
          _uid: "inner-004",
          component: "navigationInnerItem",
          icon: "book-open",
          label: "Documentation",
          description: "API references and guides",
          link: {
            component: "link",
            label: "Read Docs",
            linkType: "external",
            internalLink: undefined,
            externalUrl: "https://docs.example.com",
            openInNewTab: true,
          },
        },
        {
          _uid: "inner-005",
          component: "navigationInnerItem",
          icon: "video",
          label: "Tutorials",
          description: "Step-by-step video guides",
          link: {
            component: "link",
            label: "Watch Tutorials",
            linkType: "internal",
            internalLink: {
              id: "tut-001",
              _uid: "page-006",
              name: "Tutorials",
              slug: "tutorials",
              component: "page",
            },
            externalUrl: "",
            openInNewTab: false,
          },
        },
      ],
      featuredCard: {
        _uid: "featured-001",
        component: "navigationFeaturedCard",
        callToAction: {
          component: "link",
          linkType: "internal",
          externalUrl: "",
          openInNewTab: false,
        },
        linkPosition: "bottom",
        submenuLayout: "grid",
      },
    },
    {
      _uid: "menu-003",
      component: "navigationMenuItem",
      label: "Company",
      link: {
        component: "link",
        label: "About Us",
        linkType: "internal",
        internalLink: {
          id: "about-001",
          _uid: "page-008",
          name: "About",
          slug: "about",
          component: "page",
        },
        externalUrl: "",
        openInNewTab: false,
      },
      innerItems: [
        {
          _uid: "inner-006",
          component: "navigationInnerItem",
          icon: "users",
          label: "Our Team",
          description: "Meet our experts",
          link: {
            component: "link",
            label: "Meet the Team",
            linkType: "internal",
            internalLink: {
              id: "team-001",
              _uid: "page-009",
              name: "Team",
              slug: "team",
              component: "page",
            },
            externalUrl: "",
            openInNewTab: false,
          },
        },
        {
          _uid: "inner-007",
          component: "navigationInnerItem",
          icon: "briefcase",
          label: "Careers",
          description: "Join our growing team",
          link: {
            component: "link",
            label: "View Openings",
            linkType: "external",
            internalLink: undefined,
            externalUrl: "https://careers.example.com",
            openInNewTab: true,
          },
        },
      ],
    },
    {
      _uid: "menu-004",
      component: "navigationMenuItem",
      label: "Contact",
      link: {
        component: "link",
        label: "Contact Us",
        linkType: "internal",
        internalLink: {
          id: "contact-001",
          _uid: "page-010",
          name: "Contact",
          slug: "contact",
          component: "page",
        },
        externalUrl: "",
        openInNewTab: false,
      },
    },
  ],
  ctaBar: [
    {
      component: "ctaBar",
      buttons: [
        {
          component: "button",
          label: "Sign In",
          linkType: "internal",
          internalLink: {
            id: "auth-001",
            url: "/signin",
            linktype: "story",
            fieldtype: "multilink",
            cached_url: "signin",
          },
          externalUrl: "",
          openInNewTab: false,
        },
      ],
    },
  ],
};

const meta: Meta<typeof HeaderNavigation> = {
  title: "Sections/HeaderNavigation",
  component: HeaderNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div>
        <main>
          <Story />
          <section style={{ height: 400 }} />
        </main>
      </div>
    ),
  ],
  argTypes: {
    headerNavigation: {
      control: false,
      table: {
        type: {
          summary: "StoryblokGlobalNavigation",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeaderNavigation>;

export const Navigation: Story = {
  args: {
    headerNavigation: { ...headerNavigationMock, announcement: undefined },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const globalNav = canvas.getByRole('navigation', { name: 'Global' });
    expect(globalNav).toBeInTheDocument();

    const resourcesDesktop = canvas.queryByText('Resources');

    if (!resourcesDesktop) {
      const menuToggle = canvas.getByRole('button', { expanded: false });
     menuToggle.click();
    }

    expect(canvas.getByText('Products')).toBeInTheDocument();
    expect(canvas.getByText('Resources')).toBeInTheDocument();
    expect(canvas.getByText('Company')).toBeInTheDocument();

    expect(
      canvas.getByRole('link', { name: 'Sign In' })
    ).toHaveAttribute('href', '/signin');
  },
};


export const WithAnnouncementBar: Story = {
  args: {
    headerNavigation: headerNavigationMock,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByText(
        "Summer Sale: Get 30% off on all courses! Limited time offer."
      )
    ).toBeInTheDocument();

    expect(canvas.getByRole("link", { name: "Learn More" })).toHaveAttribute(
      "href",
      "https://summer-sale/"
    );
  },
};

export const NavigationWithoutCTA: Story = {
  args: {
    headerNavigation: {
      ...headerNavigationMock,
      ctaBar: [],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByText("Products")
    ).toBeInTheDocument();

    expect(
      canvas.queryByRole("button", { name: "Sign In" })
    ).not.toBeInTheDocument();
  },
};

export const AnnouncementOnly: Story = {
  args: {
    headerNavigation: {
      component: "globalNavigation",
      announcement: "Maintenance scheduled for tonight",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByText("Maintenance scheduled for tonight")
    ).toBeInTheDocument();
  },
};
