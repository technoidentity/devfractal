import { useQuery } from '@tanstack/react-query'
import { Table, VStack, Text, HStack, toInt } from 'devfractal'
import React from 'react'
import { DataBody } from './components/DataBody'
import { DataHeader } from './components/DataHeaders'
import { Pagination } from './components/Pagination'
import { fetchProducts } from './query'

export function DataTable(): JSX.Element {
  const [state, setState] = React.useState({ page: 1, limit: 10 }) // URL state
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['products', state.page, state.limit],
    queryFn: () => fetchProducts(state.page, state.limit),
  })

  function handleLimit(value: string) {
    setState(state => ({ ...state, limit: toInt(value) }))
  }

  function handleNext() {
    setState(state => ({ ...state, page: state.page + 1 }))
  }

  function handlePrev() {
    setState(state => ({ ...state, page: state.page - 1 }))
  }

  function handleFirst() {
    setState(state => ({ ...state, page: 1 }))
  }

  function handleLast(last: number) {
    setState(state => ({ ...state, page: last }))
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

          <Pagination
            currentPage={state.page}
            limit={state.limit}
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
