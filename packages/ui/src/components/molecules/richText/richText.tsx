'use client'

import type { FC } from 'react'
import { StoryblokServerRichText } from '@storyblok/react/rsc'
import { RichTextContent } from '../../../types/storyblok'
import { twMerge } from 'tailwind-merge'

export interface RichTextProps {
  doc?: RichTextContent
  className?: string
}

export const RichText: FC<RichTextProps> = ({ doc, className }) => {
  if (!doc) return null

  return (
    <div
      className={twMerge(
        `
        text-(--text-body-dark)!
        text-rich-body
        /* spacing between blocks */
        [&_p]:mb-4!
        [&_h1]:mb-4 [&_h2]:mb-4 [&_h3]:mb-3 [&_h4]:mb-3
        [&_ul]:mb-4 [&_ol]:mb-4
        [&_li]:mb-1.5 
        [&_li_p]:mb-0!


        /* list styles */
        [&_ul]:list-disc
        [&_ul]:pl-5

        [&_ol]:list-decimal
        [&_ol]:pl-5

        /* nested list behavior */
        [&_ul_ul]:list-circle
        [&_ol_ol]:list-decimal

        /* text rhythm */
        [&_strong]:font-semibold
        [&_em]:italic
        [&_u]:underline
        `,
        className
      )}
    >
      <StoryblokServerRichText doc={doc} />
    </div>
  )
}
