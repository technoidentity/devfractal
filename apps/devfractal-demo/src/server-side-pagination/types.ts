export type ServerPaginationProps = {
  totalPages: number
}

export type ServerPaginationResult = {
  activePage: number
  totalPages: number
  next(): void
  previous(): void
  setPage(page: number): void
  first(): void
  last(): void
}
