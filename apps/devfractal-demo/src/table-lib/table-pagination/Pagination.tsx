import { Button, HStack, map, pipe, range, toArray } from 'devfractal'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { PaginationProps, PaginationProps2 } from './types'

// Rename chain for pipe-to-array to avoid conflict with chain from  iter.ts

export function Pagination1({
  count,
  currentPage,
  onNext,
  onPrev,
}: PaginationProps): JSX.Element {
  return (
    <HStack className="space-x-4 justify-center items-center my-10">
      <ChevronLeft
        className="hover:bg-gray-50 hover:text-black rounded-full"
        onClick={() => {
          if (currentPage === 1) {
            return
          }

          onPrev()
        }}
      />
      <p>{`${currentPage} of ${count}`}</p>
      <ChevronRight
        className="hover:bg-gray-50 hover:text-black rounded-full"
        onClick={() => {
          if (currentPage === count) {
            return
          }

          onNext()
        }}
      />
    </HStack>
  )
}

export function Pagination2({
  count,
  currentPage,
  onNext,
  onPrev,
  onClick,
}: PaginationProps2): JSX.Element {
  return (
    <HStack className="space-x-4 justify-center items-center my-10">
      <ChevronLeft
        className="hover:bg-gray-50 hover:text-black rounded-full"
        onClick={() => {
          if (currentPage === 1) {
            return
          }

          onPrev()
        }}
      />

      <>
        {pipe(
          range(1, count + 1),
          map(num => (
            <Button
              key={num}
              onClick={() => {
                onClick(num)
              }}
              className={`${
                num === currentPage ? 'bg-gray-50' : ''
              } hover:bg-gray-50 hover:text-black rounded-full`}
            >
              {num}
            </Button>
          )),
          toArray,
        )}
      </>

      <ChevronRight
        className="hover:bg-gray-50 hover:text-black rounded-full"
        onClick={() => {
          if (currentPage === count) {
            return
          }

          onNext()
        }}
      />
    </HStack>
  )
}
