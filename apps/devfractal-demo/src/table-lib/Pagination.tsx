import { Button, HStack } from 'devfractal'

import {
  usePagination,
  type PaginationResult,
  type PaginationValues,
} from './hooks'

export function Pagination({
  totalPages,
  initialPage,
}: Omit<PaginationValues, 'onChange'>): JSX.Element {
  const {
    activePage,
    next,
    previous,
  }: Omit<PaginationResult, 'last' | 'first'> = usePagination({ initialPage })

  return (
    <HStack className="items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {activePage} of {totalPages}
      </div>

      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={previous}
          disabled={activePage <= 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={next}
          disabled={activePage === totalPages}
        >
          Next
        </Button>
      </div>
    </HStack>
  )
}
