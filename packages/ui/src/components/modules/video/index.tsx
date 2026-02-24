'use client'

import { useState, type FC } from 'react'
import { storyblokEditable, type SbBlokData } from '@storyblok/react'
import { VideoPlayButton } from '../../atoms'
import { twMerge } from 'tailwind-merge'

export interface VideoBlok extends SbBlokData {
  title?: string
  videoType?: 'youtube' | 'wistia'
  youtubeUrl?: string
  wistiaUrl?: string
  thumbnail?: {
    filename?: string
    alt?: string
  }
  autoPlay?: boolean,
    classname?:string

}

const getVideoUrl = (blok: VideoBlok): string | null => {
  if (blok.videoType === 'youtube' && blok.youtubeUrl) {
    const match = blok.youtubeUrl.match(
      /(?:youtube\.com\/(?:.*v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )
    const id = match?.[1]
    return id ? `https://www.youtube.com/embed/${id}` : null
  }

  if (blok.videoType === 'wistia' && blok.wistiaUrl) {
    const match = blok.wistiaUrl.match(
      /(?:wistia\.(?:com|net)\/(?:medias|embed\/iframe)\/)([a-zA-Z0-9_-]+)/
    )
    const id = match?.[1]
    return id ? `https://fast.wistia.net/embed/iframe/${id}` : null
  }

  return null
}

const isEmbedUrl = (url: string): boolean => {
  const embedPatterns = [
    'youtube.com/embed',
    'youtu.be',
    'vimeo.com',
    'player.vimeo',
    'dailymotion.com/embed',
    'storyblok.com/video/embed',
  ]
  return embedPatterns.some((pattern) => url.includes(pattern))
}

export const Video: FC<{ blok: VideoBlok }> = ({ blok }) => {
  const {
    thumbnail,
    autoPlay = false,
    title,
    classname
  } = blok

  const [isPlaying, setIsPlaying] = useState(autoPlay)

  const videoUrl = getVideoUrl(blok)
  if (!videoUrl) return null

  const isEmbed = isEmbedUrl(videoUrl)
  return (
    <div
      {...storyblokEditable(blok)}
      className={
        twMerge(
          'relative w-(--widths-858-704-343) aspect-video bg-(--surface-background) border border-(--stroke-primary)',
          classname
        )
      }
    >
      {!isPlaying && thumbnail && (
        <img
          src={thumbnail.filename}
          alt={thumbnail.alt ?? 'Video thumbnail'}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {!isPlaying && (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 flex items-center justify-center group"
          aria-label="Play video"
        >
          <VideoPlayButton />
        </button>
      )}

      {isPlaying && (
        <>
          {isEmbed ? (
            <iframe
              src={videoUrl}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={title || 'Video player'}
            />
          ) : (
            <video
              src={videoUrl}
              className="absolute inset-0 h-full w-full"
              controls
              autoPlay={autoPlay}
              playsInline
            >
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          )}
        </>
      )}
    </div>
  )
}

