import { state } from 'devfractal'

export type PaginationValues = Readonly<{
  initialPage?: number
  totalPages: number
  onChange?(page: number): void
}>

export type PaginationResult = {
  activePage: number

  setPage(page: number): void
  next(): void
  previous(): void
  first(): void
  last(): void
}

const usePageState = ({ initialPage }: { initialPage?: number }) =>
  state(
    { activePage: initialPage ? initialPage : 1 },
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
    },
  )

export const usePagination = (initialState: { initialPage?: number }) => {
  const [state, actions] = usePageState(initialState)()

  return {
    activePage: state.activePage,
    next: actions.next,
    previous: actions.previous,
    setPage: actions.setPage,
  }
}
