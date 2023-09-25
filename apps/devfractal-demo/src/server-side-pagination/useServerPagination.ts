import { searchState } from 'devfractal'
import { z } from 'zod'

const useSearchState = searchState(z.object({ page: z.number() }), {
  next(state) {
    state.page += 1
  },
  prev(state) {
    state.page -= 1
  },
  setPage(state, page: number) {
    state.page = page
  },
})

export const useServerPagination = (totalPages: number) => {
  const [state, actions] = useSearchState()

  return {
    activePage: state.page,
    totalPages,
    first: () => actions.setPage(1),
    last: () => actions.setPage(totalPages),
    ...actions,
  }
}
