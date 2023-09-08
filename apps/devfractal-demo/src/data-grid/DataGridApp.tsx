import { VStack, state } from 'devfractal'
import { DataTable } from './components/DataTable'
import { SearchHeader } from './components/SearchHeader'

const useSearch = state(
  { filterText: '', paginate: 'page' },
  {
    setSearchText(draft, text: string) {
      draft.filterText = text
    },

    setPageView(draft, key: string) {
      if (key !== 'scroll' && key !== 'page') {
        return
      }
      draft.paginate = key
    },
  },
)

export function DataGridApp(): JSX.Element {
  const [state, actions] = useSearch()

  return (
    <VStack className="mx-auto mt-4 flex w-[80%] flex-col items-center justify-center rounded-xl shadow-2xl shadow-slate-400">
      <SearchHeader
        onFilter={actions.setSearchText}
        onCheck={actions.setPageView}
      />
      <DataTable searchText={state.filterText} paginate={state.paginate} />
    </VStack>
  )
}
