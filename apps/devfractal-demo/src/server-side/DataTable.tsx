import { useQuery } from '@tanstack/react-query'
import { Table, VStack, Text, HStack, toInt, toSearch, pipe } from 'devfractal'
import { useSearchParams } from 'react-router-dom'

import { DataBody } from './components/DataBody'
import { DataHeader } from './components/DataHeaders'
import { Pagination } from './components/Pagination'
import { fetchProducts } from './query'

export function DataTable(): JSX.Element {
  const [state, setState] = useSearchParams(
    toSearch({ page: 1, limit: 10, key: 'title', order: 'asc' }),
  )

  const queryParams = pipe(state.entries(), Object.fromEntries)
  // @TODO: Need validation

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: [
      'products',
      queryParams.page,
      queryParams.limit,
      queryParams.key,
      queryParams.order,
    ],
    queryFn: () =>
      fetchProducts(
        toInt(queryParams.page),
        toInt(queryParams.limit),
        queryParams.key,
        queryParams.order,
      ),
  })

  // @TODO: Error in current change on changing limit
  function handleLimit(value: string) {
    setState(
      toSearch({ ...queryParams, page: toInt(queryParams.page), limit: value }),
    )
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

  function handleOrder(value: { key: string; order: 'asc' | 'desc' }) {
    setState(toSearch({ ...queryParams, ...value }))
  }

  return (
    <VStack className="justify-center items-center h-screen overflow-y-auto p-2 border rounded-md">
      {isLoading ? (
        <HStack>Loading....</HStack>
      ) : isSuccess ? (
        <>
          <Table className="text-center">
            <DataHeader onOrder={handleOrder} />
            <DataBody data={data.products} />
          </Table>

          {/* @TODO: CLean up prop passing */}
          <Pagination
            currentPage={queryParams.page}
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
    </VStack>
  )
}
