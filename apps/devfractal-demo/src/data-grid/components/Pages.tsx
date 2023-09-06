export function Pages({
  dataSize,
  currentPage,
  onSetCurrentPage,
}: {
  dataSize: number
  currentPage: number
  onSetCurrentPage: (page: number) => void
}): JSX.Element {
  return (
    <main className="sticky text-black bottom-0 mt-2 flex items-center justify-evenly rounded-b-xl bg-gray-700 py-3">
      <button
        disabled={currentPage === 1}
        onClick={() => {
          onSetCurrentPage(currentPage - 1)
        }}
        className="rounded-full bg-white px-8 py-3 font-bold hover:bg-gray-200 "
      >
        Prev
      </button>
      <div className="text-lg font-bold text-white ">
        <p style={{ fontStyle: 'italic' }}>{`${currentPage} of ${Math.ceil(
          dataSize / 10,
        )}`}</p>
      </div>
      <button
        disabled={currentPage === Math.ceil(dataSize / 10)}
        onClick={() => {
          onSetCurrentPage(currentPage + 1)
        }}
        className="rounded-full bg-white px-8 py-3 font-bold hover:bg-gray-200 "
      >
        Next
      </button>
    </main>
  )
}
