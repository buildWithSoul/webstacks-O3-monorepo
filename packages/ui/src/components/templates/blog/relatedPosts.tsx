import Link from 'next/link';
import { SanityBlogPost } from '../../../types/sanity';
import { RESOURCE_ROUTES } from '../../../lib';



interface RelatedPostsProps {
  posts: SanityBlogPost[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;
  
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-semibold text-heading">
        Related posts
      </h3>
      <ul className="flex flex-col border-t border-stroke-1">
        {posts.slice(0, 4).map(post => (
          <li key={post._id} className="border-b border-stroke-1">
            <Link 
              href={`${RESOURCE_ROUTES.blogPost}/${post?.seo?.slug?.current}`} 
              className="block text-sm text-body py-4 hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
