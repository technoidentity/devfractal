/* eslint-disable @typescript-eslint/naming-convention */
import { Pagination } from '@mantine/core'
import { Row } from './data'

interface UserPaginationProps {
  rows: Row[]
  activePage: number
  setActivePage(activePage: number): void
  rowsPerPage: number
  totalPages: number
}
export const UserPagination = ({
  activePage,
  setActivePage,
  totalPages,
}: UserPaginationProps) => {
  return (
    <Pagination
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
