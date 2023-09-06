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
    <div className="table-header-group border text-center">
      <div className="sticky top-0 table-row w-full bg-gray-300 text-lg font-bold">
        {headers.map(h => (
          <DataHead key={h} onSortKey={onSortKey} toggleOrder={toggleOrder}>
            {h}
          </DataHead>
        ))}
      </div>
    </div>
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
    <div className="table-cell p-2 text-center">
      <div className="flex justify-center gap-x-4 rounded-md py-2 pl-4 hover:bg-gray-600 hover:text-white">
        <button
          type="button"
          className="uppercase "
          onClick={() => {
            onSortKey(children)
            toggleOrder(children)
          }}
        >
          {children}
        </button>
      </div>
    </div>
  )
}
