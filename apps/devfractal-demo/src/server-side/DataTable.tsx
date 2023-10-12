import { useQuery } from '@tanstack/react-query'
import {
  Table,
  VStack,
  Text,
  HStack,
  toInt,
  toSearch,
  remove$,
  insert$,
  fromSearchParams,
} from 'devfractal'
import { useSearchParams } from 'react-router-dom'

import { DataBody } from './components/DataBody'
import { DataHeader } from './components/DataHeaders'
import { Header } from './components/Header'
import { Pagination } from './components/Pagination'
import { headers } from './products'
import { fetchProducts } from './query'

// @TODO: Row operations: https://ui.shadcn.com/docs/components/combobox#dropdown-menu
// https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state

export function DataTable(): JSX.Element {
  const [state, setState] = useSearchParams(
    toSearch({
      page: 1,
      limit: 10,
      column: ['title', 'price', 'brand', 'category'],
    }),
  )

  const queryParams = fromSearchParams(state)
  // @TODO: Need validation

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: [
      'products',
      queryParams.page,
      queryParams.limit,
      queryParams.column,
      queryParams.sortBy,
      queryParams.order,
      queryParams.searchBy,
      queryParams.search,
    ],
    queryFn: () =>
      fetchProducts({
        page: toInt(queryParams.page),
        limit: toInt(queryParams.limit),
        column: queryParams.column,
        sortBy: queryParams.sortBy,
        order: queryParams.order,
        searchBy: queryParams.searchBy,
        search: queryParams.search,
      }),
  })

  function handleLimit(value: string) {
    setState(toSearch({ ...queryParams, page: 1, limit: value }))
  }

  function handleNext() {
    const nextState = {
      ...queryParams,
      page: toInt(queryParams.page) + 1,
      limit: toInt(queryParams.limit),
    }
    setState(toSearch(nextState))
  }

  function handlePrev() {
    setState(
      toSearch({
        ...queryParams,
        page: toInt(queryParams.page) - 1,
        limit: toInt(queryParams.limit),
      }),
    )
  }

  function handleFirst() {
    setState(toSearch({ ...queryParams, page: 1 }))
  }

  function handleLast(last: number) {
    setState(toSearch({ ...queryParams, page: last }))
  }

  function handleOrder(value: { sortBy: string; order: 'asc' | 'desc' }) {
    setState(toSearch({ ...queryParams, ...value }))
  }

  function handleSearch(value: { searchBy: string; search: string }) {
    setState(toSearch({ ...queryParams, ...value }))
  }

  // @TODO: Improve - add generics may be
  function handleColumns(header: string) {
    const index = headers.indexOf(header)
    const column = queryParams.column.includes(header)
      ? (remove$(
          queryParams.column,
          queryParams.column.indexOf(header),
        ) as string[])
      : insert$(queryParams.column, index, header)

    setState(toSearch({ ...queryParams, column }))
  }

  return (
    <VStack className="justify-center items-center h-screen overflow-y-auto p-2 border rounded-md gap-y-2">
      <>
        {isLoading ? (
          <HStack>Loading....</HStack>
        ) : isSuccess ? (
          <>
            <Header
              onSearch={handleSearch}
              onSelect={handleColumns}
              columns={data.columns}
            />
            <Table className="text-center">
              <DataHeader
                onOrder={handleOrder}
                onSearch={handleSearch}
                headers={data.columns}
              />
              <DataBody data={data.products} />
            </Table>

            {/* @TODO: CLean up prop passing */}
            <Pagination
              currentPage={data.currentPage}
              limit={queryParams.limit}
              totalPages={data.totalPages}
              onFirst={handleFirst}
              onLast={handleLast}
              onNext={handleNext}
              onPrev={handlePrev}
              onSetLimit={handleLimit}
            />
          </>
        ) : (
          <Text>No data found!</Text>
        )}
      </>
    </VStack>
  )
}
