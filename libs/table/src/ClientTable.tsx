/* eslint-disable @typescript-eslint/naming-convention */
import { Flex, TableProps } from '@mantine/core'
import React, { useMemo, useState } from 'react'
import { Pagination } from './Pagination'
import { TableView } from './TableView'
import { Filters } from './types'
import { filterRows, Sort, sortRows } from './utils'

export type ClientTableProps<Row extends object & { id: number | string }> =
  TableProps &
    Readonly<{
      renderColumn: (key: keyof Row, row: Row) => React.ReactNode
      renderActions?: (row: Row) => React.ReactNode
      perPage: number
      initialFilters: Filters<Row>
      columns: any
      rows: readonly Row[]
      actions?: boolean
    }>

function paginateRows<Row extends object>(
  sortedRows: readonly Row[],
  activePage: number,
  rowsPerPage: number,
): Row[] {
  return [...sortedRows].slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage,
  )
}

export function ClientTable<Row extends object & { id: number | string }>({
  perPage,
  columns,
  rows,
  actions,
  initialFilters,
  ...props
}: ClientTableProps<Row>) {
  const [activePage, setActivePage] = React.useState(1)
  const [filters, setFilters] = useState(initialFilters)
  const [sort, setSort] = useState<Sort<Row>>({ order: 'asc', orderBy: 'id' })

  const handleSearch = (val: string, accessor: string) => {
    setActivePage(1)

    if (val) {
      setFilters(prevFilters => ({
        ...prevFilters,
        [accessor]: val,
      }))
    } else {
      setFilters(prevFilters => {
        const updatedFilters = { ...prevFilters }
        delete (updatedFilters as any)[accessor]

        return updatedFilters
      })
    }
  }

  const handleSort = (accessor: keyof Row) => {
    setActivePage(1)
    setSort(prevSort => ({
      order:
        prevSort.order === 'asc' && prevSort.orderBy === accessor
          ? 'desc'
          : 'asc',
      orderBy: accessor,
    }))
  }
  const filteredRows = useMemo(() => filterRows(rows, filters), [filters, rows])

  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort],
  )

  const calculatedRows = paginateRows(sortedRows, activePage, perPage)
  const count = filteredRows.length
  const totalPages = Math.ceil(count / perPage)

  return (
    <Flex direction={{ base: 'column' }} justify={{ md: 'center' }}>
      <TableView<Row>
        {...props}
        columns={columns}
        rows={calculatedRows}
        filters={filters}
        onSearch={handleSearch}
        sort={sort}
        onSort={handleSort}
        actions={!!actions}
      />
      <Pagination<Row>
        rowsPerPage={perPage}
        rows={rows}
        activePage={activePage}
        setActivePage={setActivePage}
        totalPages={totalPages}
      />
    </Flex>
  )
}
