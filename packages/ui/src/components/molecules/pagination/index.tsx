'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { twMerge } from 'tailwind-merge';

import type { FC } from 'react'
import { Button } from '../../atoms';

interface PaginationProps {
  totalPages: number;
  baseUrl?: string;
}

const Pagination:FC<PaginationProps> = ({ totalPages, baseUrl }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter();
  const searchParam = useSearchParams();

  useEffect(() => {
    setCurrentPage(Number(searchParam.get('page')) || 1)
  }, [searchParam]);

  const handlePage = (page: number) => {
    setCurrentPage(page)
    router.push(`${baseUrl || '/'}?page=${page}`)
  }

  return (
    <div className="flex gap-6 items-center justify-center">
      <Button
        className=""
        variant="primary"
        leadingIcon="chevron-left"
        disabled={currentPage===1}
        onClick={() => handlePage(currentPage - 1)}
      >
        Prev
      </Button>
      {Array(totalPages).fill(null).map((_, index) => (
        <button
          key={`page-item-${index + 1}`}
          className={twMerge('size-10 rounded-md cursor-pointer', index + 1 === currentPage ? 'bg-neutral-900 text-white' : 'bg-transparent text-neutral-900')}
          onClick={() => handlePage(index + 1)}
        >{index + 1}</button>
      ))}
      <Button
        className=""
        variant="primary"
        trailingIcon="chevron-right"
        disabled={currentPage===totalPages}
        onClick={() => handlePage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination;
