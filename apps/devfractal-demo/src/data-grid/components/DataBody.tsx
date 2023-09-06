export function DataBody<T extends object>({
  data,
  pkey,
}: {
  data: T[]
  pkey: keyof T
}): JSX.Element {
  if (data.length < 1) {
    return (
      <div className="table-row-group">
        <div className="table-row">No results!</div>
      </div>
    )
  }

  return (
    <div className="table-row-group px-4 text-center ">
      {data.map(o => (
        <TableRow key={o[pkey] as string} data={o} />
      ))}
    </div>
  )
}

function TableRow<T extends object>({ data }: { data: T }): JSX.Element {
  return (
    <div className="my-3 table-row shadow-lg">
      {Object.values(data).map((e, i) => (
        <TableData key={i} data={e} />
      ))}
    </div>
  )
}

function TableData({ data }: { data: string }): JSX.Element {
  return <div className="table-cell px-4 py-2">{data}</div>
}
