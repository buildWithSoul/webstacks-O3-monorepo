'use client'

import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { storyblokEditable } from '@storyblok/react'
import { Button, Icon } from '../../../atoms'
import { RichText } from '../../richText/richText'
import { RichTextContent } from '../../../../types/storyblok'

export interface IconTextCardProps {
  _key: string
  icon?: string
  heading?: string
  body?: RichTextContent // Storyblok rich text
  button?: any[] // Storyblok button bloks (max 2)
  theme?: 'light' | 'dark'
}

export const IconTextCard: FC<IconTextCardProps> = ({
  icon,
  heading,
  body,
  button = [],
  theme = 'light',
  ...blok
}) => {
  const hasButtons = button.length > 0

  return (
    <div
      {...storyblokEditable(blok)}
      className={twMerge(
        'flex h-full max-w-93.75 flex-col gap-8 rounded-2xl p-6 transition-all duration-200',
        'bg-(--surface-card)',
        hasButtons && 'group cursor-pointer hover:shadow-lg',
        theme === 'dark' && 'bg-(--surface-card-dark)'
      )}
    >
      {icon && (
        <div className="text-(--icon-primary)">
          <Icon icon={icon} size={36} />
        </div>
      )}

      <div className="flex w-full flex-col gap-4">
        {heading && (
          <span className="text-display-2xl text-(--text-headings-dark)">
            {heading}
          </span>
        )}

        {body && (
          <div className="text-(--text-body-dark) mt-4">
            <RichText
              doc={body}
              className="
                [&_p]:mb-0
                [&_strong]:font-semibold
                [&_em]:italic
                [&_u]:underline
              "
            />
          </div>
        )}
      </div>

      {hasButtons && (
        <div className="mt-auto flex flex-col gap-3">
          {button.slice(0, 2).map((btn, index) => (
            <Button
              key={btn._uid || index}
              {...btn}
              tone={index === 0 ? 'primary' : 'secondary'}
              mode={'filled'}
              fullWidth
              size='sm'
            />
          ))}
        </div>

        
      )}

    </div>
  )
}
