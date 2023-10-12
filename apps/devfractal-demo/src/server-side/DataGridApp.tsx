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
  isEmptyString,
  omit$,
  TableBody,
  TableRow,
  TableCell,
} from 'devfractal'
import { useSearchParams } from 'react-router-dom'
import { TableVirtuoso } from 'react-virtuoso'

import { DataBody } from './components/DataBody'
import { DataHeader } from './components/DataHeaders'
import { Header } from './components/Header'
import { Pagination } from './components/Pagination'
import { headers } from './products'
import { fetchProducts } from './query'

// @TODO: Row operations: https://ui.shadcn.com/docs/components/combobox#dropdown-menu
// https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state
// @TODO: Too many rerenders?

export function DataGridApp(): JSX.Element {
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
    const nextSearchState = isEmptyString(value.search)
      ? omit$(queryParams, ['searchBy', 'search'])
      : { ...queryParams, ...value }

    setState(toSearch(nextSearchState))
  }

  function handleColumns(header: string) {
    const index = headers.indexOf(header)
    const column = queryParams.column.includes(header)
      ? remove$(queryParams.column, queryParams.column.indexOf(header))
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

            <DataTable
              headers={data.columns}
              data={data.products}
              onOrder={handleOrder}
              onSearch={handleSearch}
            />

            <Pagination
              currentPage={data.currentPage}
              limit={queryParams.limit}
              totalPages={data.totalPages}
              totalItems={data.totalItems}
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

function DataTable<
  T extends { id: number; [k: string]: string | number },
>(props: {
  data: T[]
  headers: string[]
  onOrder: (value: { sortBy: string; order: 'asc' | 'desc' }) => void
  onSearch: (value: { searchBy: string; search: string }) => void
}): JSX.Element {
  return (
    <Table className="text-center">
      <DataHeader {...props} />
      <DataBody data={props.data} />
    </Table>
  )
}

export function VirtualDataTable<
  T extends { id: number; [k: string]: string | number },
>(props: {
  data: T[]
  headers: string[]
  onOrder: (value: { sortBy: string; order: 'asc' | 'desc' }) => void
  onSearch: (value: { searchBy: string; search: string }) => void
}): JSX.Element {
  return (
    <Table className="text-center">
      <DataHeader {...props} />
      <TableBody>
        {props.data.length > 0 ? (
          <TableVirtuoso
            data={props.data}
            itemContent={(_index, data) => {
              return (
                <TableRow key={data.id}>
                  {Object.keys(data)
                    .filter(key => key !== 'id')
                    .map(item => {
                      return <TableCell key={item}>{data[item]}</TableCell>
                    })}
                </TableRow>
              )
            }}
          />
        ) : (
          <TableRow>
            <TableCell colSpan={4}>No data!</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

// {
//   data.length > 0 ? (
//     data.map(product => {
//       return (
//         <TableRow key={product.id}>
//           {Object.keys(product)
//             .filter(key => key !== 'id')
//             .map(item => {
//               return <TableCell key={item}>{product[item]}</TableCell>
//             })}
//         </TableRow>
//       )
//     })
//   ) : (
//     <TableRow>
//       <TableCell colSpan={4}>No data!</TableCell>
//     </TableRow>
//   )
// }
