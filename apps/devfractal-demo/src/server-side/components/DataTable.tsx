import { faker } from '@faker-js/faker'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  isArray,
  keys,
} from 'devfractal'
import { MoreHorizontal } from 'lucide-react'

import { HeaderWrapper } from './HeaderWrapper'

export function DataTable(props: {
  data: Array<object & { id: number }>
  headers: string[]
  onOrder: (value: { sortBy: string; order: 'asc' | 'desc' }) => void
  onSearch: (value: { searchBy: string; search: string }) => void
  onDelete: (id: number) => void
}): JSX.Element {
  return (
    <Table className="text-center">
      <DataHeader {...props} />
      <DataBody data={props.data} onDelete={props.onDelete} />
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
        <TableHead className="text-center uppercase">Actions</TableHead>
      </TableRow>
    </TableHeader>
  )
}

// @TODO: Improve generics
export function DataBody({
  data,
  onDelete,
}: {
  data: Array<object & { id: number }>
  onDelete: (id: number) => void
}): JSX.Element {
  return (
    <TableBody>
      {data.length > 0 ? (
        data.map(product => {
          return (
            <TableRow key={faker.string.uuid()} className="group/row">
              {keys(product)
                .filter(key => key !== 'id')
                .map(item => {
                  return <TableCell key={item}>{product[item]}</TableCell>
                })}
              <TableCell className="invisible group-hover/row:visible">
                <ActionsMenu onDelete={onDelete} id={product['id']} />
              </TableCell>
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

// @TODO: Should take the actions and the corresponding handlers from parent
// Assuming row operations.. editing fields to be sent as PUT or PATCH?
function ActionsMenu({
  onDelete,
  id,
}: {
  id: number
  onDelete: (id: number) => void
}): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-blue-300">Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onClick={() => onDelete(id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
