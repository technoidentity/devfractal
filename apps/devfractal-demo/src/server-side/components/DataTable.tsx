import { faker } from '@faker-js/faker'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  isArray,
  keys,
} from 'devfractal'

import { HeaderWrapper } from './HeaderWrapper'

export function DataTable(props: {
  data: Array<object>
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

export function DataHeader({
  headers,
  onOrder,
  onSearch,
}: {
  headers: string[]
  onOrder: (value: { sortBy: string; order: 'asc' | 'desc' }) => void
  onSearch: (value: { searchBy: string; search: string }) => void
}): JSX.Element {
  return (
    <TableHeader className="bg-gray-900 sticky top-0">
      <TableRow>
        {isArray(headers) ? (
          headers.map(header => {
            return (
              <TableHead key={header} className="text-center">
                <HeaderWrapper
                  onOrder={onOrder}
                  onSearch={onSearch}
                  header={header}
                />
              </TableHead>
            )
          })
        ) : (
          <TableHead className="text-center">
            <HeaderWrapper
              onOrder={onOrder}
              onSearch={onSearch}
              header={headers}
            />
          </TableHead>
        )}
      </TableRow>
    </TableHeader>
  )
}

// @TODO: Improve generics
export function DataBody({ data }: { data: Array<object> }): JSX.Element {
  return (
    <TableBody>
      {data.length > 0 ? (
        data.map(product => {
          return (
            <TableRow key={faker.string.uuid()}>
              {keys(product)
                .filter(key => key !== 'id')
                .map(item => {
                  return <TableCell key={item}>{product[item]}</TableCell>
                })}
            </TableRow>
          )
        })
      ) : (
        <TableRow>
          <TableCell colSpan={4}>No data!</TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
