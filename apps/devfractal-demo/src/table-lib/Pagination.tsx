import { Button, HStack } from 'devfractal'

type PaginationProps = {
  totalRows: number
  selectedRows: number
  onNextClick: { onClick: () => void; disable: boolean }
  onPrevClick: { onClick: () => void; disable: boolean }
}
export function Pagination({
  totalRows,
  selectedRows,
  onNextClick,
  onPrevClick,
}: PaginationProps): JSX.Element {
  return (
    <HStack className="items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {selectedRows} of {totalRows} row(s) selected
      </div>

      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevClick.onClick}
          disabled={onPrevClick.disable}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNextClick.onClick}
          disabled={onNextClick.disable}
        >
          Next
        </Button>
      </div>
    </HStack>
  )
}
