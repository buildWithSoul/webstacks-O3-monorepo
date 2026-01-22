import NextImage from 'next/image'
import { SanityBlogPost } from '../../../types/sanity';
import { Breadcrumbs, Image } from '../../molecules';
import { Heading, Icon } from '../../atoms';
import { formatDate } from '../../../utils/date';


interface BlogHeroProps {
  post: SanityBlogPost;
}

const BlogHero = ({ post }: BlogHeroProps) => {
  const featuredImage = post.featuredImage
  const author = post.author
  const pathName = `/blog/${post.seo?.slug?.current}`
  const title = post.title;
  const publishDate = post.publishedDate
  const topics = post.topics || []
  const readTime = post.readTime || 0

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative pt-16 pb-12 lg:pt-24 lg:pb-20 md:pt-20 md:pb-16 sm:pt-16 sm:pb-12 xl:pt-32 xl:pb-24 2xl:pt-32 2xl:pb-24">
          {/* Back to blog breadcrumb */}
          <Breadcrumbs 
            breadcrumbItems={[
              { label: 'Back to blog', link: '/blog' }
            ]}
            variant="back"
          />

          {/* Main content - centered */}
          <div className="flex flex-col items-center justify-center gap-6 relative w-full text-center">
            {/* Content */}
            <div className="flex flex-col items-center gap-6 w-full max-w-[800px]">
              {/* Topics */}
              {topics.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {topics.map((topic) => (
                    <span 
                      key={topic._id}
                      className="text-sm font-semibold text-primary-link uppercase tracking-wide"
                    >
                      {topic.name}
                    </span>
                  )).reduce((prev, curr, index) => [
                    ...prev,
                    index > 0 && <span key={`sep-${index}`} className="text-primary-link">, </span>,
                    curr
                  ], [] as React.ReactNode[])}
                </div>
              )}
              
              {/* Main headline */}
              <Heading
                as="h1" 
                size="5xl" 
                fontFamily="accent"
                textTransform="none"
                className="text-heading leading-tight"
              >
                {post.title}
              </Heading>

              {/* Author meta info */}
              <div className="flex flex-wrap gap-4 md:gap-8 items-center justify-center">
                {author ?
                  <div className="flex gap-3 items-center">
                    <div className="size-[40px] shrink-0 overflow-hidden rounded-full bg-muted">
                      {author.headshot &&
                        <Image {...author.headshot} objectCover className="size-full" unsetMaxWidth unsetRatio alt="" />}
                    </div>
                    <span className="text-sm md:text-md text-body font-body">
                      {[author.firstName, author.lastName].filter(Boolean).join(' ')}
                    </span>
                  </div>
                  :
                  <div className="flex gap-3 items-center">
                    <div className="size-[40px] shrink-0 overflow-hidden rounded-full bg-muted">
                      <NextImage src="/icons/logo-icon.svg" alt="modus-logo-icon" width={40} height={40} className="size-full object-cover" />
                    </div>
                    <span className="text-sm md:text-md text-body font-body">Modus</span>
                  </div>
                }
                <div className="flex gap-2 items-center">
                  <Icon icon="calendar" size={20} className="text-body" />
                  <span className="text-sm md:text-md text-body font-body">{formatDate(publishDate)}</span>
                </div>
                {readTime > 0 && (
                  <div className="flex gap-2 items-center">
                    <Icon icon="clock" size={20} className="text-body" />
                    <span className="text-sm md:text-md text-body font-body">{readTime} MIN READ</span>
                  </div>
                )}
              </div>
            </div>
            {featuredImage?.asset && <div className="rounded-sm overflow-hidden w-full">
              <Image
                {...featuredImage}
                noFill
                objectCover
                unsetMaxWidth
                alt={featuredImage.alt || 'blog hero'}
                className='w-full overflow-hidden  [&_img]:object-center rounded-sm'
              />
            </div>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogHero;