'use client'

import type { FC } from 'react'
import { storyblokEditable, type SbBlokData } from '@storyblok/react'

import { ContentBlock, ContentBlockBlok, ResourceCard, ResourceCardProps } from '../../../organisms'

export interface ResourceCardDeckBlok extends SbBlokData {
  content?: ContentBlockBlok[]
  resources?: ResourceCardProps[]
  htmlId?: string
}

export const ResourceCardDeck: FC<ResourceCardDeckBlok> = ({
  content,
  resources,
  htmlId,
  ...blok
}) => {
  return (
    <section
      {...storyblokEditable(blok)}
      id={htmlId}
      className="section-padding-xl bg-(--surface-background)"
    >
      <div className="flex flex-col gap-12 sm:gap-16">

        {content?.length ? (
          <div className="flex flex-col gap-8">
            {content.map((nestedBlok) => (
              <ContentBlock
                key={nestedBlok._uid}
                blok={nestedBlok}
              />
            ))}
          </div>
        ) : null}

        {resources?.length ? (
          <div
            className="
              grid w-full justify-items-start
              grid-cols-1
              gap-y-(--gaps-56-48-48)
              gap-x-(--gaps-16-12-12)
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {resources.map((resource) => (
              <ResourceCard
                key={resource._id}
                {...resource}
              />
            ))}
          </div>
        ) : null}

      </div>
    </section>
  )
}