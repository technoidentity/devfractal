import { Button, HStack } from 'devfractal'

export function Pagination({
  totalRows,
  selectedRows,
  onNext,
  onPrev,
}: {
  totalRows: number
  selectedRows: number
  onNext: () => void
  onPrev: () => void
}): JSX.Element {
  return (
    <HStack className="items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {`${selectedRows} of ${totalRows}`}
      </div>

      <div className="space-x-2">
        <Button variant="outline" size="sm" onClick={onPrev}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={onNext}>
          Next
        </Button>
      </div>
    </HStack>
  )
}
