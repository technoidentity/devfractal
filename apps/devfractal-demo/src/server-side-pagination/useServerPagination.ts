import { number, searchState, spec } from 'devfractal'
import type { ServerPaginationProps, ServerPaginationResult } from './types'

const useSearchState = searchState(spec({ page: number() }), {
  next(state) {
    state.page += 1
  },
  previous(state) {
    state.page -= 1
  },
  setPage(state, page: number) {
    state.page = page
  },
})

export const useServerPagination = ({
  totalPages,
}: ServerPaginationProps): ServerPaginationResult => {
  const [state, actions] = useSearchState()

  return {
    activePage: state.page,
    totalPages,
    first: () => actions.setPage(1),
    last: () => actions.setPage(totalPages),
    ...actions,
  }
}
