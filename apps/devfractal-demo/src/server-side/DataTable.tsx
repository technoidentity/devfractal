import { useQuery } from '@tanstack/react-query'
import { Table, VStack } from 'devfractal'
import { DataBody } from './components/DataBody'
import { DataHeader } from './components/DataHeaders'
import { Pagination } from './components/Pagination'
import { fetchProducts } from './query'

export function DataTable(): JSX.Element {
  const result = useQuery({ queryKey: ['products'], queryFn: fetchProducts })

  return (
    <VStack className="justify-center items-center h-screen overflow-y-auto p-2 border rounded-md">
      <Table className="text-center">
        <DataHeader />
        <DataBody data={result.data!} />
      </Table>

      <Pagination />
    </VStack>
  )
}
