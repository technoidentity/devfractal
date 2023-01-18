/* eslint-disable @typescript-eslint/naming-convention */
import { Flex } from '@mantine/core'
import React, { useState, useMemo } from 'react'
import { columns, Row, rows } from './data'
import { UserPagination } from './UserPagination'
import { Filters, UserTable } from './UserTable'
import { filterRows, Sort, sortRows } from './utils'

const renderColumn = (k: keyof Row, row: Row) => {
  if (k === 'is_manager') {
    return <td>{row.is_manager ? '✔️' : '✖️'}</td>
  }
  return <td>{row[k]}</td>
}

export const MantineTable = () => {
  const rowsPerPage = 3
  const [activePage, setActivePage] = React.useState(1)
  const [filters, setFilters] = useState<Filters<Row>>({
    age: '',
    is_manager: '',
    name: '',
    start_date: '',
  })
  const [sort, setSort] = useState<Sort>({ order: 'asc', orderBy: 'id' })

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
  const filteredRows = useMemo(() => filterRows(rows, filters), [filters])

  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort],
  )
  function paginateRows<T>(
    sortedRows: T[],
    activePage: number,
    rowsPerPage: number,
  ) {
    return [...sortedRows].slice(
      (activePage - 1) * rowsPerPage,
      activePage * rowsPerPage,
    )
  }

  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)
  const count = filteredRows.length
  const totalPages = Math.ceil(count / rowsPerPage)

  return (
    <Flex direction={{ base: 'column' }} justify={{ md: 'center' }}>
      <UserTable
        columns={columns}
        rows={calculatedRows}
        filters={filters}
        handleSearch={handleSearch}
        sort={sort}
        renderColumn={renderColumn}
        handleSort={handleSort}
      />
      <UserPagination
        rowsPerPage={rowsPerPage}
        rows={rows}
        activePage={activePage}
        setActivePage={setActivePage}
        totalPages={totalPages}
      />
    </Flex>
  )
}
