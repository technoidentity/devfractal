export type PaginationProps = {
  count: number
  currentPage: number
  onNext: () => void
  onPrev: () => void
}

export type PaginationProps2 = {
  count: number
  currentPage: number
  onNext: () => void
  onPrev: () => void
  onClick: (page: number) => void
}
