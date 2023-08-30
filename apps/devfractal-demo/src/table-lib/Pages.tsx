import { state } from 'devfractal'

import { Pagination } from './table-pagination/Pagination'

const usePaginate = state(
  { current: 1 },
  {
    onNext(state) {
      state.current += 1
    },
    onPrev(state) {
      state.current -= 1
    },
    setPage(state, page: number) {
      state.current = page
    },
  },
)
export function Pages(): JSX.Element {
  const [pageState, actions] = usePaginate()

  return (
    <>
      <Pagination
        totalRows={5}
        selectedRows={pageState.current}
        onNext={actions.onNext}
        onPrev={actions.onPrev}
      />
    </>
  )
}
