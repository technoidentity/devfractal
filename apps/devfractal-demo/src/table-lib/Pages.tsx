import { state } from 'devfractal'
import { Pagination1, Pagination2 } from './table-pagination/Pagination'

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
      <Pagination1
        currentPage={pageState.current}
        count={10}
        onNext={actions.onNext}
        onPrev={actions.onPrev}
      />

      <Pagination2
        currentPage={pageState.current}
        count={10}
        onNext={actions.onNext}
        onPrev={actions.onPrev}
        onClick={actions.setPage}
      />
    </>
  )
}
