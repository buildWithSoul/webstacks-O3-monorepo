import type { FC } from 'react'
import { storyblokEditable, SbBlokData } from '@storyblok/react'
import { twMerge } from 'tailwind-merge'
import { StatItem } from '../../modules'

interface StatItemBlok extends SbBlokData {
  value: string
  suffix?: string
  description?: string
}

interface StatsBarBlok extends SbBlokData {
  stats: StatItemBlok[]
  cardsPerRow?: '2' | '3' | '4'
}

const gridStyles: Record<'2' | '3' | '4', string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 md:grid-cols-3',
  '4': 'sm:grid-cols-2 md:grid-cols-4',
}

export const StatsBar: FC<{ blok: StatsBarBlok }> = ({ blok }) => {
  const { stats, cardsPerRow = '4' } = blok

  if (!stats?.length) return null

  return (
    <section
      {...storyblokEditable(blok)}
      className="w-full bg-(--surface-background) section-padding-xl-top-bottom"
    >
      <div
        className={twMerge(
          `
          grid
          gap-8
          text-center
          max-w-7xl
          mx-auto
          `,
          gridStyles[cardsPerRow]
        )}
      >
        {stats.map((stat) => (
          <StatItem
            key={stat._uid}
            blok={{
              _uid: stat._uid,
              value: stat.value,
              suffix: stat.suffix,
              description: stat.description,
            }}
            variant="metric"
          />
        ))}
      </div>
    </section>
  )
}