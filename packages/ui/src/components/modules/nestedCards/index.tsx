'use client'

import type { FC } from 'react'
import { storyblokEditable } from '@storyblok/react'
import type { SbBlokData } from '@storyblok/react'
import { twMerge } from 'tailwind-merge'
import { CardItem, CardItemBlok } from './cardItem'

export interface NestedCardsBlok extends SbBlokData {
  items: CardItemBlok[]
}

interface NestedCardsProps {
  blok: NestedCardsBlok
}

export const NestedCards: FC<NestedCardsProps> = ({ blok }) => {
  const { items } = blok

  return (
    <div
      {...storyblokEditable(blok)}
      className={twMerge(
        'grid grid-cols-2 gap-y-6 gap-x-4'
      )}
    >
      {items?.map((item) => (
        <CardItem key={item._uid} blok={item} />
      ))}
    </div>
  )
}
