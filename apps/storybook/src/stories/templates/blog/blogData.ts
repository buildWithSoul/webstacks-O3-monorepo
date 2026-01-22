import { dirname } from "node:path";

export const mockBlogPosts = [
  {
    _type: "blogPost" as const,
    publishedDate: "02/10/2025",
    seo: {
      slug: {
        _type: "slug" as const,
        current: "react-performance-tips",
      },
    },
    _id: "post-1",
    title: "React Performance Tips",
    excerpt: "Improve performance in React apps",
    topics: [
      {
        _type: "blogTopic" as const,
        _id: "topic-design",
        name: "Design Systems",
      },
      { _type: "blogTopic" as const, _id: "topic-ui", name: "UI Engineering" },
    ],

    author: {
      _id: "1",
      _type: "person" as const,
      firstName: "Jane",
      lastName: "Doe",
      headshot: {
        _type: "image" as const,
        asset: {
          _type: "reference" as const,
          _ref: "-",

          url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        },
        alt: "Jane Doe",
      },
      slug: {
        _type: "slug" as const,
        current: "author",
      },
    },

    featuredImage: {
      _type: "image" as const,
      asset: {
        _type: "reference" as const,
        _ref: "-",

        url: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
      },
      alt: "Design system components",
      width: 1200,
      height: 675,
    },
    readTime : 5
  },
    {
      _type: "blogPost" as const,
      publishedDate: "02/10/2025",
      seo: {
        slug: {
          _type: "slug" as const,
          current: "slug2",
        },
      },
      _id: "post-2",
      title: "Next.js App Router Guide",
      excerpt: "Deep dive into the App Router",
    },
    {
      _type: "blogPost" as const,
      publishedDate: "02/10/2025",
      seo: {
        slug: {
          _type: "slug" as const,
          current: "slug3",
        },
      },
      _id: "post-3",
      title: "Design Systems at Scale",
      excerpt: "Building scalable design systems",
    },
];
