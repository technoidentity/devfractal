import { Button, DTHead, DTHeader, DTRow, HStack } from 'devfractal'

export function DataHeaders({
  headers,
  onSortKey,
  toggleOrder,
}: {
  headers: string[]
  onSortKey: (key: string) => void
  toggleOrder: (key: string) => void
}): JSX.Element {
  return (
    <DTHeader className="table-header-group text-center">
      <DTRow className="sticky top-0 table-row w-full bg-gray-300 text-lg font-bold">
        {headers.map(h => (
          <DataHead key={h} onSortKey={onSortKey} toggleOrder={toggleOrder}>
            {h}
          </DataHead>
        ))}
      </DTRow>
    </DTHeader>
  )
}

function DataHead({
  children,
  onSortKey,
  toggleOrder,
}: {
  children: string
  onSortKey: (key: string) => void
  toggleOrder: (key: string) => void
}): JSX.Element {
  return (
    <DTHead className="table-cell p-2 text-center">
      <HStack className="flex justify-center gap-x-4 rounded-md py-2 pl-4 hover:bg-gray-600 hover:text-white">
        <Button
          type="button"
          className="uppercase "
          onClick={() => {
            onSortKey(children)
            toggleOrder(children)
          }}
        >
          {children}
        </Button>
      </HStack>
    </DTHead>
  )
}
