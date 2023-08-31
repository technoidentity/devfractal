import { Button, HStack } from 'devfractal'

type PaginationProps = {
  activePage: number
  total?: number
  next: () => void
  previous: () => void
}
export function Pagination({
  activePage,
  total,
  next,
  previous,
}: PaginationProps): JSX.Element {
  return (
    <HStack className="items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {total ? `${activePage} of ${total}` : `Page ${activePage}`}
      </div>

      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={previous}
          disabled={activePage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={next}
          disabled={total ? activePage === total : false}
        >
          Next
        </Button>
      </div>
    </HStack>
  )
}
