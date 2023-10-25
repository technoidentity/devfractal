import { useQuery } from '@tanstack/react-query'
import {
  VStack,
  Text,
  HStack,
  toInt,
  toSearch,
  remove$,
  fromSearchParams,
  isEmptyString,
  omit$,
  isArray,
} from 'devfractal'
import { useSearchParams } from 'react-router-dom'

import { insertAt } from '@/mocks/data-table/utils'

import { DataTable } from './components/DataTable'
import { Header } from './components/SearchHeader'
import { Pagination } from './components/Pagination'
import { VirtualDataTable } from './components/VirtualDataTable'
import { headers } from './products'
import { fetchProducts } from './query'

// @TODO: Row operations: https://ui.shadcn.com/docs/components/combobox#dropdown-menu
// https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state

export function DataGridApp(): JSX.Element {
  const [state, setState] = useSearchParams(
    toSearch({
      show: 'paged',
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
      queryParams.show,
      queryParams.show,
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
        show: queryParams.show,
        page: queryParams.page ? toInt(queryParams.page) : undefined,
        limit: queryParams.limit ? toInt(queryParams.limit) : undefined,
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
    const nextSearchState = isEmptyString(value.search)
      ? omit$(queryParams, ['searchBy', 'search'])
      : { ...queryParams, ...value }

    setState(toSearch(nextSearchState))
  }

  function handleInfinite() {
    const show = queryParams.show === 'all' ? 'paged' : 'all'
    const params =
      show === 'all' ? omit$(queryParams, ['page', 'limit']) : queryParams

    setState(toSearch({ ...params, show }))
  }

  function handleColumns(header: string) {
    const selected = isArray(queryParams.column)
      ? queryParams.column
      : [queryParams.column]

    const index = headers.indexOf(header)

    const column = selected.includes(header)
      ? selected.length > 1
        ? remove$(selected, selected.indexOf(header))
        : selected
      : insertAt(selected, index, header)

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

            {queryParams.show === 'paged' ? (
              <DataTable
                data={data.products}
                headers={data.columns}
                onOrder={handleOrder}
                onSearch={handleSearch}
              />
            ) : (
              <VirtualDataTable
                headers={data.columns}
                data={data.products}
                onOrder={handleOrder}
                onSearch={handleSearch}
              />
            )}

            <Pagination
              show={queryParams.show}
              currentPage={data.currentPage}
              limit={queryParams.limit}
              totalPages={data.totalPages}
              totalItems={data.totalItems}
              onFirst={handleFirst}
              onLast={handleLast}
              onNext={handleNext}
              onPrev={handlePrev}
              onSetLimit={handleLimit}
              onCheck={handleInfinite}
            />
          </>
        ) : (
          <Text>No data found!</Text>
        )}
      </>
    </VStack>
  )
}
