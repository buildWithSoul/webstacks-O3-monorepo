import NextImage from 'next/image'
import { SanityBlogPost } from '../../../types/sanity'
import { Breadcrumbs, Image } from '../../molecules'
import { Eyebrow, Heading } from '../../atoms'
import { formatDate } from '../../../utils/date'

interface BlogHeroProps {
  post: SanityBlogPost
}

const BlogHero = ({ post }: BlogHeroProps) => {
  const featuredImage = post.featuredImage
  const pathName = `/blog/${post.seo?.slug?.current}`

  return (
    <section className="bg-(--surface-background) section-padding-xl">
      <div className="mx-auto max-w-[1280px] lg:px-8  text-center">
        {/* Breadcrumb */}
        <div className="mb-10 flex justify-start">
          <Breadcrumbs
            breadcrumbItems={[
              { label: 'Home', link: '/' },
              { label: 'Blog', link: '/blog' },
            ]}
          />
        </div>

        {/* Eyebrow */}
       <Eyebrow eyebrow='Article'/>

        {/* Title */}
        <Heading
          as="h1"
          size="5xl"
          className="mx-auto max-w-[900px] text-heading leading-tight"
        >
          {post.title}
        </Heading>

        {/* Description */}
        {post.excerpt && (
          <p className="mx-auto mt-4 max-w-[600px] text-sm text-(--text-body-dark)">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        {/* <div className="mt-6 flex justify-center gap-6 text-sm text-(--text-body-muted)">
          {post.publishedDate && (
            <span>{formatDate(post.publishedDate)}</span>
          )}
          {post.readTime && (
            <span>{post.readTime} min read</span>
          )}
        </div> */}

        {/* Image */}
        {featuredImage?.asset && (
          <div className="mt-16 overflow-hidden">
            <Image
              {...featuredImage}
              noFill
              unsetMaxWidth
              objectCover
              alt={featuredImage.alt || 'blog hero'}
              className="w-full [&_img]:object-center min-w-[343px] min-h-[343px] "
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogHero