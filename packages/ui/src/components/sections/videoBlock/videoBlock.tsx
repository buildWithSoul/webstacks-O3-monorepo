'use client'

import type { FC } from 'react'
import { storyblokEditable, type SbBlokData } from '@storyblok/react'
import { Video } from '../../modules'

export interface VideoBlockBlok extends SbBlokData {
  autoPlay?: boolean
  video?: {
    title?: string
    videoType?: 'youtube' | 'wistia'
    youtubeUrl?: string
    wistiaUrl?: string
    thumbnail?: {
      filename?: string
      alt?: string
    }
  }
}

export const VideoBlock: FC<{ blok: VideoBlockBlok }> = ({ blok }) => {
  const {
    size = 'full',
    video,
    autoPlay = false,
  } = blok

  if (!video) return null



  return (
    <div
      {...storyblokEditable(blok)}
      className={'section-padding-xl bg-(--surface-background)'}
    >
          <Video
            blok={{
              _uid: `${blok._uid}-video`,
              component: 'video',
              autoPlay,
              ...video,
            }}
          />
      
    </div>
  )
}

