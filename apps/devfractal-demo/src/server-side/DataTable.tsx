import { useQuery } from '@tanstack/react-query'
import {
  Table,
  VStack,
  Text,
  HStack,
  toInt,
  chain,
  map,
  cast,
  toSearch,
} from 'devfractal'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { DataBody } from './components/DataBody'
import { DataHeader } from './components/DataHeaders'
import { Pagination } from './components/Pagination'
import { fetchProducts } from './query'

export function DataTable(): JSX.Element {
  const [state, setState] = useSearchParams()

  const queryParams = cast(
    z.object({ page: z.number(), limit: z.number() }),
    Object.fromEntries(
      chain(
        state.entries(),
        map(([key, value]) => [key, toInt(value)] as const),
      ),
    ),
  ) // @TODO: clean up

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['products', queryParams.page, queryParams.limit],
    queryFn: () => fetchProducts(queryParams.page, queryParams.limit),
    // @TODO: Better way?
  })

  function handleLimit(value: string) {
    setState(toSearch({ page: queryParams.page, limit: value }))
  }

  function handleNext() {
    const nextState = { page: queryParams.page + 1, limit: queryParams.limit }
    setState(toSearch(nextState))
  }

  function handlePrev() {
    setState(toSearch({ page: queryParams.page - 1, limit: queryParams.limit }))
  }

  function handleFirst() {
    setState(toSearch({ ...queryParams, page: 1 }))
  }

  function handleLast(last: number) {
    setState(toSearch({ ...queryParams, page: last }))
  }

  return (
    <VStack className="justify-center items-center h-screen overflow-y-auto p-2 border rounded-md">
      {isLoading ? (
        <HStack>Loading....</HStack>
      ) : isSuccess ? (
        <>
          <Table className="text-center">
            <DataHeader />
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
