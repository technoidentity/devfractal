import { DTable, state } from 'devfractal'
import { useData } from '../data/query'
import { iorderBy } from '../utils/iorderBy'
import { ErrorMessage, FullPageLoading } from './Common'
import { DataBody } from './DataBody'
import { DataHeaders } from './DataHeaders'
import { Pages } from './Pages'

type State = {
  sortKey: string | undefined
  sortOrder: 'asc' | 'desc'
  currentPage: number
}

const intialState: State = {
  sortKey: undefined,
  sortOrder: 'asc',
  currentPage: 1,
}

const useGridData = state(intialState, {
  setSortKey(draft, key: string) {
    draft.sortKey = key
  },

  toggleOrder(draft, key: string) {
    draft.sortOrder =
      key === draft.sortKey
        ? draft.sortOrder === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc'
  },

  setCurrentPage(draft, page: number) {
    draft.currentPage = page
  },
})

function getTableData<T extends object>(
  dataArray: T[],
  searchTarget: string,
  key: keyof T,
  order: 'asc' | 'desc',
  currentPage: number,
): T[] {
  const sortedByKeyArray = iorderBy(dataArray, key, order)

  const filteredBySearchArray =
    searchTarget !== ''
      ? sortedByKeyArray.filter(o =>
          Object.values(o).some(e =>
            e.toString().toLowerCase().includes(searchTarget.toLowerCase()),
          ),
        )
      : sortedByKeyArray

  const endIndex = currentPage * 10
  const startIndex = endIndex - 10

  return currentPage !== 0
    ? filteredBySearchArray.slice(startIndex, endIndex)
    : filteredBySearchArray
}

export function DataTable({
  searchText,
  paginate,
}: {
  searchText: string
  paginate: string
}): JSX.Element {
  const queryResult = useData()
  const [state, actions] = useGridData()

  if (queryResult.isLoading) {
    return <FullPageLoading />
  }

  if (queryResult.isError) {
    return <ErrorMessage error={new Error('Data not found!')} />
  }

  if (queryResult.data.length < 1) {
    return <ErrorMessage error={new Error(`Empty data list!`)} />
  }

  const dataKeys: string[] = Object.keys(queryResult.data[0])
  const primaryKey: string = dataKeys[0]

  return (
    <main
      className={
        paginate === 'scroll'
          ? 'h-[81vh] w-full overflow-y-auto'
          : 'max-h-[80vh] w-full overflow-auto'
      }
    >
      <DTable className="mx-auto table  w-full">
        <DataHeaders
          headers={dataKeys}
          onSortKey={actions.setSortKey}
          toggleOrder={actions.toggleOrder}
        />
        <DataBody
          data={getTableData(
            queryResult.data,
            searchText,
            state.sortKey ?? primaryKey,
            state.sortOrder,
            paginate === 'page' ? state.currentPage : 0,
          )}
          pkey={primaryKey}
        />
      </DTable>
      {paginate === 'page' ? (
        <Pages
          dataSize={queryResult.data.length}
          currentPage={state.currentPage}
          onSetCurrentPage={actions.setCurrentPage}
        />
      ) : (
        <></>
      )}
    </main>
  )
}
