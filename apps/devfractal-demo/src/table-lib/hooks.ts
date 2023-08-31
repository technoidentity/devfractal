import { state } from 'devfractal'

export function usePagination({
  page,
  total,
  onChange,
}: {
  page: number
  total?: number
  onChange: (page: number) => void
}) {
  const [pageState, actions] = state(
    { activePage: page, total },
    {
      setPage(_state, page: number) {
        onChange(page)
      },
      next(state) {
        onChange(state.activePage + 1)
      },
      previous(state) {
        onChange(state.activePage - 1)
      },
    },
  )()

  return {
    activePage: pageState.activePage,
    totalPage: pageState.total,
    setPage: actions.setPage,
    previous: actions.previous,
    next: actions.next,
  }
}
