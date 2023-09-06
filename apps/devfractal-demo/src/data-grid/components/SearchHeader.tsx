export function SearchHeader({
  onFilter,
  onCheck,
}: {
  onFilter: (text: string) => void
  onCheck: (text: string) => void
}): JSX.Element {
  return (
    <section className="flex w-full text-black items-center justify-between rounded-t-xl bg-gray-700 p-4">
      <div className="w-[60%]">
        <label>
          <input
            type="text"
            name="filter"
            placeholder="Search here..."
            className="w-full rounded-full border px-4 py-2"
            onChange={e => onFilter(e.target.value)}
          />
        </label>
      </div>
      <section className="flex items-center justify-evenly gap-x-4 font-semibold text-white">
        <label htmlFor="paginate" className="flex gap-x-2">
          All Results{' '}
          <input
            type="radio"
            id="paginate"
            value="scroll"
            name="paginate"
            onChange={e => onCheck(e.target.value)}
          />
          Limit Results{' '}
          <input
            type="radio"
            id="paginate"
            name="paginate"
            value="page"
            onChange={e => onCheck(e.target.value)}
            defaultChecked
          />
        </label>
      </section>
    </section>
  )
}
