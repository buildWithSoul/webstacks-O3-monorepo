'use client'

import type { FC } from 'react'
import { storyblokEditable } from '@storyblok/react'
import type { SbBlokData } from '@storyblok/react'
import { ContentBlock, ContentBlockBlok } from '../../organisms'
import { StatItem } from '../../modules'


interface StatItemBlok extends SbBlokData {
  value: string
  description: string
}

export interface MetricsBlockBlok extends SbBlokData {
  content?: ContentBlockBlok[]
  metrics?: StatItemBlok[]
  htmlId?: string
}

export const MetricsBlock: FC<MetricsBlockBlok> = ({
  content,
  metrics,
  htmlId,
  ...blok
}) => {
  return (
    
    <section
      {...storyblokEditable(blok)}
      id={htmlId}
      className="section-padding-xl bg-(--surface-background)"
    >
      <div
        className="
           grid max-w-[1440px] grid-cols-1
          gap-(--gaps-56-48-48)
          lg:grid-cols-2
        "
      >
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

        {metrics?.length ? (
          <div
            className="
              grid 
              gap-y-(--gaps-56-48-48)
            "
          >
            {metrics.slice(0, 3).map((metric) => (
              <div
                key={metric._uid}
                {...storyblokEditable(metric)}
              >
                <StatItem
                  blok={{
                    _uid: metric._uid,
                    value: metric.value,
                    description: metric.description,
                  }}
                  variant="nested"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}