import { Button, HStack } from 'devfractal'

import { type PaginationResult } from './hooks'

export type PaginationProps = PaginationResult & {
  totalPages: number
}

export function Pagination({
  totalPages,
  activePage,
  ...actions
}: PaginationProps): JSX.Element {
  return (
    <HStack className="items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {activePage} of {totalPages}
      </div>

      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={actions.previous}
          disabled={activePage <= 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={actions.next}
          disabled={activePage === totalPages}
        >
          Next
        </Button>
      </div>
    </HStack>
  )
}
