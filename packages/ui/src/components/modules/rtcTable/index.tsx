'use client'

import type { FC } from 'react'
import { useState } from 'react'
import { storyblokEditable } from '@storyblok/react'
import type { SbBlokData } from '@storyblok/react'
import { twMerge } from 'tailwind-merge'
import { Icon } from '../../atoms'
import { BlogPagination } from '../../molecules'

interface TableHead {
  value: string
}

interface TableCell {
  value: string
}

interface TableRow {
  body: TableCell[]
}

export interface RTCTableBlok extends SbBlokData {
  thead?: TableHead[]
  tbody?: TableRow[]
}

interface RTCTableProps {
  blok: RTCTableBlok
  pageSize?: number
}

const renderCell = (value?: string) => {
  if (!value || value.trim() === '-' || value.trim() === '—') {
    return <span className="text-(--text-body-muted)">—</span>
  }

  const normalized = value.toLowerCase().trim()

  if (normalized === 'yes' || normalized === 'true' || normalized === '✔') {
    return (
      <Icon
        icon="check"
        size={18}
        className="mx-auto text-(--text-headings)"
      />
    )
  }

  return value
}

export const RTCTable: FC<RTCTableProps> = ({
  blok,
  pageSize = 6,
}) => {
  const { thead = [], tbody = [] } = blok
  const [currentPage, setCurrentPage] = useState(1)

  if (!thead.length || !tbody.length) return null

  const totalItems = tbody.length
  const start = (currentPage - 1) * pageSize
  const end = start + pageSize
  const rows = tbody.slice(start, end)

  return (
    <div
      {...storyblokEditable(blok)}
      className="my-12 space-y-10"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {thead.map((head, i) => (
                <th
                  key={i}
                  className={twMerge(
                    'px-6 pb-4 text-sm font-medium',
                    i < 2
                      ? 'text-left text-(--text-headings)'
                      : 'text-center text-(--text-body-muted)'
                  )}
                >
                  {head.value}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={`${currentPage}-${rowIndex}`}
                className={rowIndex % 2 === 0 ? 'bg-(--surface-muted)' : ''}
              >
                {row.body.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={twMerge(
                      'px-6 py-4 text-sm',
                      cellIndex < 2
                        ? 'text-(--text-headings)'
                        : 'text-center'
                    )}
                  >
                    {renderCell(cell.value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalItems > pageSize && (
        <BlogPagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={pageSize}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}
