/* eslint-disable @typescript-eslint/naming-convention */
import { Pagination as MantinePagination } from '@mantine/core'

export type PaginationProps<Row extends object> = Readonly<{
  rows: readonly Row[]
  activePage: number
  setActivePage(activePage: number): void
  rowsPerPage: number
  totalPages: number
}>

export function Pagination<Row extends object>({
  activePage,
  setActivePage,
  totalPages,
}: PaginationProps<Row>) {
  return (
    <MantinePagination
      page={activePage}
      position="center"
      onChange={setActivePage}
      styles={theme => ({
        item: {
          '&[data-active]': {
            backgroundImage: theme.fn.gradient({ from: 'red', to: 'yellow' }),
          },
        },
      })}
      total={totalPages}
    />
  )
}
