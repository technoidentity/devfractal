import { useQuery } from '@tanstack/react-query'
import { Table, VStack, Text, HStack, toInt, toSearch, pipe } from 'devfractal'
import { useSearchParams } from 'react-router-dom'

import { DataBody } from './components/DataBody'
import { DataHeader } from './components/DataHeaders'
import { Header } from './components/Header'
import { Pagination } from './components/Pagination'
import { fetchProducts } from './query'

export function DataTable(): JSX.Element {
  const [state, setState] = useSearchParams()

  const queryParams = pipe(state.entries(), Object.fromEntries)
  // @TODO: Need validation

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: [
      'products',
      queryParams.page,
      queryParams.limit,
      queryParams.sortBy,
      queryParams.order,
      queryParams.searchBy,
      queryParams.search,
    ],
    queryFn: () =>
      fetchProducts(
        toInt(queryParams.page),
        toInt(queryParams.limit),
        queryParams.sortBy,
        queryParams.order,
        queryParams.searchBy,
        queryParams.search,
      ),
  })

  // @TODO: Error in current page on changing limit -> redirect to first page
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

  return (
    <VStack className="justify-center items-center h-screen overflow-y-auto p-2 border rounded-md gap-y-2">
      <Header onSearch={handleSearch} />
      <>
        {isLoading ? (
          <HStack>Loading....</HStack>
        ) : isSuccess ? (
          <>
            <Table className="text-center">
              <DataHeader onOrder={handleOrder} onSearch={handleSearch} />
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
