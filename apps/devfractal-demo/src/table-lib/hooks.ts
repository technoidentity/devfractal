import { state } from 'devfractal'

export type PaginationValues = Readonly<{
  initialPage?: number
  totalPages: number
}>

export type PaginationResult = {
  activePage: number
  totalPages: number
  setPage(page: number): void
  next(): void
  previous(): void
  first(): void
  last(): void
}

const usePageState = state(
  { activePage: 1, totalPages: 0 },
  {
    next(state) {
      state.activePage += 1
    },
    previous(state) {
      state.activePage -= 1
    },
    setPage(state, page: number) {
      state.activePage = page
    },
    first(state) {
      state.activePage = 1
    },
    last(state) {
      state.activePage = state.totalPages
    },
  },
)

export const usePagination = ({
  initialPage,
  totalPages,
}: PaginationValues): PaginationResult => {
  const [state, actions] = usePageState({
    activePage: initialPage ?? 1,
    totalPages,
  })

  return {
    activePage: state.activePage,
    totalPages: state.totalPages,
    ...actions,
  }
}
