/* eslint-disable @typescript-eslint/naming-convention */
import { Pagination as MantinePagination } from '@mantine/core'

export type PaginationProps<Row extends object> = Readonly<{
  rows: readonly Row[]
  page: number
  setPage(page: number): void
  rowsPerPage: number
  totalPages: number
}>

export function Pagination<Row extends object>({
  page,
  setPage,
  totalPages,
}: PaginationProps<Row>) {
  return (
    <MantinePagination
      mt="lg"
      page={page}
      position="center"
      onChange={setPage}
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
