import { propsState } from 'devfractal'

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

const useLocalPageState = propsState<PaginationValues>()(
  { activePage: 1 },
  {
    next: () => state => {
      state.activePage += 1
    },
    previous: () => state => {
      state.activePage -= 1
    },
    setPage: () => (state, props) => {
      state.activePage = props.totalPages
    },
    first: () => state => {
      state.activePage = 1
    },
    last: () => (state, props) => {
      state.activePage = props.totalPages
    },
  },
)

export const usePagination = ({
  initialPage,
  totalPages,
}: PaginationValues): PaginationResult => {
  const [state, actions] = useLocalPageState(
    {
      initialPage,
      totalPages,
    },
    { activePage: initialPage ?? 1 },
  )

  return {
    activePage: state.activePage,
    totalPages,
    ...actions,
  }
}
