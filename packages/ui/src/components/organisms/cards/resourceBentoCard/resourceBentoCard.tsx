import type { FC } from 'react'
import { getResourceRoute, RESOURCE_TYPE_LABELS } from '../../../../lib'
import { Button, Heading, Link } from '../../../atoms'
import { extractPlainText, ResourceCardProps } from '../../resourceCard'
import { Image } from '../../../molecules'
import { formatDate } from '../../../../utils/date'
import { twMerge } from 'tailwind-merge'

export interface ResourceBentoCardProps extends ResourceCardProps {
  size?: 'sm' | 'md' | 'lg'
}

const containerStyles: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'flex flex-col md:flex-row items-center gap-4 p-4',
  md: 'flex flex-col gap-(--scale-24) p-(--scale-24)',
  lg: 'flex flex-col gap-6 p-6',
}

const imageStyles: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'md:w-1/2 aspect-4/3',
  md: 'aspect-video',
  lg: 'aspect-video',
}

const contentStyles: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'md:w-1/2',
  md: '',
  lg: '',
}

export const ResourceBentoCard: FC<ResourceBentoCardProps> = ({
  size = 'md',
  ...props
}) => {
  const {
    _type,
    title,
    excerpt,
    body,
    featuredImage,
    seo,
    slug,
    publishDate,
  } = props

  const displayText = excerpt || (body ? extractPlainText(body) : '')
  const resourceSlug = seo?.slug?.current || slug?.current || ''
  const resourceUrl = `${getResourceRoute(_type)}/${resourceSlug}`
  const badgeLabel = RESOURCE_TYPE_LABELS[_type] || 'Article'

  return (
    <Link
      href={resourceUrl}
      className={`
        group relative overflow-hidden border border-(--stroke-secondary)
        transition-all duration-200 hover:shadow-lg
        ${containerStyles[size]}
      `}
    >
      {featuredImage && (
        <div
          className={`
            relative overflow-hidden
            ${imageStyles[size]}
          `}
        >
          <Image
            {...featuredImage}
            alt={featuredImage?.alt || title || 'Resource'}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className={`flex flex-col ${contentStyles[size]}`}>
        <div className="flex dark items-center gap-2 text-sm font-medium mb-2 text-(--text-eyebrow-date)">
          {publishDate && (
            <>
              <span>{formatDate(publishDate)}</span>
              <span>|</span>
            </>
          )}
          <span className="text-accent">{_type.toUpperCase()}</span>
        </div>

        {title && (
          <Heading as='h3' className={twMerge(
            'text-(--text-headings-dark)',
            size==='sm' ? 
            'text-display-xl mb-2' : 'text-display-2xl mb-4'
            )} >{title}</Heading>
        )}
       

        {displayText && (
          <p className={twMerge(
            'text-(--text-body-dark)',
            size==='sm' ? 
            'text-sm line-clamp-2 mb-4' : 'line-clamp-4 mb-6'
            )}>
            {displayText}
          </p>
        )}

       <Button mode='link' label='Learn more'/>
      </div>
    </Link>
  )
}
